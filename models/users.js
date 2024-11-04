// Keeping track of users who share recipes
let users = [
    {
        id: 1,
        username: "alexandria",
        email: "alexandria@example.com",
        favoriteRecipes: [1, 2]
    },
    {
        id: 2,
        username: "cookingfriend",
        email: "friend@example.com",
        favoriteRecipes: [1]
    }
];

// Functions for managing my user data
const UserModel = {
    // Get all users
    getAllUsers: () => users,
    
    // Find a specific user
    getUserById: (id) => users.find(u => u.id === parseInt(id)),
    
    // Add a new user
    createUser: (userData) => {
        const newUser = {
            id: users.length + 1,
            ...userData,
            favoriteRecipes: [],
            joinedDate: new Date()
        };
        users.push(newUser);
        return newUser;
    },
    
    // Update user info
    updateUser: (id, updates) => {
        const index = users.findIndex(u => u.id === parseInt(id));
        if (index !== -1) {
            users[index] = { ...users[index], ...updates };
            return users[index];
        }
        return null;
    },
    
    // Remove a user
    deleteUser: (id) => {
        const index = users.findIndex(u => u.id === parseInt(id));
        if (index !== -1) {
            const deleted = users[index];
            users = users.filter(u => u.id !== parseInt(id));
            return deleted;
        }
        return null;
    }
};

module.exports = UserModel;