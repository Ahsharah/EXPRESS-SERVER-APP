// Setting up user routes
const express = require('express');
const router = express.Router();
const UserModel = require('../models/users');

// Show all users
router.get('/', (req, res) => {
    try {
        const users = UserModel.getAllUsers();
        res.render('users/index', { users });
    } catch (err) {
        res.render('error', {
            message: "Had trouble getting the users!",
            error: { status: 500 }
        });
    }
});

// Get a single user
router.get('/:id', (req, res) => {
    try {
        const user = UserModel.getUserById(req.params.id);
        if (user) {
            res.render('users/show', { user });
        } else {
            res.render('error', {
                message: "Can't find that user!",
                error: { status: 404 }
            });
        }
    } catch (err) {
        res.render('error', {
            message: "Something went wrong!",
            error: { status: 500 }
        });
    }
});

// Create new user
router.post('/', (req, res) => {
    try {
        const newUser = UserModel.createUser(req.body);
        res.redirect(`/users/${newUser.id}`);
    } catch (err) {
        res.render('error', {
            message: "Couldn't create user!",
            error: { status: 500 }
        });
    }
});

// Update user
router.put('/:id', (req, res) => {
    try {
        const updated = UserModel.updateUser(req.params.id, req.body);
        if (updated) {
            res.redirect(`/users/${updated.id}`);
        } else {
            res.render('error', {
                message: "Can't find that user to update!",
                error: { status: 404 }
            });
        }
    } catch (err) {
        res.render('error', {
            message: "Couldn't update the user!",
            error: { status: 500 }
        });
    }
});

// Delete user
router.delete('/:id', (req, res) => {
    try {
        const deleted = UserModel.deleteUser(req.params.id);
        if (deleted) {
            res.redirect('/users');
        } else {
            res.render('error', {
                message: "Can't find that user to delete!",
                error: { status: 404 }
            });
        }
    } catch (err) {
        res.render('error', {
            message: "Couldn't delete the user!",
            error: { status: 500 }
        });
    }
});

module.exports = router;