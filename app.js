// Getting my tools ready
const express = require('express');
const path = require('path');
const app = express();

// My port setup
const PORT = process.env.PORT || 3000;

// Setting up my middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Setting up EJS for my views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// My home page route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Welcome to My Recipe App!',
        message: 'Check out my collection of awesome recipes!'
    });
});

// I'll add these routes later when I'm ready
// const userRoutes = require('./routes/userRoutes');
// const recipeRoutes = require('./routes/recipeRoutes');
// const reviewRoutes = require('./routes/reviewRoutes');

// app.use('/users', userRoutes);
// app.use('/recipes', recipeRoutes);
// app.use('/reviews', reviewRoutes);

// Handling 404s
app.use((req, res) => {
    res.status(404).render('error', {
        message: "Oops! Can't find that page!",
        error: { status: 404 }
    });
});

// Starting my server
app.listen(PORT, () => {
    console.log(`Awesome! My server is up on port ${PORT}`);
});

module.exports = app;