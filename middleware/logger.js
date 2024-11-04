// This is my logger - it helps me see what's happening on my server
const requestLogger = (req, res, next) => {
    // Getting the current time for my log
    const timestamp = new Date().toLocaleString();
    
    // I like to see the method (GET, POST, etc) and which URL was requested
    console.log(`[${timestamp}] ${req.method}: ${req.url}`);
    
    // If there's query parameters, I want to see those too
    if (Object.keys(req.query).length > 0) {
        console.log('Query Parameters:', req.query);
    }
    
    // If there's body data (like in POST requests), log that as well
    if (req.body && Object.keys(req.body).length > 0) {
        console.log('Request Body:', req.body);
    }

    next(); // Moving on to the next piece of middleware
};

module.exports = requestLogger;