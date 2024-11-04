// This checks if my recipe submissions have all the info I need
const requestValidator = (req, res, next) => {
    // Only checking POST and PUT requests since those add/update recipes
    if (req.method === 'POST' || req.method === 'PUT') {
        const { title, ingredients, instructions } = req.body;
// Making sure I have all the required fields
if (!title || !ingredients || !instructions) {
    return res.status(400).render('error', {
        message: "Hey! I need a title, ingredients, and instructions for each recipe!",
        error: { 
            status: 400,
            details: "Missing required fields"
        }
    });
}
// Making sure the title isn't too long
if (title.length > 100) {
    return res.status(400).render('error', {
        message: "That title is a bit too long! Can you make it shorter?",
        error: { 
            status: 400,
            details: "Title too long"
        }
    });
}
}

next(); // Everything looks good, moving on!
};

module.exports = requestValidator;