// This is a simple way to check if someone's allowed to do certain things
const authChecker = (req, res, next) => {
    // For now, I'm just checking if there's a user ID in the query
    // In a real app, this would check sessions or JWT tokens
    if (req.query.userId) {
        next();
    } else {
        res.status(401).render('error', {
            message: "Hold on! You need to be logged in to do that!",
            error: { 
                status: 401,
                details: "Authentication required"
            }
        });
    }
};

module.exports = authChecker;