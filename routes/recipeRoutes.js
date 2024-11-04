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
// GET form to create new recipe(s)..
router.get('/new', (req, res) => {
    res.render('recipes/new');
});

// GET single recipe
router.get('/:id', (req, res) => {
    const recipe = RecipeModel.getRecipeById(req.params.id);
    if (recipe) {
        res.render('recipes/show', { recipe });
    } else {
        res.status(404).send('Recipe not found');
    }
});
// POST new recipe
router.post('/', (req, res) => {
    const newRecipe = RecipeModel.createRecipe(req.body);
    res.redirect(`/recipes/${newRecipe.id}`);
});
// PUT - update recipe
router.put('/:id', (req, res) => {
    const updated = RecipeModel.updateRecipe(req.params.id, req.body);
    if (updated) {
        res.redirect(`/recipes/${updated.id}`);
    } else {
        res.status(404).send('Recipe not found');
    }
});
// DELETE recipe
router.delete('/:id', (req, res) => {
    const deleted = RecipeModel.deleteRecipe(req.params.id);
    if (deleted) {
        res.redirect('/recipes');
    } else {
        res.status(404).send('Recipe not found');
    }
});

module.exports = router;