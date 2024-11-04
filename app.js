// First, I'm getting all the tools I need for my server
const express = require('express');
const path = require('path');
const app = express();

// Setting up my port - I like to keep it flexible
const PORT = process.env.PORT || 3000;

// This is where I tell Express how I want to handle different types of data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// I want my CSS and images in the public folder
app.use(express.static(path.join(__dirname, 'public')));

// I'm using EJS for my views because it makes HTML way easier
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Here's my simple logger to see what's happening
app.use((req, res, next) => {
    console.log(`${new Date().toLocaleString()}: ${req.method} ${req.url}`);
    next();
});

// Getting my route files - keeping things organized!
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// My homepage - keeping it welcoming
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Welcome to My Express App!',
        message: 'Here you can explore recipes, leave reviews, and more!'
    });
});

// Setting up my different routes
app.use('/recipes', recipeRoutes);
app.use('/users', userRoutes);
app.use('/reviews', reviewRoutes);

// If someone goes to a page that doesn't exist
app.use((req, res, next) => {
    res.status(404).render('error', {
        message: "Oops! I couldn't find that page.",
        error: { status: 404 }
    });
});

// If something goes wrong, I want to handle it nicely
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {
        message: "Something went wrong on my end!",
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

// Start up my server!
app.listen(PORT, () => {
    console.log(`My server is up and running on port ${PORT}!`);
});

module.exports = app;