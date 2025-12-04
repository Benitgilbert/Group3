const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // 1. GET THE TOKEN
        // It comes in the header like: "Authorization: Bearer <token>"
        const token = req.headers.authorization.split(' ')[1];

        // 2. VERIFY THE TOKEN
        // We check if it was signed with our secret key.
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // 3. ATTACH USER ID TO REQUEST
        // We extract the userId from the token and stick it onto the request object.
        // Now, every controller after this will know EXACTLY who is logged in.
        req.userData = { userId: decodedToken.userId };

        // 4. CONTINUE
        // "next()" tells Express to move to the next step (the Controller).
        next(); 

    } catch (error) {
        // If anything fails (no token, fake token, expired token), block them.
        res.status(401).json({ message: 'Auth failed! You need to be logged in.' });
    }
};