// Here's where I manage all my recipe-related routes
const express = require('express');
const router = express.Router();
const RecipeModel = require('../models/recipes');

// Get all my recipes with optional filtering
router.get('/', (req, res) => {
    let recipes = RecipeModel.getAllRecipes();
    
    // I want to be able to filter recipes by difficulty
    if (req.query.difficulty) {
        recipes = recipes.filter(recipe => 
            recipe.difficulty.toLowerCase() === req.query.difficulty.toLowerCase()
        );
    }

    res.render('recipes/index', { recipes });
});

// Form for adding a new recipe
router.get('/new', (req, res) => {
    res.render('recipes/new');
});

// Looking at a single recipe
router.get('/:id', (req, res) => {
    const recipe = RecipeModel.getRecipeById(req.params.id);
    if (recipe) {
        res.render('recipes/show', { recipe });
    } else {
        res.status(404).render('error', { 
            message: "I couldn't find that recipe!",
            error: { status: 404 }
        });
    }
});

// Adding a new recipe to my collection
router.post('/', (req, res) => {
    const newRecipe = RecipeModel.createRecipe(req.body);
    res.redirect(`/recipes/${newRecipe.id}`);
});

// Form for editing a recipe
router.get('/:id/edit', (req, res) => {
    const recipe = RecipeModel.getRecipeById(req.params.id);
    if (recipe) {
        res.render('recipes/edit', { recipe });
    } else {
        res.status(404).render('error', { 
            message: "Can't edit a recipe that doesn't exist!",
            error: { status: 404 }
        });
    }
});

// Updating a recipe
router.put('/:id', (req, res) => {
    const updated = RecipeModel.updateRecipe(req.params.id, req.body);
    if (updated) {
        res.redirect(`/recipes/${updated.id}`);
    } else {
        res.status(404).render('error', { 
            message: "Couldn't update that recipe!",
            error: { status: 404 }
        });
    }
});

// Removing a recipe
router.delete('/:id', (req, res) => {
    const deleted = RecipeModel.deleteRecipe(req.params.id);
    if (deleted) {
        res.redirect('/recipes');
    } else {
        res.status(404).render('error', { 
            message: "Couldn't delete that recipe!",
            error: { status: 404 }
        });
    }
});

module.exports = router;