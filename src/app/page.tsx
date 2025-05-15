'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaRobot, FaUtensils, FaCarrot, FaGlobe, FaChartLine, FaBrain } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              MyAI Cook
              <span className="text-red-600"> Pro</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Your intelligent cooking companion powered by advanced AI technology
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/ai-assistant" className="btn-primary bg-red-600 hover:bg-red-700 text-white">
                <FaRobot className="mr-2" />
                Try AI Assistant
              </Link>
              <Link href="/recipes" className="btn-secondary bg-orange-500 hover:bg-orange-600 text-white">
                <FaUtensils className="mr-2" />
                Browse Recipes
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">AI-Powered Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="card p-6 text-center border-2 border-red-100 hover:border-red-200"
            >
              <FaBrain className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Recipe Generation</h3>
              <p className="text-gray-600">
                Our AI analyzes your ingredients and preferences to create personalized recipes
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="card p-6 text-center border-2 border-orange-100 hover:border-orange-200"
            >
              <FaChartLine className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nutritional Analysis</h3>
              <p className="text-gray-600">
                Get detailed nutritional information and dietary recommendations
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="card p-6 text-center border-2 border-yellow-100 hover:border-yellow-200"
            >
              <FaGlobe className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Global Cuisine</h3>
              <p className="text-gray-600">
                Explore recipes from around the world with authentic cooking methods
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 md:px-8 bg-orange-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Input Ingredients</h3>
              <p className="text-gray-600">Tell us what you have in your kitchen</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Analysis</h3>
              <p className="text-gray-600">Our AI processes your ingredients and preferences</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-yellow-600">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Recipe Generation</h3>
              <p className="text-gray-600">Get personalized recipe suggestions</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Cook & Enjoy</h3>
              <p className="text-gray-600">Follow step-by-step instructions and enjoy your meal</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="card p-6 border-2 border-red-100"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-red-600">A</span>
                </div>
                <div>
                  <h3 className="font-semibold">Alex M.</h3>
                  <p className="text-gray-500">Home Chef</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The AI recipe suggestions are amazing! It's like having a personal chef who knows exactly what I like."
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="card p-6 border-2 border-orange-100"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-orange-600">S</span>
                </div>
                <div>
                  <h3 className="font-semibold">Sarah K.</h3>
                  <p className="text-gray-500">Food Blogger</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The nutritional analysis feature helps me create healthier meals for my family. Love it!"
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="card p-6 border-2 border-yellow-100"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-yellow-600">M</span>
                </div>
                <div>
                  <h3 className="font-semibold">Mike R.</h3>
                  <p className="text-gray-500">Professional Chef</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The AI's understanding of flavor combinations is impressive. It's a great tool for inspiration!"
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Cooking?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already enjoying personalized AI-powered cooking experiences
          </p>
          <Link href="/ai-assistant" className="btn-primary bg-white text-red-600 hover:bg-gray-100">
            <FaRobot className="mr-2" />
            Start Cooking with AI
          </Link>
        </div>
      </section>
    </div>
  );
} 