// Got my express tools ready
const express = require('express');
const router = express.Router();

// My temporary user info - I'll replace this with a database later
let users = [
    {
        id: 1,
        username: "Alexandria",
        email: "alex@example.com",
        favorites: ["cookies", "pasta"]
    }
];

// Here's how I show all users
router.get('/', (req, res) => {
    res.json(users);
});

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

// Updating user info
router.put('/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index !== -1) {
        users[index] = { ...users[index], ...req.body };
        res.json(users[index]);
    } else {
        res.status(404).json({ message: "Can't find that user to update!" });
    }
});

// Removing a user from my list
router.delete('/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index !== -1) {
        users = users.filter(u => u.id !== parseInt(req.params.id));
        res.json({ message: "User deleted!" });
    } else {
        res.status(404).json({ message: "Can't find that user to delete!" });
    }
});

module.exports = router;