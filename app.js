// Getting everything I need for my server
const express = require('express');
const path = require('path');
const app = express();

// Bringing in my middleware
const requestLogger = require('./middleware/requestLogger');
const requestValidator = require('./middleware/requestValidator');

// Setting up for my routes
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const PORT = process.env.PORT || 3000;

// Basic middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Using my custom middleware
app.use(requestLogger);
app.use('/recipes', requestValidator);

// Setting up EJS for my views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// My home page route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Welcome to My Recipe Collection!',
        message: 'Check out my favorite recipes and share your own!'
    });
});

// Setting up my route handlers
app.use('/recipes', recipeRoutes);
app.use('/users', userRoutes);
app.use('/reviews', reviewRoutes);

// Handling 404s - when someone tries to find a page I don't have
app.use((req, res) => {
    res.status(404).render('error', {
        message: "Oops! I couldn't find that page!",
        error: { status: 404 }
    });
});

// Handling other errors that might pop up
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {
        message: "Something went wrong on my end!",
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

// Starting up my server
app.listen(PORT, () => {
    console.log(`Awesome! My server is running on port ${PORT}`);
});

module.exports = app;