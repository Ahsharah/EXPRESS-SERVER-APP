// This helps me see what's happening with my requests
const requestLogger = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
};

module.exports = requestLogger;