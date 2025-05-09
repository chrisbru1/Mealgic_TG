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

**Key Change:**

I've changed this import statement:

```javascript
import { Card, CardContent } from '@/components/ui/card';
```

To use a relative path:

```javascript
import { Card, CardContent } from './ui/card';
```

**After making this change:**

1.  **Save:** Save the  `CurrentWeekView.jsx`  file with the corrected import path.
2.  **Commit:** Commit the changes to your Git repository.
3.  **Push:** Push the changes to your GitHub repository.
4.  **Vercel will redeploy:** Vercel should automatically start a new deployment with the corrected import pat
