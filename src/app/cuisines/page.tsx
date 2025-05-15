'use client'

import { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { FaPlus, FaEdit, FaTrash, FaGlobe } from 'react-icons/fa'

interface Cuisine {
  id: string
  name: string
  description: string
  region: string
  popularDishes: string[]
}

export default function CuisinesPage() {
  const [cuisines, setCuisines] = useState<Cuisine[]>([])
  const [newCuisine, setNewCuisine] = useState({
    name: '',
    description: '',
    region: '',
    popularDishes: [''],
  })
  const [editingCuisine, setEditingCuisine] = useState<Cuisine | null>(null)

  useEffect(() => {
    fetchCuisines()
  }, [])

  const fetchCuisines = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'cuisines'))
      const cuisinesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Cuisine[]
      setCuisines(cuisinesData)
    } catch (error) {
      toast.error('Error fetching cuisines')
    }
  }

  const handleAddCuisine = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const dishes = newCuisine.popularDishes.filter(dish => dish.trim() !== '')
      await addDoc(collection(db, 'cuisines'), {
        ...newCuisine,
        popularDishes: dishes,
      })
      setNewCuisine({ name: '', description: '', region: '', popularDishes: [''] })
      fetchCuisines()
      toast.success('Cuisine added successfully!')
    } catch (error) {
      toast.error('Error adding cuisine')
    }
  }

  const handleUpdateCuisine = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingCuisine) return

    try {
      const cuisineRef = doc(db, 'cuisines', editingCuisine.id)
      await updateDoc(cuisineRef, editingCuisine)
      setEditingCuisine(null)
      fetchCuisines()
      toast.success('Cuisine updated successfully!')
    } catch (error) {
      toast.error('Error updating cuisine')
    }
  }

  const handleDeleteCuisine = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'cuisines', id))
      fetchCuisines()
      toast.success('Cuisine deleted successfully!')
    } catch (error) {
      toast.error('Error deleting cuisine')
    }
  }

  const addDishField = () => {
    if (editingCuisine) {
      setEditingCuisine({
        ...editingCuisine,
        popularDishes: [...editingCuisine.popularDishes, ''],
      })
    } else {
      setNewCuisine({
        ...newCuisine,
        popularDishes: [...newCuisine.popularDishes, ''],
      })
    }
  }

  const updateDish = (index: number, value: string) => {
    if (editingCuisine) {
      const updatedDishes = [...editingCuisine.popularDishes]
      updatedDishes[index] = value
      setEditingCuisine({ ...editingCuisine, popularDishes: updatedDishes })
    } else {
      const updatedDishes = [...newCuisine.popularDishes]
      updatedDishes[index] = value
      setNewCuisine({ ...newCuisine, popularDishes: updatedDishes })
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <FaGlobe className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold">Cuisine Management</h1>
      </div>

      {/* Add/Edit Cuisine Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingCuisine ? 'Edit Cuisine' : 'Add New Cuisine'}
        </h2>
        <form onSubmit={editingCuisine ? handleUpdateCuisine : handleAddCuisine} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={editingCuisine ? editingCuisine.name : newCuisine.name}
                onChange={(e) =>
                  editingCuisine
                    ? setEditingCuisine({ ...editingCuisine, name: e.target.value })
                    : setNewCuisine({ ...newCuisine, name: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Region</label>
              <input
                type="text"
                value={editingCuisine ? editingCuisine.region : newCuisine.region}
                onChange={(e) =>
                  editingCuisine
                    ? setEditingCuisine({ ...editingCuisine, region: e.target.value })
                    : setNewCuisine({ ...newCuisine, region: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={editingCuisine ? editingCuisine.description : newCuisine.description}
              onChange={(e) =>
                editingCuisine
                  ? setEditingCuisine({ ...editingCuisine, description: e.target.value })
                  : setNewCuisine({ ...newCuisine, description: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Popular Dishes</label>
            <div className="space-y-2">
              {(editingCuisine ? editingCuisine.popularDishes : newCuisine.popularDishes).map(
                (dish, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      value={dish}
                      onChange={(e) => updateDish(index, e.target.value)}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder={`Dish ${index + 1}`}
                    />
                  </div>
                )
              )}
              <button
                type="button"
                onClick={addDishField}
                className="text-blue-500 hover:text-blue-600 text-sm"
              >
                + Add Another Dish
              </button>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center space-x-2"
            >
              {editingCuisine ? (
                <>
                  <FaEdit />
                  <span>Update Cuisine</span>
                </>
              ) : (
                <>
                  <FaPlus />
                  <span>Add Cuisine</span>
                </>
              )}
            </button>
            {editingCuisine && (
              <button
                type="button"
                onClick={() => setEditingCuisine(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </motion.div>

      {/* Cuisines List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cuisines.map((cuisine) => (
          <motion.div
            key={cuisine.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{cuisine.name}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingCuisine(cuisine)}
                  className="text-yellow-500 hover:text-yellow-600"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteCuisine(cuisine.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Region:</span> {cuisine.region}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Description:</span> {cuisine.description}
              </p>
              <div>
                <span className="font-medium">Popular Dishes:</span>
                <ul className="list-disc list-inside mt-1">
                  {cuisine.popularDishes.map((dish, index) => (
                    <li key={index} className="text-gray-600">
                      {dish}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 