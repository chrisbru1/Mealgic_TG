// MealContext.jsx
import React, { useState, createContext, useContext, useMemo } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const MealContext = createContext();
export const useMealContext = () => useContext(MealContext);

const fetchCommunityRecipes = async () => {
  const { data } = await axios.get('https://api.example.com/community-recipes');
  return data;
};

export const MealProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  const { data: communityRecipes = [], isLoading, error } = useQuery('communityRecipes', fetchCommunityRecipes, {
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    cacheTime: 1000 * 60 * 30 // 30 minutes on inactive
  });

  const addToCurrentPlan = (recipe) => {
    setMeals((prevMeals) => [...prevMeals, recipe]);
    setToastMessage(`"${recipe.name}" added to your weekly plan!`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const value = useMemo(() => ({
    meals,
    setMeals,
    communityRecipes,
    isLoading,
    error,
    addToCurrentPlan,
    toastMessage
  }), [meals, communityRecipes, isLoading, error, toastMessage]);

  return <MealContext.Provider value={value}>{children}</MealContext.Provider>;
};
