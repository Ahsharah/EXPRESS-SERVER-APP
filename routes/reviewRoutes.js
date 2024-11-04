// Setting up my review routes
const express = require('express');
const router = express.Router();

// My review data (would be in a database normally)
let reviews = [
    {
        id: 1,
        recipeId: 1,
        userId: 1,
        rating: 5,
        comment: "Love this pasta recipe!",
        date: new Date()
    },
    {
        id: 2,
        recipeId: 2,
        userId: 1,
        rating: 4,
        comment: "Nice easy salad",
        date: new Date()
    }
];

// Get all reviews
router.get('/', (req, res) => {
    // Filter by recipe if they want
    if (req.query.recipeId) {
        const filtered = reviews.filter(review => 
            review.recipeId === parseInt(req.query.recipeId)
        );
        res.json(filtered);
    } else {
        res.json(reviews);
    }
});

// Get reviews for a specific recipe
router.get('/recipe/:recipeId', (req, res) => {
    const recipeReviews = reviews.filter(review => 
        review.recipeId === parseInt(req.params.recipeId)
    );
    res.json(recipeReviews);
});

// Add a new review
router.post('/', (req, res) => {
    const newReview = {
        id: reviews.length + 1,
        recipeId: parseInt(req.body.recipeId),
        userId: parseInt(req.body.userId),
        rating: parseInt(req.body.rating),
        comment: req.body.comment,
        date: new Date()
    };
    reviews.push(newReview);
    res.status(201).json(newReview);
});

// Update a review
router.put('/:id', (req, res) => {
    const index = reviews.findIndex(r => r.id === parseInt(req.params.id));
    if (index !== -1) {
        reviews[index] = {
            ...reviews[index],
            ...req.body,
            id: reviews[index].id // Keep the original ID
        };
        res.json(reviews[index]);
    } else {
        res.status(404).json({ message: "Review not found!" });
    }
});

// Delete a review
router.delete('/:id', (req, res) => {
    const index = reviews.findIndex(r => r.id === parseInt(req.params.id));
    if (index !== -1) {
        reviews = reviews.filter(r => r.id !== parseInt(req.params.id));
        res.json({ message: "Review deleted!" });
    } else {
        res.status(404).json({ message: "Review not found!" });
    }
});

module.exports = router;