// This checks if my recipe submissions have all the info I need
const requestValidator = (req, res, next) => {
    // Only checking POST and PUT requests since those add/update recipes
    if (req.method === 'POST' || req.method === 'PUT') {
        const { title, ingredients, instructions } = req.body;
