'use client'

import { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import toast from 'react-hot-toast'

interface Recipe {
  id: string
  user_id: string
  name: string
  cuisine_id: string
  instructions: string
  cooking_time: number
  difficulty_level: string
  ingredients: {
    ingredient_id: string
    quantity: string
    unit: string
    notes: string
  }[]
  created_at: Date
}

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    cuisine_id: '',
    instructions: '',
    cooking_time: 0,
    difficulty_level: 'Easy',
    ingredients: [{ ingredient_id: '', quantity: '', unit: '', notes: '' }],
  })
  const [currentUserId, setCurrentUserId] = useState<string>('')

  useEffect(() => {
    // In a real app, this would come from authentication
    // For now, we'll use the first user in the database
    const fetchCurrentUser = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, 'users'))
        if (!usersSnapshot.empty) {
          setCurrentUserId(usersSnapshot.docs[0].id)
        }
      } catch (error) {
        toast.error('Error fetching current user')
      }
    }

    fetchCurrentUser()
    fetchRecipes()
  }, [])

  const fetchRecipes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'recipes'))
      const recipesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Recipe[]
      setRecipes(recipesData)
    } catch (error) {
      toast.error('Error fetching recipes')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUserId) {
      toast.error('Please add a user first')
      return
    }

    try {
      await addDoc(collection(db, 'recipes'), {
        ...newRecipe,
        user_id: currentUserId,
        created_at: new Date(),
      })
      
      setNewRecipe({
        name: '',
        cuisine_id: '',
        instructions: '',
        cooking_time: 0,
        difficulty_level: 'Easy',
        ingredients: [{ ingredient_id: '', quantity: '', unit: '', notes: '' }],
      })
      
      toast.success('Recipe added successfully')
      fetchRecipes()
    } catch (error) {
      toast.error('Error adding recipe')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'recipes', id))
      toast.success('Recipe deleted successfully')
      fetchRecipes()
    } catch (error) {
      toast.error('Error deleting recipe')
    }
  }

  const addIngredient = () => {
    setNewRecipe({
      ...newRecipe,
      ingredients: [...newRecipe.ingredients, { ingredient_id: '', quantity: '', unit: '', notes: '' }],
    })
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Recipe Management</h1>
      
      {!currentUserId && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <p className="text-yellow-700">
            Please add a user first before creating recipes.
          </p>
        </div>
      )}
      
      {/* Add Recipe Form */}
      <div className="card mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add New Recipe</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Recipe Name</label>
            <input
              type="text"
              value={newRecipe.name}
              onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
              className="input-field"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Cuisine</label>
            <select
              value={newRecipe.cuisine_id}
              onChange={(e) => setNewRecipe({ ...newRecipe, cuisine_id: e.target.value })}
              className="input-field"
              required
            >
              <option value="">Select a cuisine</option>
              <option value="italian">Italian</option>
              <option value="indian">Indian</option>
              <option value="chinese">Chinese</option>
              <option value="mexican">Mexican</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Cooking Time (minutes)</label>
            <input
              type="number"
              value={newRecipe.cooking_time}
              onChange={(e) => setNewRecipe({ ...newRecipe, cooking_time: parseInt(e.target.value) })}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Difficulty Level</label>
            <select
              value={newRecipe.difficulty_level}
              onChange={(e) => setNewRecipe({ ...newRecipe, difficulty_level: e.target.value })}
              className="input-field"
              required
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Instructions</label>
            <textarea
              value={newRecipe.instructions}
              onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
              className="input-field h-32"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Ingredients</label>
            {newRecipe.ingredients.map((ingredient, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Ingredient ID"
                  value={ingredient.ingredient_id}
                  onChange={(e) => {
                    const newIngredients = [...newRecipe.ingredients]
                    newIngredients[index].ingredient_id = e.target.value
                    setNewRecipe({ ...newRecipe, ingredients: newIngredients })
                  }}
                  className="input-field"
                  required
                />
                <input
                  type="text"
                  placeholder="Quantity"
                  value={ingredient.quantity}
                  onChange={(e) => {
                    const newIngredients = [...newRecipe.ingredients]
                    newIngredients[index].quantity = e.target.value
                    setNewRecipe({ ...newRecipe, ingredients: newIngredients })
                  }}
                  className="input-field"
                  required
                />
                <input
                  type="text"
                  placeholder="Unit"
                  value={ingredient.unit}
                  onChange={(e) => {
                    const newIngredients = [...newRecipe.ingredients]
                    newIngredients[index].unit = e.target.value
                    setNewRecipe({ ...newRecipe, ingredients: newIngredients })
                  }}
                  className="input-field"
                  required
                />
                <input
                  type="text"
                  placeholder="Notes"
                  value={ingredient.notes}
                  onChange={(e) => {
                    const newIngredients = [...newRecipe.ingredients]
                    newIngredients[index].notes = e.target.value
                    setNewRecipe({ ...newRecipe, ingredients: newIngredients })
                  }}
                  className="input-field"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredient}
              className="btn-secondary"
            >
              Add Another Ingredient
            </button>
          </div>

          <button type="submit" className="btn-primary" disabled={!currentUserId}>
            Add Recipe
          </button>
        </form>
      </div>

      {/* Recipe List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Your Recipes</h2>
        {recipes.map((recipe) => (
          <div key={recipe.id} className="card">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{recipe.name}</h3>
                <p className="text-gray-600 mt-2">Cuisine: {recipe.cuisine_id}</p>
                <p className="text-gray-600 mt-2">Cooking Time: {recipe.cooking_time} minutes</p>
                <p className="text-gray-600 mt-2">Difficulty: {recipe.difficulty_level}</p>
                <p className="text-gray-600 mt-2">Instructions: {recipe.instructions}</p>
                <div className="mt-2">
                  <h4 className="font-medium">Ingredients:</h4>
                  <ul className="list-disc list-inside">
                    {recipe.ingredients.map((ing, idx) => (
                      <li key={idx}>
                        {ing.quantity} {ing.unit} of ingredient {ing.ingredient_id}
                        {ing.notes && ` (${ing.notes})`}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-gray-600 mt-2">
                  Created: {new Date(recipe.created_at).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(recipe.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 