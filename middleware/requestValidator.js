// Making sure my recipe data is valid
const requestValidator = (req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT') {
        if (!req.body.title || !req.body.ingredients) {
            return res.status(400).json({
                message: "Need both title and ingredients!"
            });
        }
    }
    next();
};

module.exports = requestValidator;