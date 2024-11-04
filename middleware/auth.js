// This helps me check if users are logged in
const checkAuth = (req, res, next) => {
    // keep simple
    if (req.headers.authorization) {
        next();
    } else {
        res.status(401).render('error', {
            message: "You need to log in first!",
            error: { status: 401 }
        });
    }
};

module.exports = checkAuth;