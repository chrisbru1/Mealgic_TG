import React, { memo } from 'react';

const CommunityRecipes = memo(() => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">🌐 Community Recipes</h2>
      <p className="text-yellow-500 italic">Coming Soon! Exciting recipes from the community are on their way.</p>
    </div>
  );
});

export default CommunityRecipes;
