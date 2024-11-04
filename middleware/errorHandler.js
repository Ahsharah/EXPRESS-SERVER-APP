// Here's how I handle errors in my application
const errorHandler = (err, req, res, next) => {
    // Log the error for my reference
    console.error(`Oops! Something went wrong: ${err.message}`);