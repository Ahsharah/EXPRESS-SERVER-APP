// Setting up my recipe routes
const express = require('express');
const router = express.Router();

// My recipe data (would usually be in a database)
let recipes = [
    {
        id: 1,
        title: "My Favorite Pasta",
        ingredients: ["pasta", "sauce", "cheese"],
        instructions: "Boil pasta, add sauce and cheese",
        difficulty: "easy"
    },
    {
        id: 2,
        title: "Simple Salad",
        ingredients: ["lettuce", "tomatoes", "cucumber"],
        instructions: "Chop everything and mix",
        difficulty: "easy"
    }
];

// Show all recipes
router.get('/', (req, res) => {
    // If they want to filter by difficulty
    if (req.query.difficulty) {
        const filtered = recipes.filter(recipe => 
            recipe.difficulty === req.query.difficulty
        );
        res.json(filtered);
    } else {
        res.json(recipes);
    }
});

// Get a single recipe
router.get('/:id', (req, res) => {
    const recipe = recipes.find(r => r.id === parseInt(req.params.id));
    if (recipe) {
        res.json(recipe);
    } else {
        res.status(404).json({ message: "Recipe not found!" });
    }
});

// Add a new recipe
router.post('/', (req, res) => {
    const newRecipe = {
        id: recipes.length + 1,
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        difficulty: req.body.difficulty || 'medium'
    };
    recipes.push(newRecipe);
    res.status(201).json(newRecipe);
});

// Update a recipe
router.put('/:id', (req, res) => {
    const index = recipes.findIndex(r => r.id === parseInt(req.params.id));
    if (index !== -1) {
        recipes[index] = { 
            ...recipes[index], 
            ...req.body,
            id: recipes[index].id // Make sure ID doesn't change
        };
        res.json(recipes[index]);
    } else {
        res.status(404).json({ message: "Recipe not found!" });
    }
});

// Delete a recipe
router.delete('/:id', (req, res) => {
    const index = recipes.findIndex(r => r.id === parseInt(req.params.id));
    if (index !== -1) {
        recipes = recipes.filter(r => r.id !== parseInt(req.params.id));
        res.json({ message: "Recipe deleted!" });
    } else {
        res.status(404).json({ message: "Recipe not found!" });
    }
});

module.exports = router;