// Here's where I store my recipe data for now - later this could be a database
let recipes = [
    {
        id: 1,
        title: "My Favorite Pasta",
        ingredients: ["pasta", "tomatoes", "garlic", "basil"],
        instructions: "Boil pasta, make sauce with tomatoes and garlic, mix together!",
        difficulty: "easy",
        prepTime: 30,
        userId: 1
    },
    {
        id: 2,
        title: "Quick Breakfast Sandwich",
        ingredients: ["bread", "eggs", "cheese"],
        instructions: "Toast bread, fry egg, add cheese, enjoy!",
        difficulty: "easy",
        prepTime: 15,
        userId: 1
    }
];

// Functions for working with my recipe data
const RecipeModel = {
    // Get all my recipes
    getAllRecipes: () => recipes,
    
    // Find a specific recipe
    getRecipeById: (id) => recipes.find(r => r.id === parseInt(id)),
    
    // Get recipes by difficulty level
    getRecipesByDifficulty: (difficulty) => {
        return recipes.filter(r => r.difficulty === difficulty);
    },
    
    // Add a new recipe
    createRecipe: (recipeData) => {
        const newRecipe = {
            id: recipes.length + 1,
            ...recipeData,
            created: new Date()
        };
        recipes.push(newRecipe);
        return newRecipe;
    },
    
    // Update a recipe
    updateRecipe: (id, updates) => {
        const index = recipes.findIndex(r => r.id === parseInt(id));
        if (index !== -1) {
            recipes[index] = { ...recipes[index], ...updates };
            return recipes[index];
        }
        return null;
    },
    
    // Delete a recipe
    deleteRecipe: (id) => {
        const index = recipes.findIndex(r => r.id === parseInt(id));
        if (index !== -1) {
            const deleted = recipes[index];
            recipes = recipes.filter(r => r.id !== parseInt(id));
            return deleted;
        }
        return null;
    }
};

module.exports = RecipeModel;