'use client'

import { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'

interface Ingredient {
  id: string
  name: string
  category: string
  quantity: string
  unit: string
}

export default function IngredientsPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    category: '',
    quantity: '',
    unit: '',
  })
  const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null)

  useEffect(() => {
    fetchIngredients()
  }, [])

  const fetchIngredients = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'ingredients'))
      const ingredientsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Ingredient[]
      setIngredients(ingredientsData)
    } catch (error) {
      toast.error('Error fetching ingredients')
    }
  }

  const handleAddIngredient = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'ingredients'), newIngredient)
      setNewIngredient({ name: '', category: '', quantity: '', unit: '' })
      fetchIngredients()
      toast.success('Ingredient added successfully!')
    } catch (error) {
      toast.error('Error adding ingredient')
    }
  }

  const handleUpdateIngredient = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingIngredient) return

    try {
      const ingredientRef = doc(db, 'ingredients', editingIngredient.id)
      await updateDoc(ingredientRef, editingIngredient)
      setEditingIngredient(null)
      fetchIngredients()
      toast.success('Ingredient updated successfully!')
    } catch (error) {
      toast.error('Error updating ingredient')
    }
  }

  const handleDeleteIngredient = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'ingredients', id))
      fetchIngredients()
      toast.success('Ingredient deleted successfully!')
    } catch (error) {
      toast.error('Error deleting ingredient')
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Ingredient Management</h1>

      {/* Add/Edit Ingredient Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingIngredient ? 'Edit Ingredient' : 'Add New Ingredient'}
        </h2>
        <form onSubmit={editingIngredient ? handleUpdateIngredient : handleAddIngredient} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={editingIngredient ? editingIngredient.name : newIngredient.name}
                onChange={(e) =>
                  editingIngredient
                    ? setEditingIngredient({ ...editingIngredient, name: e.target.value })
                    : setNewIngredient({ ...newIngredient, name: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={editingIngredient ? editingIngredient.category : newIngredient.category}
                onChange={(e) =>
                  editingIngredient
                    ? setEditingIngredient({ ...editingIngredient, category: e.target.value })
                    : setNewIngredient({ ...newIngredient, category: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Select a category</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Meat">Meat</option>
                <option value="Dairy">Dairy</option>
                <option value="Spices">Spices</option>
                <option value="Grains">Grains</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <input
                type="text"
                value={editingIngredient ? editingIngredient.quantity : newIngredient.quantity}
                onChange={(e) =>
                  editingIngredient
                    ? setEditingIngredient({ ...editingIngredient, quantity: e.target.value })
                    : setNewIngredient({ ...newIngredient, quantity: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Unit</label>
              <select
                value={editingIngredient ? editingIngredient.unit : newIngredient.unit}
                onChange={(e) =>
                  editingIngredient
                    ? setEditingIngredient({ ...editingIngredient, unit: e.target.value })
                    : setNewIngredient({ ...newIngredient, unit: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Select a unit</option>
                <option value="g">Grams (g)</option>
                <option value="kg">Kilograms (kg)</option>
                <option value="ml">Milliliters (ml)</option>
                <option value="l">Liters (l)</option>
                <option value="tsp">Teaspoon (tsp)</option>
                <option value="tbsp">Tablespoon (tbsp)</option>
                <option value="cup">Cup</option>
                <option value="piece">Piece</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center space-x-2"
            >
              {editingIngredient ? (
                <>
                  <FaEdit />
                  <span>Update Ingredient</span>
                </>
              ) : (
                <>
                  <FaPlus />
                  <span>Add Ingredient</span>
                </>
              )}
            </button>
            {editingIngredient && (
              <button
                type="button"
                onClick={() => setEditingIngredient(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </motion.div>

      {/* Ingredients List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ingredients.map((ingredient) => (
          <motion.div
            key={ingredient.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{ingredient.name}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingIngredient(ingredient)}
                  className="text-yellow-500 hover:text-yellow-600"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteIngredient(ingredient.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Category:</span> {ingredient.category}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Quantity:</span> {ingredient.quantity} {ingredient.unit}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 