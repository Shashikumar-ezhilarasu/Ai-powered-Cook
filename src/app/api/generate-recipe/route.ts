import { NextResponse } from 'next/server';

interface RecipeRequest {
  ingredients: string[];
  cuisine: string;
  dietaryPreferences: string[];
}

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

// Mock recipe templates for different cuisines
const recipeTemplates = {
  italian: {
    baseInstructions: [
      "Heat olive oil in a large pan",
      "Sauté garlic and onions until fragrant",
      "Add main ingredients and cook until tender",
      "Season with Italian herbs and spices",
      "Garnish with fresh herbs and serve"
    ],
    commonIngredients: ["olive oil", "garlic", "onion", "tomatoes", "basil", "oregano"],
    typicalUnits: ["tbsp", "clove", "medium", "cup", "handful", "tsp"]
  },
  indian: {
    baseInstructions: [
      "Heat oil in a pan and add whole spices",
      "Add chopped onions and sauté until golden",
      "Add ginger-garlic paste and cook until fragrant",
      "Add main ingredients and cook with spices",
      "Finish with fresh herbs and serve with rice or bread"
    ],
    commonIngredients: ["oil", "cumin", "turmeric", "ginger", "garlic", "coriander"],
    typicalUnits: ["tbsp", "tsp", "inch", "clove", "handful", "cup"]
  },
  chinese: {
    baseInstructions: [
      "Heat oil in a wok",
      "Add aromatics and stir-fry briefly",
      "Add main ingredients and cook quickly",
      "Add sauce and thicken",
      "Garnish with green onions and serve"
    ],
    commonIngredients: ["sesame oil", "ginger", "garlic", "soy sauce", "green onion", "cornstarch"],
    typicalUnits: ["tbsp", "tsp", "clove", "stalk", "cup", "tbsp"]
  },
  mexican: {
    baseInstructions: [
      "Heat oil in a pan",
      "Sauté onions and peppers",
      "Add main ingredients and cook",
      "Season with Mexican spices",
      "Garnish with fresh cilantro and serve"
    ],
    commonIngredients: ["olive oil", "onion", "bell pepper", "cumin", "chili powder", "cilantro"],
    typicalUnits: ["tbsp", "medium", "cup", "tsp", "handful", "tbsp"]
  }
};

export async function POST(request: Request) {
  try {
    const { ingredients, cuisine, dietaryPreferences } = await request.json() as RecipeRequest;

    if (!ingredients || ingredients.length === 0) {
      return NextResponse.json(
        { error: 'Please provide at least one ingredient' },
        { status: 400 }
      );
    }

    // Get the appropriate template based on cuisine
    const template = recipeTemplates[cuisine as keyof typeof recipeTemplates] || recipeTemplates.italian;

    // Generate a recipe name based on main ingredients and cuisine
    const mainIngredient = ingredients[0];
    const recipeName = `${cuisine.charAt(0).toUpperCase() + cuisine.slice(1)} ${mainIngredient} ${dietaryPreferences.length > 0 ? `(${dietaryPreferences.join(', ')})` : ''}`;

    // Generate ingredient list with quantities
    const recipeIngredients = ingredients.map(ingredient => ({
      name: ingredient,
      quantity: (Math.random() * 2 + 1).toFixed(1),
      unit: template.typicalUnits[Math.floor(Math.random() * template.typicalUnits.length)],
      notes: Math.random() > 0.7 ? 'chopped' : undefined
    }));

    // Add common ingredients for the cuisine
    template.commonIngredients.forEach(ingredient => {
      if (!ingredients.includes(ingredient)) {
        recipeIngredients.push({
          name: ingredient,
          quantity: (Math.random() * 2 + 1).toFixed(1),
          unit: template.typicalUnits[Math.floor(Math.random() * template.typicalUnits.length)],
          notes: undefined
        });
      }
    });

    // Generate cooking time and difficulty
    const cookingTime = Math.floor(Math.random() * 60) + 30; // 30-90 minutes
    const difficultyLevels = ['Easy', 'Medium', 'Hard'];
    const difficultyLevel = difficultyLevels[Math.floor(Math.random() * difficultyLevels.length)];

    // Generate detailed instructions
    const instructions = template.baseInstructions.map((step, index) => {
      if (index === 2) {
        return `${step} (${ingredients.join(', ')})`;
      }
      return step;
    });

    // Calculate nutritional information (mock values)
    const nutritionalInfo = {
      calories: Math.floor(Math.random() * 500) + 300,
      protein: Math.floor(Math.random() * 30) + 10,
      carbs: Math.floor(Math.random() * 50) + 20,
      fat: Math.floor(Math.random() * 20) + 5
    };

    const recipe: GeneratedRecipe = {
      name: recipeName,
      cuisine,
      cooking_time: cookingTime,
      difficulty_level: difficultyLevel,
      instructions,
      ingredients: recipeIngredients,
      nutritional_info: nutritionalInfo
    };

    return NextResponse.json(recipe);
  } catch (error) {
    console.error('Error generating recipe:', error);
    return NextResponse.json(
      { error: 'Failed to generate recipe' },
      { status: 500 }
    );
  }
} 