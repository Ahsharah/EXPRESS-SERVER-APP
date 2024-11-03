// Store the review data
let reviews = [
    {
        id: 1,
        recipeId: 1,
        userId: 2,
        rating: 5,
        comment: "Best pizza recipe ever!",
        date: new Date()
    },
    {
        id: 2,
        recipeId: 2,
        userId: 1,
        rating: 4,
        comment: "Simple and fresh salad.",
        date: new Date()
    }
];
const ReviewModel = {
    getAllReviews: () => reviews,
    
    // Get one review
    getReviewById: (id) => reviews.find(review => review.id === parseInt(id)),
    
    // Get all reviews for a recipe
    getReviewsByRecipe: (recipeId) => reviews.filter(review => review.recipeId === parseInt(recipeId)),
    
    // Get all reviews by a user
    getReviewsByUser: (userId) => reviews.filter(review => review.userId === parseInt(userId)),
    
    createReview: (reviewData) => {
        const newReview = {
            id: reviews.length + 1,
            ...reviewData,
            date: new Date()
        };
        reviews.push(newReview);
        return newReview;
    },
    updateReview: (id, data) => {
        const index = reviews.findIndex(review => review.id === parseInt(id));
        if (index !== -1) {
            reviews[index] = { ...reviews[index], ...data };
            return reviews[index];
        }
        return null;
    },