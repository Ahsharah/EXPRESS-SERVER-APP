// Here's where I handle my user-related routes
const express = require('express');
const router = express.Router();
const UserModel = require('../models/users');
// Getting info for just one user
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "Couldn't find that user!" });
    }
});

// Adding a new user to my list
router.post('/', (req, res) => {
    const newUser = {
        id: users.length + 1,
        username: req.body.username,
        email: req.body.email,
        favorites: req.body.favorites || []
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

