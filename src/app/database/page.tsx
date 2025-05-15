'use client';

import { FaDatabase, FaTable, FaKey, FaLink, FaInfoCircle, FaFire } from 'react-icons/fa';

export default function DatabasePage() {
  const schema = {
    users: {
      description: "Stores user information and preferences",
      fields: [
        { name: "id", type: "string", constraint: "Document ID", description: "Auto-generated unique identifier" },
        { name: "name", type: "string", constraint: "Required", description: "User's full name" },
        { name: "email", type: "string", constraint: "Required, Unique", description: "User's email address" },
        { name: "phone", type: "string", description: "User's contact number" },
        { name: "dietary_preferences", type: "array", description: "User's dietary restrictions and preferences" },
        { name: "created_at", type: "timestamp", constraint: "Server Timestamp", description: "Account creation timestamp" }
      ]
    },
    ingredients: {
      description: "Stores ingredient information and nutritional data",
      fields: [
        { name: "id", type: "string", constraint: "Document ID", description: "Auto-generated unique identifier" },
        { name: "name", type: "string", constraint: "Required", description: "Name of the ingredient" },
        { name: "category", type: "string", description: "Category of the ingredient (e.g., Vegetables, Meat, Dairy)" },
        { name: "nutritional_info", type: "map", description: "Nutritional information including calories, protein, carbs, fat" },
        { name: "allergens", type: "array", description: "List of allergens present in the ingredient" }
      ]
    },
    recipes: {
      description: "Stores recipe information and cooking instructions",
      fields: [
        { name: "id", type: "string", constraint: "Document ID", description: "Auto-generated unique identifier" },
        { name: "user_id", type: "string", constraint: "Reference to users collection", description: "ID of the user who created the recipe" },
        { name: "name", type: "string", constraint: "Required", description: "Name of the recipe" },
        { name: "cuisine_id", type: "string", constraint: "Reference to cuisines collection", description: "ID of the cuisine this recipe belongs to" },
        { name: "instructions", type: "string", description: "Detailed cooking instructions" },
        { name: "cooking_time", type: "number", description: "Estimated cooking time in minutes" },
        { name: "difficulty_level", type: "string", description: "Difficulty level (Easy, Medium, Hard)" },
        { name: "created_at", type: "timestamp", constraint: "Server Timestamp", description: "Recipe creation timestamp" }
      ]
    },
    recipe_ingredients: {
      description: "Subcollection under recipes storing ingredient details",
      fields: [
        { name: "ingredient_id", type: "string", constraint: "Reference to ingredients collection", description: "ID of the ingredient" },
        { name: "quantity", type: "string", description: "Amount of ingredient needed" },
        { name: "unit", type: "string", description: "Unit of measurement" },
        { name: "notes", type: "string", description: "Additional notes about the ingredient usage" }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-4">
            <FaFire className="w-12 h-12 text-orange-500" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Firebase Database Schema</h1>
              <p className="text-gray-600 mt-2">Detailed overview of the MyAI Cook Firestore database structure</p>
            </div>
          </div>
        </div>

        {/* About Project Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">About MyAI Cook</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-2">Project Overview</h3>
              <p className="text-gray-600 mb-4">
                MyAI Cook is an intelligent cooking assistant that helps users manage recipes, ingredients, and create personalized meal plans. 
                The application uses Firebase Firestore for real-time data management and AI-powered recipe generation.
              </p>
              <h3 className="text-lg font-medium mb-2">Key Features</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>AI-powered recipe generation based on available ingredients</li>
                <li>Real-time recipe management and updates</li>
                <li>Personalized user preferences and dietary restrictions</li>
                <li>Nutritional information tracking</li>
                <li>Multi-cuisine recipe support</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Technical Stack</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Frontend: Next.js, React, TypeScript</li>
                <li>Styling: Tailwind CSS</li>
                <li>Database: Firebase Firestore</li>
                <li>Authentication: Firebase Auth</li>
                <li>Deployment: Vercel</li>
              </ul>
              <h3 className="text-lg font-medium mt-4 mb-2">Database Features</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Real-time data synchronization</li>
                <li>Scalable document-based structure</li>
                <li>Automatic indexing and querying</li>
                <li>Secure data access rules</li>
                <li>Offline data persistence</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Schema Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaInfoCircle className="w-5 h-5 text-primary mr-2" />
              Firestore Schema Overview
            </h2>
            <div className="space-y-4">
              <div className="text-sm text-gray-600">
                <p className="font-medium mb-2">Database Type: Firebase Firestore</p>
                <p>This schema represents the document-based structure of the MyAI Cook application, optimized for real-time updates and flexible data modeling.</p>
              </div>
              <div className="space-y-2">
                <p className="font-medium">Key Features:</p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  <li>Document-based NoSQL database</li>
                  <li>Real-time data synchronization</li>
                  <li>Automatic scaling</li>
                  <li>Offline persistence</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Collection Relationships</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Users collection contains user profiles and preferences</p>
              <p>• Recipes collection stores recipe documents with subcollections</p>
              <p>• Ingredients collection maintains ingredient information</p>
              <p>• Recipe_ingredients is a subcollection under each recipe</p>
              <p>• References are used for relationships between collections</p>
            </div>
          </div>
        </div>

        {/* Collections Section */}
        <div className="space-y-8">
          {Object.entries(schema).map(([collectionName, collectionInfo]) => (
            <div key={collectionName} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <FaTable className="w-5 h-5 text-gray-500" />
                  <h2 className="text-xl font-semibold capitalize">{collectionName.replace('_', ' ')}</h2>
                </div>
                <p className="text-gray-600 mt-2">{collectionInfo.description}</p>
              </div>

              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Constraints</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {collectionInfo.fields.map((field, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {field.constraint?.includes('Document ID') && (
                                <FaKey className="w-4 h-4 text-yellow-500 mr-2" />
                              )}
                              {field.constraint?.includes('Reference') && (
                                <FaLink className="w-4 h-4 text-blue-500 mr-2" />
                              )}
                              <span className="font-medium text-gray-900">{field.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{field.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{field.constraint}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{field.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 