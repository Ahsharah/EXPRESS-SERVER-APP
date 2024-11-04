// Getting my required stuff for the server
const express = require('express');
const path = require('path');
const app = express();

// Setting up my port - I like 3000 but this makes it flexible
const PORT = process.env.PORT || 3000;

// My middleware setup - these help handle different kinds of data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Setting up EJS - this makes my views work
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// My home page route - keeping it simple for now
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Welcome!',
        message: 'Hey! Welcome to my Express app!'
    });
});

// I'll add my other routes here once I create them
// const userRoutes = require('./routes/userRoutes');
// const reviewRoutes = require('./routes/reviewRoutes');

// And I'll use them here
// app.use('/users', userRoutes);
// app.use('/reviews', reviewRoutes);

// This handles pages that don't exist
app.use((req, res, next) => {
    res.status(404).render('error', {
        message: "Oops! I couldn't find that page!",
        error: { status: 404 }
    });
});

// Starting up my server!
app.listen(PORT, () => {
    console.log(`Awesome! My server is up on port ${PORT}`);
});

module.exports = app;