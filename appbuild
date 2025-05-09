""import React, { useState, useEffect, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Swipeable } from 'react-swipeable';
import axios from 'axios';

const manaIcons = {
  beef: '🥩',
  poultry: '🍗',
  fish: '🐟',
  vegetarian: '🥦'
};

const initialMeals = [
  {
    name: 'Chicken Parmesan',
    link: 'https://feedingtinybellies.com/crispy-chicken-parmesan/',
    ingredients: ['Chicken Breast', 'Marinara Sauce', 'Mozzarella Cheese', 'Panko Breadcrumbs'],
    description: 'A powerful combo of tender chicken, zesty marinara, and melted cheese. Ready to conquer any appetite.',
    type: 'poultry'
  },
  {
    name: 'Ground Beef Tacos',
    link: 'https://feelgoodfoodie.net/recipe/ground-beef-tacos-napa-cabbage-guacamole/',
    ingredients: ['Ground Beef', 'Taco Shells', 'Lettuce', 'Tomatoes', 'Cheese'],
    description: 'A burst of flavor in every bite. These tacos are swift and strong—perfect for a quick victory.',
    type: 'beef'
  },
  {
    name: 'Baked Salmon with Lemon and Garlic',
    link: 'https://www.lecremedelacrumb.com/best-easy-healthy-baked-salmon/',
    ingredients: ['Salmon Fillets', 'Lemon', 'Garlic', 'Olive Oil'],
    description: 'Elegant and precise, this dish is the commander of all things fresh and healthy.',
    type: 'fish'
  }
];

// Context for Global State Management
const MealContext = createContext();
export const useMealContext = () => useContext(MealContext);

const MealProvider = ({ children }) => {
  const [meals, setMeals] = useState(() => {
    try {
      const savedMeals = localStorage.getItem('weeklyMeals');
      return savedMeals ? JSON.parse(savedMeals) : initialMeals;
    } catch {
      return initialMeals;
    }
  });

  const [savedPlans, setSavedPlans] = useState({});
  const [deckIndex, setDeckIndex] = useState(0);
  const [communityRecipes, setCommunityRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [planName, setPlanName] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString());

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('savedPlans')) || {};
      setSavedPlans(saved);
    } catch {
      setSavedPlans({});
    }
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.example.com/community-recipes');
        setCommunityRecipes(response.data);
      } catch (err) {
        setError('Failed to fetch community recipes.');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  const saveCurrentPlan = () => {
    if (planName.trim() === '') return;
    const updatedPlans = { ...savedPlans, [planName]: meals };
    setSavedPlans(updatedPlans);
    localStorage.setItem('savedPlans', JSON.stringify(updatedPlans));
    setPlanName('');
    setToastMessage(`Plan "${planName}" saved successfully!`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const addToCurrentPlan = (recipe) => {
    setMeals((prevMeals) => [...prevMeals, recipe]);
    setToastMessage(`"${recipe.name}" added to your weekly plan!`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <MealContext.Provider value={{ meals, setMeals, savedPlans, setSavedPlans, deckIndex, setDeckIndex, communityRecipes, loading, error, planName, setPlanName, saveCurrentPlan, addToCurrentPlan, toastMessage, lastUpdated }}>
      {children}
    </MealContext.Provider>
  );
};

const CurrentWeekView = () => {
  const { meals, setMeals, toastMessage, lastUpdated } = useMealContext();

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const updatedMeals = Array.from(meals);
    const [reorderedItem] = updatedMeals.splice(result.source.index, 1);
    updatedMeals.splice(result.destination.index, 0, reorderedItem);
    setMeals(updatedMeals);
  };

  return (
    <div>
      <div className="text-sm text-gray-400 mb-2">Last Updated: {lastUpdated}</div>
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
                            <span>{manaIcons[meal.type]}</span>
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
""
