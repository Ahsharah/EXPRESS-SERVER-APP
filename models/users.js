// Keeping track of my users
let users = [
    {
        id: 1,
        username: "alexandria",
        email: "alexandria@example.com",
        role: "admin",
        joinedAt: new Date()
    },
    {
        id: 2,
        username: "cookingfriend",
        email: "friend@example.com",
        role: "user",
        joinedAt: new Date()
    }
];

// Here's how I manage my user data
const UserModel = {
    // Get everyone
    getAllUsers: () => users,
    
    // Find someone specific
    getUserById: (id) => {
        return users.find(u => u.id === parseInt(id));
    },
    
    // Add a new user
    createUser: (data) => {
        const newUser = {
            id: users.length + 1,
            ...data,
            joinedAt: new Date()
        };
        users.push(newUser);
        return newUser;
    },
    
    // Update user info
    updateUser: (id, data) => {
        const index = users.findIndex(u => u.id === parseInt(id));
        if (index !== -1) {
            users[index] = { ...users[index], ...data };
            return users[index];
        }
        return null;
    },
    
    // Remove a user
    deleteUser: (id) => {
        const index = users.findIndex(u => u.id === parseInt(id));
        if (index !== -1) {
            return users.splice(index, 1)[0];
        }
        return null;
    }
};

module.exports = UserModel;