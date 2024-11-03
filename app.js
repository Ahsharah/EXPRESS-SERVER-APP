//The main server file where everything comes together

// First, let's get all the tools need.
const express = require('express');
const path = require('path');
const app = express();

// Set up our: view engine (lets use EJS templates)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// This handle JSON info easily
app.use(express.json());
// This helps handle form submissions
app.use(express.urlencoded({ extended: true }));
// This allows serve static files like CSS from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Here's home page route
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Welcome!',
        message: 'Thanks for visiting my Express app'
    });
});

// If something goes wrong, error handling here
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {
        message: 'Oops! Something went wrong.',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

// Catches any undefined routes
app.use((req, res) => {
    res.status(404).render('error', {
        message: 'Page not found!',
        error: { status: 404 }
    });
});

// Start up server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is ready and listening on port ${PORT}`);
});