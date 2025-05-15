'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaBrain, FaCogs, FaChartLine, FaMicrochip } from 'react-icons/fa';

interface ConceptCardProps {
  title: string;
  description: string;
  currentImplementation: string[];
  futureEnhancements?: string[];
  icon: React.ReactNode;
}

const ConceptCard: React.FC<ConceptCardProps> = ({
  title,
  description,
  currentImplementation,
  futureEnhancements = [],
  icon,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-blue-500"
    >
      <div className="flex items-center mb-4">
        <div className="text-blue-500 mr-3 text-2xl">{icon}</div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="bg-gray-50 p-4 rounded-md mb-4">
        <h3 className="font-semibold text-gray-700 mb-2">Current Implementation:</h3>
        <ul className="list-disc list-inside text-gray-600">
          {currentImplementation.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {futureEnhancements.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-md">
          <h3 className="font-semibold text-blue-700 mb-2">Future Enhancements:</h3>
          <ul className="list-disc list-inside text-blue-600">
            {futureEnhancements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

const AIMLImplementation: React.FC = () => {
  const concepts = [
    {
      title: "Natural Language Understanding (NLU)",
      description: "Understanding user input like ingredients, cuisine type, and dietary preferences.",
      currentImplementation: [
        "Input parsing logic accepts unstructured or semi-structured user data",
        "Handles ingredients lists like ['tomato', 'chicken', 'basil']",
        "Processes preferences like ['low-carb', 'gluten-free']"
      ],
      futureEnhancements: [
        "Integration with NLP libraries (spaCy, HuggingFace Transformers)",
        "OpenAI API integration for natural text understanding",
        "Support for complex queries like 'Make me a quick Italian dinner without dairy'"
      ],
      icon: <FaBrain />
    },
    {
      title: "Rule-based AI (Expert Systems)",
      description: "AI logic built using human domain knowledge and culinary expertise.",
      currentImplementation: [
        "Recipe templates with cuisine-specific rules",
        "Common ingredients database",
        "Typical cooking instructions",
        "Standardized measurement units"
      ],
      futureEnhancements: [],
      icon: <FaCogs />
    },
    {
      title: "Procedural Generation",
      description: "Creating semi-random outputs with constraints for recipe variations.",
      currentImplementation: [
        "Randomized ingredient quantities",
        "Dynamic cooking time ranges",
        "Variable difficulty levels"
      ],
      futureEnhancements: [],
      icon: <FaMicrochip />
    },
    {
      title: "Nutritional Prediction",
      description: "Simulating nutrition calculations based on ingredients and portions.",
      currentImplementation: [
        "Basic calorie estimation",
        "Macronutrient calculations"
      ],
      futureEnhancements: [
        "Integration with nutrition databases (Edamam, USDA FoodData Central)",
        "Accurate macro calculations",
        "Allergen detection"
      ],
      icon: <FaChartLine />
    },
    {
      title: "Machine Learning Integration",
      description: "Potential for advanced ML model integration.",
      currentImplementation: [],
      futureEnhancements: [
        "Recommendation systems based on user history",
        "Transformer models for natural language generation",
        "Computer vision for ingredient recognition",
        "Dietary matching models"
      ],
      icon: <FaRobot />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center text-gray-800 mb-8"
        >
          AI/ML Concepts in Cook Assistant
        </motion.h1>

        <div className="space-y-6">
          {concepts.map((concept, index) => (
            <ConceptCard
              key={index}
              title={concept.title}
              description={concept.description}
              currentImplementation={concept.currentImplementation}
              futureEnhancements={concept.futureEnhancements}
              icon={concept.icon}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-white rounded-lg shadow-md p-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Implementation Summary</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    AI/ML Concept
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Implementation in Cook Assistant
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Natural Language Understanding
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    Understanding ingredients, cuisines, and preferences
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Rule-based AI
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    Cuisine-specific templates and logic
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Procedural Generation
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    Random cooking time, instructions, and units
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Nutrition Estimation
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    Mock calorie and macro generation
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ML-ready Architecture
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    Easy to plug in future models for smart predictions
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIMLImplementation; 