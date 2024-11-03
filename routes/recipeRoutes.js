// Get the tools we need
const express = require('express');
const router = express.Router();
const RecipeModel = require('../models/recipes');
// GET all recipes (with optional filtering)
router.get('/', (req, res) => {
    let recipes = RecipeModel.getAllRecipes();
    
    // If we have a difficulty query parameter, filter it by..
    if (req.query.difficulty) {
        recipes = recipes.filter(recipe => 
            recipe.difficulty === req.query.difficulty
        );
    }

    // Sends me back either: the webpage or JSON based on what was requested
    res.format({
        'text/html': () => {
            res.render('recipes/index', { recipes });
        },
        'application/json': () => {
            res.json(recipes);
        }
    });
});