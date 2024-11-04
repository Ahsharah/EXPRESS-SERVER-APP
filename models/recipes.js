// This is where I store my recipe data for now
let recipes = [
    {
        id: 1,
        title: "My Favorite Pasta",
        ingredients: ["pasta", "tomatoes", "garlic", "basil"],
        instructions: "Cook pasta, make sauce, mix together",
        difficulty: "easy",
        timeInMinutes: 20,
        userId: 1,
        createdAt: new Date()
    },
    {
        id: 2,
        title: "Quick Breakfast Sandwich",
        ingredients: ["bread", "eggs", "cheese", "butter"],
        instructions: "Toast bread, fry egg, assemble sandwich",
        difficulty: "easy",
        timeInMinutes: 10,
        userId: 1,
        createdAt: new Date()
    }
];

// Here's how I manage my recipe data
const RecipeModel = {
    // Get all my recipes
    getAllRecipes: () => recipes,
    
    // Find a specific recipe
    getRecipeById: (id) => {
        return recipes.find(r => r.id === parseInt(id));
    },
    
    // Add a new recipe to my collection
    createRecipe: (data) => {
        const newRecipe = {
            id: recipes.length + 1,
            ...data,
            createdAt: new Date()
        };
        recipes.push(newRecipe);
        return newRecipe;
    },
    
    // Update one of my recipes
    updateRecipe: (id, data) => {
        const index = recipes.findIndex(r => r.id === parseInt(id));
        if (index !== -1) {
            recipes[index] = { ...recipes[index], ...data };
            return recipes[index];
        }
        return null;
    },
    
    // Remove a recipe
    deleteRecipe: (id) => {
        const index = recipes.findIndex(r => r.id === parseInt(id));
        if (index !== -1) {
            return recipes.splice(index, 1)[0];
        }
        return null;
    }
};

module.exports = RecipeModel;