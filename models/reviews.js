// Storing reviews for recipes
let reviews = [
    {
        id: 1,
        recipeId: 1,
        userId: 2,
        rating: 5,
        comment: "This pasta recipe is amazing!",
        date: new Date()
    },
    {
        id: 2,
        recipeId: 2,
        userId: 1,
        rating: 4,
        comment: "Great quick breakfast idea!",
        date: new Date()
    }
];

// Functions for working with my reviews
const ReviewModel = {
    // Get all reviews
    getAllReviews: () => reviews,
    
    // Get reviews for a specific recipe
    getReviewsByRecipe: (recipeId) => {
        return reviews.filter(r => r.recipeId === parseInt(recipeId));
    },
    
    // Get reviews by a specific user
    getReviewsByUser: (userId) => {
        return reviews.filter(r => r.userId === parseInt(userId));
    },
    
    // Add a new review
    createReview: (reviewData) => {
        const newReview = {
            id: reviews.length + 1,
            ...reviewData,
            date: new Date()
        };
        reviews.push(newReview);
        return newReview;
    },
    
    // Update a review
    updateReview: (id, updates) => {
        const index = reviews.findIndex(r => r.id === parseInt(id));
        if (index !== -1) {
            reviews[index] = { ...reviews[index], ...updates };
            return reviews[index];
        }
        return null;
    },
    
    // Delete a review
    deleteReview: (id) => {
        const index = reviews.findIndex(r => r.id === parseInt(id));
        if (index !== -1) {
            const deleted = reviews[index];
            reviews = reviews.filter(r => r.id !== parseInt(id));
            return deleted;
        }
        return null;
    }
};

module.exports = ReviewModel;