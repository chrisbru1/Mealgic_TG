import React from 'react';
import { useMealContext } from './MealContext';
import { Card, CardContent } from './ui/Card';

const CurrentWeekView = () => {
  const { meals, loading, error } = useMealContext();

  if (loading) return <p className="text-yellow-500">Loading meals for the week...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 gap-4">
      {meals.map((meal, index) => (
        <Card key={index} className="bg-gray-700 rounded-lg shadow-lg border border-yellow-500 mb-2">
          <CardContent>
            <div className='flex justify-between items-center'>
              <h2 className='text-xl font-bold text-yellow-400'>{meal.name}</h2>
            </div>
            {meal.image && (
              <img src={meal.image} alt={meal.name} className="w-full h-40 object-cover rounded-md mb-2" />
            )}
            <p className='italic text-sm mb-2'>{meal.description}</p>
            {meal.link && (
              <a href={meal.link} target="_blank" rel="noopener noreferrer" className="text-yellow-300 underline">
                View Recipe
              </a>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CurrentWeekView;
