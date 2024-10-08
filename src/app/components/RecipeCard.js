"use client"; // This should be at the top of the file
import React from 'react';
import Image from 'next/image';

const RecipeCard = ({ recipe }) => {
  if (!recipe) return null; // Guard clause for undefined recipe

  // Extract the relevant meal data
  const {
    strMeal,
    strMealThumb,
    strInstructions,
    ...ingredients
  } = recipe;

  // Prepare the ingredients list
  const ingredientsList = Object.keys(ingredients)
    .filter(key => key.startsWith('strIngredient') && ingredients[key]) // Get non-empty ingredients
    .map((key, index) => {
      const measureKey = `strMeasure${index + 1}`;
      return `${ingredients[key]} ${ingredients[measureKey] || ''}`.trim();
    });

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {/* Upper Part */}
      <div className="flex">
        {/* Left Side - Image */}
        <div className="flex-1">
          <Image 
            src={strMealThumb} // Image thumbnail
            alt={strMeal}
            width={300}
            height={200}
            className="w-full h-full object-cover rounded-lg" // Cover the area properly
          />
        </div>
        {/* Right Side - Ingredients */}
        <div className="flex-1 pl-4 flex flex-col">
          <h2 className="text-lg font-semibold">{strMeal}</h2>
          <h3 className="font-semibold mt-4">Ingredients:</h3>
          <div className="flex flex-col"> {/* Change to vertical layout */}
            {ingredientsList.map((ingredient, index) => (
              <div key={index} className="py-1"> {/* Each ingredient has some vertical spacing */}
                {ingredient}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lower Part - Recipe Instructions */}
      <div className="mt-4">
        <h3 className="font-semibold">Instructions:</h3>
        <p>{strInstructions}</p>
      </div>
    </div>
  );
};

export default RecipeCard; // Ensure this line is the default export
