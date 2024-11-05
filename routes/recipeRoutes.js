// Here's where I handle my recipe-related routes
const express = require('express');
const router = express.Router();
const RecipeModel = require('../models/recipes');  // Import the model

// Get all recipes
router.get('/', (req, res) => {
    const recipes = RecipeModel.getAllRecipes();  // Use the model method
    res.render('recipes/index', { recipes });
});

// Show form for new recipe
router.get('/new', (req, res) => {
    res.render('recipes/new');
});

// Get single recipe
router.get('/:id', (req, res) => {
    const recipe = RecipeModel.getRecipeById(req.params.id);
    if (recipe) {
        res.render('recipes/show', { recipe });
    } else {
        res.status(404).render('error', {
            message: "Recipe not found",
            error: { status: 404 }
        });
    }
});

// Create new recipe
router.post('/', (req, res) => {
    const newRecipe = RecipeModel.createRecipe(req.body);
    res.redirect(`/recipes/${newRecipe.id}`);
});

// Delete recipe
router.delete('/:id', (req, res) => {
    const deleted = RecipeModel.deleteRecipe(req.params.id);
    if (deleted) {
        res.redirect('/recipes');
    } else {
        res.status(404).render('error', {
            message: "Couldn't delete that recipe",
            error: { status: 404 }
        });
    }
});

module.exports = router;