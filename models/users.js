// Storing user info/data temporarily (normally this would be a database)
let users = [
    {
        id: 1,
        username: "Alexandria",
        email: "alex@example.com",
        role: "admin"
    },
    {
        id: 2,
        username: "Jenn",
        email: "jenn@example.com",
        role: "user"
    }
];

// Functions for working with user info/data
const UserModel = {
    // Get all users
    getAllUsers: () => users,
    
    // Get one user by ID
    getUserById: (id) => users.find(user => user.id === parseInt(id)),
    
    // Add a new user
    createUser: (userData) => {
        const newUser = {
            id: users.length + 1,
            ...userData
        };
        users.push(newUser);
        return newUser;
    },
    // Delete a user
    deleteUser: (id) => {
        const index = users.findIndex(user => user.id === parseInt(id));
        if (index !== -1) {
            const deletedUser = users[index];
            users = users.filter(user => user.id !== parseInt(id));
            return deletedUser;
        }
        return null;
    }
};
module.exports = UserModel;