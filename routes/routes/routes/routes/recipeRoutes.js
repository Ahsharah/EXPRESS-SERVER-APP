// Getting what I need for recipe routes
const express = require('express');
const router = express.Router();
const RecipeModel = require('../models/recipes');

// Show all recipes (with optional filtering)
router.get('/', (req, res) => {
    try {
        let recipes;
        // If they want to filter by difficulty
        if (req.query.difficulty) {
            recipes = RecipeModel.getRecipesByDifficulty(req.query.difficulty);
        } else {
            recipes = RecipeModel.getAllRecipes();
        }
        res.render('recipes/index', { recipes });
    } catch (err) {
        res.render('error', {
            message: "Had trouble getting the recipes!",
            error: { status: 500 }
        });
    }
});

// Form to add a new recipe
router.get('/new', (req, res) => {
    res.render('recipes/new');
});

// Show a single recipe
router.get('/:id', (req, res) => {
    try {
        const recipe = RecipeModel.getRecipeById(req.params.id);
        if (recipe) {
            res.render('recipes/show', { recipe });
        } else {
            res.render('error', {
                message: "Can't find that recipe!",
                error: { status: 404 }
            });
        }
    } catch (err) {
        res.render('error', { 
            message: "Something went wrong!",
            error: { status: 500 }
        });
    }
});

// Add a new recipe
router.post('/', (req, res) => {
    try {
        const newRecipe = RecipeModel.createRecipe(req.body);
        res.redirect(`/recipes/${newRecipe.id}`);
    } catch (err) {
        res.render('error', {
            message: "Couldn't add your recipe!",
            error: { status: 500 }
        });
    }
});

// Form to edit a recipe
router.get('/:id/edit', (req, res) => {
    try {
        const recipe = RecipeModel.getRecipeById(req.params.id);
        if (recipe) {
            res.render('recipes/edit', { recipe });
        } else {
            res.render('error', {
                message: "Can't find that recipe to edit!",
                error: { status: 404 }
            });
        }
    } catch (err) {
        res.render('error', {
            message: "Something went wrong!",
            error: { status: 500 }
        });
    }
});

// Update a recipe
router.put('/:id', (req, res) => {
    try {
        const updated = RecipeModel.updateRecipe(req.params.id, req.body);
        if (updated) {
            res.redirect(`/recipes/${updated.id}`);
        } else {
            res.render('error', {
                message: "Can't find that recipe to update!",
                error: { status: 404 }
            });
        }
    } catch (err) {
        res.render('error', {
            message: "Couldn't update the recipe!",
            error: { status: 500 }
        });
    }
});

// Delete a recipe
router.delete('/:id', (req, res) => {
    try {
        const deleted = RecipeModel.deleteRecipe(req.params.id);
        if (deleted) {
            res.redirect('/recipes');
        } else {
            res.render('error', {
                message: "Can't find that recipe to delete!",
                error: { status: 404 }
            });
        }
    } catch (err) {
        res.render('error', {
            message: "Couldn't delete the recipe!",
            error: { status: 500 }
        });
    }
});

module.exports = router;