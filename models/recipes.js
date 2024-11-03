// Recipe info. storage
let recipes = [
    {
        id: 1,
        title: "Homemade Pizza",
        userId: 1,
        ingredients: ["dough", "tomato sauce", "cheese"],
        instructions: "1. Preheat oven\n2. Roll dough\n3. Add toppings\n4. Bake",
        difficulty: "medium",
        timeInMinutes: 45
    },
    {
        id: 2,
        title: "Simple Salad",
        userId: 2,
        ingredients: ["lettuce", "tomatoes", "cucumber", "dressing"],
        instructions: "1. Wash vegetables\n2. Chop everything\n3. Mix together",
        difficulty: "easy",
        timeInMinutes: 10
    }
];
const RecipeModel = {
    getAllRecipes: () => recipes,
    
    getRecipeById: (id) => recipes.find(recipe => recipe.id === parseInt(id)),
    
    // Get recipes by user ID
    getRecipesByUser: (userId) => recipes.filter(recipe => recipe.userId === parseInt(userId)),
    
    createRecipe: (recipeData) => {
        const newRecipe = {
            id: recipes.length + 1,
            ...recipeData,
            created: new Date()
        };
        recipes.push(newRecipe);
        return newRecipe;
    },
    updateRecipe: (id, data) => {
        const index = recipes.findIndex(recipe => recipe.id === parseInt(id));
        if (index !== -1) {
            recipes[index] = { ...recipes[index], ...data };
            return recipes[index];
        }
        return null;
    },
    
    deleteRecipe: (id) => {
        const index = recipes.findIndex(recipe => recipe.id === parseInt(id));
        if (index !== -1) {
            const deletedRecipe = recipes[index];
            recipes = recipes.filter(recipe => recipe.id !== parseInt(id));
            return deletedRecipe;
        }
        return null;
    }
};

module.exports = RecipeModel;