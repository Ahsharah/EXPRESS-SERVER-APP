// Here's how I handle errors in my application
const errorHandler = (err, req, res, next) => {
    // Log the error for my reference
    console.error(`Oops! Something went wrong: ${err.message}`);
    // I want to show different messages based on the type of error
    const status = err.status || 500;
    const message = status === 404 
        ? "I couldn't find what you're looking for!" 
        : "Something went wrong on my end!";