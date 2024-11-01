//The main server file where everything comes together

// First, let's get all the tools need.
const express = require('express');
const path = require('path');
const app = express();

// Set up our view engine (lets us use EJS templates)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));