'use client'

import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import toast from 'react-hot-toast'

interface GeneratedRecipe {
  name: string;
  cuisine: string;
  cooking_time: number;
  difficulty_level: string;
  instructions: string[];
  ingredients: {
    name: string;
    quantity: string;
    unit: string;
    notes?: string;
  }[];
  nutritional_info: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export default function AIAssistant() {
  const [ingredients, setIngredients] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [generatedRecipe, setGeneratedRecipe] = useState<GeneratedRecipe | null>(null)
  const [currentUserId, setCurrentUserId] = useState<string>('')

  const dietaryOptions = [
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Dairy-Free',
    'Nut-Free',
    'Low-Carb',
    'Low-Fat',
    'High-Protein'
  ]

  const cuisineOptions = [
    'Italian',
    'Indian',
    'Chinese',
    'Mexican',
    'Japanese',
    'Mediterranean',
    'Thai',
    'American'
  ]

  const generateRecipe = async () => {
    if (!ingredients.trim()) {
      toast.error('Please enter at least one ingredient')
      return
    }

    setIsLoading(true)
    try {
      // Simulate AI recipe generation (replace with actual AI API call)
      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients: ingredients.split(',').map(i => i.trim()),
          cuisine,
          dietaryPreferences,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate recipe')
      }

      const recipe = await response.json()
      setGeneratedRecipe(recipe)
      toast.success('Recipe generated successfully!')
    } catch (error) {
      toast.error('Error generating recipe')
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const saveRecipe = async () => {
    if (!generatedRecipe || !currentUserId) {
      toast.error('No recipe to save or user not found')
      return
    }

    try {
      // First, save ingredients to get their IDs
      const ingredientPromises = generatedRecipe.ingredients.map(async (ing) => {
        const ingredientDoc = await addDoc(collection(db, 'ingredients'), {
          name: ing.name,
          category: 'Generated',
          nutritional_info: {
            calories: 0, // These would be populated from a real ingredient database
            protein: 0,
            carbs: 0,
            fat: 0,
          },
          allergens: [],
        })
        return {
          ingredient_id: ingredientDoc.id,
          quantity: ing.quantity,
          unit: ing.unit,
          notes: ing.notes,
        }
      })

      const recipeIngredients = await Promise.all(ingredientPromises)

      // Save the recipe
      await addDoc(collection(db, 'recipes'), {
        user_id: currentUserId,
        name: generatedRecipe.name,
        cuisine_id: cuisine.toLowerCase(),
        instructions: generatedRecipe.instructions.join('\n'),
        cooking_time: generatedRecipe.cooking_time,
        difficulty_level: generatedRecipe.difficulty_level,
        ingredients: recipeIngredients,
        created_at: new Date(),
      })

      toast.success('Recipe saved successfully!')
    } catch (error) {
      toast.error('Error saving recipe')
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">AI Recipe Assistant</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Generate Recipe</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Available Ingredients</label>
              <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Enter ingredients separated by commas (e.g., chicken, rice, tomatoes)"
                className="input-field h-32"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Cuisine</label>
              <select
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="input-field"
              >
                <option value="">Select a cuisine</option>
                {cuisineOptions.map((option) => (
                  <option key={option} value={option.toLowerCase()}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Dietary Preferences</label>
              <div className="grid grid-cols-2 gap-2">
                {dietaryOptions.map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={dietaryPreferences.includes(option)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setDietaryPreferences([...dietaryPreferences, option])
                        } else {
                          setDietaryPreferences(dietaryPreferences.filter(p => p !== option))
                        }
                      }}
                      className="rounded text-primary focus:ring-primary"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={generateRecipe}
              disabled={isLoading}
              className="btn-primary w-full"
            >
              {isLoading ? 'Generating...' : 'Generate Recipe'}
            </button>
          </div>
        </div>

        {/* Generated Recipe Section */}
        {generatedRecipe && (
          <div className="card">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-semibold">{generatedRecipe.name}</h2>
              <button
                onClick={saveRecipe}
                className="btn-secondary"
                disabled={!currentUserId}
              >
                Save Recipe
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Cuisine</p>
                  <p className="font-medium">{generatedRecipe.cuisine}</p>
                </div>
                <div>
                  <p className="text-gray-600">Cooking Time</p>
                  <p className="font-medium">{generatedRecipe.cooking_time} minutes</p>
                </div>
                <div>
                  <p className="text-gray-600">Difficulty</p>
                  <p className="font-medium">{generatedRecipe.difficulty_level}</p>
                </div>
                <div>
                  <p className="text-gray-600">Calories</p>
                  <p className="font-medium">{generatedRecipe.nutritional_info.calories} kcal</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
                <ul className="list-disc list-inside space-y-1">
                  {generatedRecipe.ingredients.map((ing, index) => (
                    <li key={index}>
                      {ing.quantity} {ing.unit} {ing.name}
                      {ing.notes && ` (${ing.notes})`}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Instructions</h3>
                <ol className="list-decimal list-inside space-y-2">
                  {generatedRecipe.instructions.map((step, index) => (
                    <li key={index} className="pl-2">{step}</li>
                  ))}
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Nutritional Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Protein</p>
                    <p className="font-medium">{generatedRecipe.nutritional_info.protein}g</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Carbohydrates</p>
                    <p className="font-medium">{generatedRecipe.nutritional_info.carbs}g</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Fat</p>
                    <p className="font-medium">{generatedRecipe.nutritional_info.fat}g</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 