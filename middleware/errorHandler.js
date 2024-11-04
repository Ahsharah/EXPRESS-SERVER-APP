// This handles any errors that pop up in my application
const errorHandler = (err, req, res, next) => {
    // First, log the error so I can see it
    console.error('Oops, something went wrong:', err);

    // Setting up my error details
    const status = err.status || 500;
    const message = process.env.NODE_ENV === 'development' 
        ? err.message 
        : "Something went wrong on my end!";

    // If it's an API request, send JSON
    if (req.xhr || req.headers.accept.includes('json')) {
        return res.status(status).json({
            error: message,
            status: status
        });
    }

    // Otherwise, show my error page
    res.status(status).render('error', {
        message: message,
        error: {
            status: status,
            stack: process.env.NODE_ENV === 'development' ? err.stack : ''
        }
    });
};

module.exports = errorHandler;