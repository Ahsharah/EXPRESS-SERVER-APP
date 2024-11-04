// Setting up my user routes
const express = require('express');
const router = express.Router();

// My temporary user data
let users = [
    {
        id: 1,
        username: "alexandria",
        email: "alex@example.com"
    }
];

// Show all users
router.get('/', (req, res) => {
    res.json(users);
});

// Get single user
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

module.exports = router;