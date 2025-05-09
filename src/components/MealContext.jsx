// MealContext.jsx
import React, { useState, createContext, useContext, useMemo } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const MealContext = createContext();
export const useMealContext = () => useContext(MealContext);

const API_URL = 'https://api.example.com/community-recipes';

const fetchCommunityRecipes = async () => {
  try {
    const { data } = await axios.get(API_URL);
    return data;
  } catch (error) {
    console.error("Failed to fetch community recipes:", error);
    throw error;
  }
};

export const MealProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  // Use React Query to handle community recipes fetch
  const {
    data: communityRecipes = [],
    isLoading,
    error,
  } = useQuery('communityRecipes', fetchCommunityRecipes, {
    staleTime: 1000 * 60 * 5,   // Cache data for 5 minutes
    cacheTime: 1000 * 60 * 30,  // Keep cache for 30 minutes
    retry: 2,                   // Retry twice if the request fails
    refetchOnWindowFocus: false // Do not refetch when window is focused
  });

  const addToCurrentPlan = (recipe) => {
    setMeals((prevMeals) => [...prevMeals, recipe]);
    setToastMessage(`"${recipe.name}" added to your weekly plan! ✅`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const value = useMemo(
    () => ({
      meals,
      setMeals,
      communityRecipes,
      isLoading,
      error,
      addToCurrentPlan,
      toastMessage,
    }),
    [meals, communityRecipes, isLoading, error, toastMessage]
  );

  return (
    <MealContext.Provider value={value}>
      {children}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-md shadow-lg">
          {toastMessage}
        </div>
      )}
    </MealContext.Provider>
  );
};
