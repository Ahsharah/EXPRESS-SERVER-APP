// Getting everything I need for my server
const express = require('express');
const path = require('path');
const app = express();

// Getting my custom middleware
const requestLogger = require('./middleware/requestLogger');
const requestValidator = require('./middleware/requestValidator');

// Getting all my routes
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Setting up my port - using 3000 if no environment port is specified
const PORT = process.env.PORT || 3000;

// Basic middleware setup
app.use(express.json());  // This lets me handle JSON data
app.use(express.urlencoded({ extended: true }));  // This helps with form data
app.use(express.static(path.join(__dirname, 'public')));  // This serves my static files

// Using my custom middleware
app.use(requestLogger);  // Logs all requests
app.use('/recipes', requestValidator);  // Validates recipe data

// Setting up my view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// My home page route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'My Recipe Collection',
        message: 'Welcome to my recipe app!'
    });
});

// Setting up my main routes
app.use('/recipes', recipeRoutes);
app.use('/users', userRoutes);
app.use('/reviews', reviewRoutes);

// Handling 404 errors - when someone tries to access a page that doesn't exist
app.use((req, res) => {
    res.status(404).render('error', {
        message: "Oops! Can't find that page!",
        error: { status: 404 }
    });
});

// Handling other errors that might pop up
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).render('error', {
        message: err.message || "Something went wrong!",
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

// Starting up my server
app.listen(PORT, () => {
    console.log(`Awesome! My recipe server is running on port ${PORT}`);
});

module.exports = app;