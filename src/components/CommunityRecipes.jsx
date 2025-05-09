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

**Key Change:**

I've changed these import statements:

```javascript
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
```

To use relative paths:

```javascript
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
```

This tells React to look for the `card` and `button` components in the `ui` folder within the same directory as `CommunityRecipes.jsx` (which is `src/components`).

**After making this change:**

1.  **Save:** Save the `CommunityRecipes.jsx` file with the corrected import paths.
2.  **Commit:** Commit the changes to your Git repository.
3.  **Push:** Push the changes to your GitHub repository.
4.  **Vercel will redeploy:** Vercel should automatically start a new deployment with the corrected import pat
