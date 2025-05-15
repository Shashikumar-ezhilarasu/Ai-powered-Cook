'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaHome, FaUtensils, FaCarrot, FaGlobe, FaRobot, FaUsers, FaInfoCircle, FaDatabase } from 'react-icons/fa'
import { useState } from 'react'

const Sidebar = () => {
  const pathname = usePathname()
  const [showDetails, setShowDetails] = useState(false)

  const navItems = [
    { href: '/', label: 'Home', icon: FaHome },
    { href: '/users', label: 'Users', icon: FaUsers },
    { href: '/recipes', label: 'Recipes', icon: FaUtensils },
    { href: '/ingredients', label: 'Ingredients', icon: FaCarrot },
    { href: '/cuisines', label: 'Cuisines', icon: FaGlobe },
    { href: '/ai-assistant', label: 'AI Assistant', icon: FaRobot },
    { href: '/database', label: 'Database Schema', icon: FaDatabase },
  ]

  const databaseSchema = {
    users: {
      id: 'string',
      name: 'string',
      email: 'string',
      phone: 'string',
      dietary_preferences: 'string[]',
      created_at: 'timestamp'
    },
    recipes: {
      id: 'string',
      user_id: 'string',
      name: 'string',
      cuisine_id: 'string',
      instructions: 'string',
      cooking_time: 'number',
      difficulty_level: 'string',
      ingredients: [{
        ingredient_id: 'string',
        quantity: 'string',
        unit: 'string',
        notes: 'string'
      }],
      created_at: 'timestamp'
    },
    ingredients: {
      id: 'string',
      name: 'string',
      category: 'string',
      quantity: 'string',
      unit: 'string',
      nutritional_info: {
        calories: 'number',
        protein: 'number',
        carbs: 'number',
        fat: 'number'
      },
      allergens: 'string[]'
    },
    cuisines: {
      id: 'string',
      name: 'string',
      description: 'string',
      region: 'string',
      popularDishes: 'string[]'
    }
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg z-10">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-primary">MyAI Cook</h1>
      </div>
      <nav className="p-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary/10 text-primary border-l-4 border-primary' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}

        {/* Project Details Section */}
        <div className="mt-8 border-t border-gray-200 pt-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaInfoCircle className="w-5 h-5 mr-3" />
            <span className="font-medium">Project Details</span>
          </button>

          {showDetails && (
            <div className="mt-2 pl-4">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Database Schema</h3>
                <div className="space-y-2 text-xs text-gray-600">
                  {Object.entries(databaseSchema).map(([collection, schema]) => (
                    <div key={collection} className="bg-gray-50 p-2 rounded">
                      <div className="font-medium text-gray-800">{collection}</div>
                      <pre className="mt-1 overflow-x-auto">
                        {JSON.stringify(schema, null, 2)}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-xs text-gray-500">
                <p className="mb-2">Tech Stack:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Next.js + React</li>
                  <li>TypeScript</li>
                  <li>Firebase Firestore</li>
                  <li>Tailwind CSS</li>
                  <li>Framer Motion</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar 