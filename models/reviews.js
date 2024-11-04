// Storing reviews for my recipes
let reviews = [
    {
        id: 1,
        recipeId: 1,
        userId: 2,
        rating: 5,
        comment: "Love this pasta recipe!",
        createdAt: new Date()
    },
    {
        id: 2,
        recipeId: 2,
        userId: 1,
        rating: 4,
        comment: "Great quick breakfast.",
        createdAt: new Date()
    }
];

// Here's how I handle reviews
const ReviewModel = {
    // Get all reviews
    getAllReviews: () => reviews,
    
    // Get reviews for a specific recipe
    getReviewsByRecipe: (recipeId) => {
        return reviews.filter(r => r.recipeId === parseInt(recipeId));
    },
    
    // Add a new review
    createReview: (data) => {
        const newReview = {
            id: reviews.length + 1,
            ...data,
            createdAt: new Date()
        };
        reviews.push(newReview);
        return newReview;
    },
    
    // Update a review
    updateReview: (id, data) => {
        const index = reviews.findIndex(r => r.id === parseInt(id));
        if (index !== -1) {
            reviews[index] = { ...reviews[index], ...data };
            return reviews[index];
        }
        return null;
    },
    
    // Remove a review
    deleteReview: (id) => {
        const index = reviews.findIndex(r => r.id === parseInt(id));
        if (index !== -1) {
            return reviews.splice(index, 1)[0];
        }
        return null;
    }
};

module.exports = ReviewModel;