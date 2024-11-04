// Setting up my review system
const express = require('express');
const router = express.Router();

// Keeping track of my recipe reviews
let reviews = [
    {
        id: 1,
        recipeId: 1,
        rating: 5,
        comment: "This pasta is amazing!",
        date: new Date()
    }
];
// Get reviews for a specific recipe
router.get('/recipe/:recipeId', (req, res) => {
    const recipeReviews = reviews.filter(r => 
        r.recipeId === parseInt(req.params.recipeId)
    );
    res.json(recipeReviews);
});
