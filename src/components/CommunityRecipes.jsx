import React from 'react';
import { useMealContext } from './MealContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CommunityRecipes = () => {
  const { communityRecipes, addToCurrentPlan, loading, error } = useMealContext();

  return (
    <div className="bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">🌐 Community Recipes</h2>
      {loading && <p className="text-yellow-500">Loading Community Recipes...</p>}
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
};

export default CommunityRecipes;
