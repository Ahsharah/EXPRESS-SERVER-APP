// Setting up review routes
const express = require('express');
const router = express.Router();
const ReviewModel = require('../models/reviews');

// Get all reviews for a recipe
router.get('/recipe/:recipeId', (req, res) => {
    try {
        const reviews = ReviewModel.getReviewsByRecipe(req.params.recipeId);
        res.render('reviews/index', { reviews });
    } catch (err) {
        res.render('error', {
            message: "Had trouble getting the reviews!",
            error: { status: 500 }
        });
    }
});

// Add a new review
router.post('/', (req, res) => {
    try {
        const newReview = ReviewModel.createReview(req.body);
        res.redirect(`/recipes/${newReview.recipeId}`);
    } catch (err) {
        res.render('error', {
            message: "Couldn't add your review!",
            error: { status: 500 }
        });
    }
});

// Update a review
router.put('/:id', (req, res) => {
    try {
        const updated = ReviewModel.updateReview(req.params.id, req.body);
        if (updated) {
            res.redirect(`/recipes/${updated.recipeId}`);
        } else {
            res.render('error', {
                message: "Can't find that review to update!",
                error: { status: 404 }
            });
        }
    } catch (err) {
        res.render('error', {
            message: "Couldn't update the review!",
            error: { status: 500 }
        });
    }
});

// Delete a review
router.delete('/:id', (req, res) => {
    try {
        const review = ReviewModel.getReviewById(req.params.id);
        const deleted = ReviewModel.deleteReview(req.params.id);
        if (deleted) {
            res.redirect(`/recipes/${review.recipeId}`);
        } else {
            res.render('error', {
                message: "Can't find that review to delete!",
                error: { status: 404 }
            });
        }
    } catch (err) {
        res.render('error', {
            message: "Couldn't delete the review!",
            error: { status: 500 }
        });
    }
});

module.exports = router;