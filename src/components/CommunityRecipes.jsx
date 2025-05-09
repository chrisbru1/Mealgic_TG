import React, { memo } from 'react';
import { useMealContext } from './MealContext';
import { Card, CardContent } from './ui/card'; // Changed to relative path
import { Button } from './ui/button'; // Changed to relative path

const CommunityRecipes = memo(() => {
  const { communityRecipes, addToCurrentPlan, isLoading, error } = useMealContext();

  return (
    <div className="bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">🌐 Community Recipes</h2>
      {isLoading && <p className="text-yellow-500">Loading Community Recipes...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {communityRecipes.map((recipe, index) => (
        <Card key={index} className='bg-gray-700 rounded-lg shadow-lg border border-yellow-500 mb-2'>
          <CardContent>
            <div className='flex justify-between'>
              <h2 className='text-xl font-bold text-yellow-400'>{recipe.name}</h2>
            </div>
            <p className='italic text-sm mb-2'>{recipe.description}</p>
            <a href={recipe.link} target='_blank' rel='noopener noreferrer' className='text-yellow-300 underline'>
              View Recipe
            </a>
            <Button onClick={() => addToCurrentPlan(recipe)} className='mt-2 bg-green-500 text-white hover:bg-green-400'>
              Add to Current Plan
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
});

export default CommunityRecipes;
```
* **`src/components/CurrentWeekView.jsx`**


```react
import React from 'react';
import { useMealContext } from './MealContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, CardContent } from './ui/card'; // Changed to relative path
import { motion } from 'framer-motion';
import ReactDOM from 'react-dom';

const CurrentWeekView = () => {
  const { meals, setMeals, toastMessage } = useMealContext();

  const onDragEnd = (result) => {
    if (!result.destination) return;

    ReactDOM.unstable_batchedUpdates(() => {
      const updatedMeals = Array.from(meals);
      const [reorderedItem] = updatedMeals.splice(result.source.index, 1);
      updatedMeals.splice(result.destination.index, 0, reorderedItem);
      setMeals(updatedMeals);
    });
  };


  return (
    <div>
      {toastMessage && <div className="bg-green-500 text-white p-2 mb-2 rounded">{toastMessage}</div>}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='meals'>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {meals.map((meal, index) => (
                <Draggable key={meal.name} draggableId={meal.name} index={index}>
                  {(provided) => (
                    <motion.div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <Card className='bg-gray-700 rounded-lg shadow-lg border border-yellow-500 mb-2'>
                        <CardContent>
                          <div className='flex justify-between'>
                            <h2 className='text-xl font-bold text-yellow-400'>{meal.name}</h2>
                          </div>
                          <p className='italic text-sm mb-2'>{meal.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default CurrentWeekView;
```

**2. Fix Unexpected Token Error**

The error in `WeeklyMealPlanner.jsx` is an "Unexpected token" error at position `(39:91)`. This usually indicates a syntax error within your JSX. Let's examine that file.


```react
import React from 'react';
import { MealProvider } from './MealContext';
import CurrentWeekView from './CurrentWeekView';
import CommunityRecipes from './CommunityRecipes';
import { Card, CardContent } from './components/ui/card'; // Changed to relative path

const WeeklyMealPlanner = () => {
  return (
    <MealProvider>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-800 min-h-screen text-white'>
        <h1 className='text-center text-2xl font-bold mb-4 lg:col-span-3'>📜 Weekly Meal Spellbook 📜</h1>

        <div className="lg:col-span-1">
          <Card className="bg-gray-700 rounded-lg shadow-lg border border-yellow-500 mb-2">
            <CardContent>
              <h2 className='text-xl font-bold text-yellow-400'>Saved Meal Plans (Coming Soon)</h2>
              <p className='italic text-sm'>Manage your saved plans and swipe through them easily.</p>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <CurrentWeekView />
        </div>

        <div className="lg:col-span-1">
          <CommunityRecipes />
        </div>
      </div>
    </MealProvider>
  );
};

export default WeeklyMealPlanner;
```
