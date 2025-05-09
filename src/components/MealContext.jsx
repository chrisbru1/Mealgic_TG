import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

const MealContext = createContext();
export const useMealContext = () => useContext(MealContext);

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

export const MealProvider = ({ children }) => {
  const [meals, setMeals] = useState(initialMeals);
  const [communityRecipes, setCommunityRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.example.com/community-recipes');
        setCommunityRecipes(response.data);
      } catch (err) {
        setError('Failed to fetch community recipes.');
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  const addToCurrentPlan = (recipe) => {
    setMeals((prevMeals) => [...prevMeals, recipe]);
    setToastMessage(`"${recipe.name}" added to your weekly plan!`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <MealContext.Provider value={{ meals, setMeals, communityRecipes, loading, error, addToCurrentPlan, toastMessage }}>
      {children}
    </MealContext.Provider>
  );
};
