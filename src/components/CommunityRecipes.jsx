import React, { memo } from 'react';
import { useMealContext } from './MealContext';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';

const CommunityRecipes = memo(() => {
  const { communityRecipes, addToCurrentPlan, isLoading, error } = useMealContext();

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">🌐 Community Recipes</h2>

      {isLoading && (
        <p className="text-yellow-500 animate-pulse">Loading Community Recipes...</p>
      )}
      
      {error && (
        <p className="text-red-500">Failed to load recipes. Please try again later.</p>
      )}

      {!isLoading && !error && communityRecipes.length === 0 && (
        <p className="text-gray-400 italic">No recipes found.</p>
      )}

      {communityRecipes.map(({ name, description, link }, index) => (
        <Card
          key={index}
          className="bg-gray-700 rounded-lg shadow-lg border border-yellow-500 mb-2 hover:bg-gray-600 transition-all"
        >
          <CardContent>
            <div className="flex justify-between">
              <h2 className="text-xl font-bold text-yellow-400">{name}</h2>
            </div>
            <p className="italic text-sm mb-2">{description}</p>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-300 underline"
            >
              View Recipe
            </a>
            <Button
              onClick={() => addToCurrentPlan({ name, description, link })}
              className="mt-2 bg-green-500 text-white hover:bg-green-400 w-full transition-all"
            >
              Add to Current Plan
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
});

export default CommunityRecipes;
