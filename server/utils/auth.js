// ----------------------------------------------------------------
// Dependencies.

const jwt = require('jsonwebtoken');

// JWT Configuration.
const secret = 'THIS_IS_THE-BEST_SECRET-EVER->2023';
const expiration = '2h';

// Exports the whole auth function.
module.exports = {
    // Function for the routes that needs authentification.
    authMiddleware: function ({ req }) {
        // Allows token to be sent via req.query or headers.authorization.
        let token = req.body.token || req.query.token || req.headers.authorization;

        // ['Bearer , '<TOKEN>' ].
        if (req.headers.authorization) { token = token.split(' ').pop().trim() };

        // If no token just return the req/nothing.
        if (!token) { return req };

        // Verify token and get the user data out of the token.
        try {
            // Extracts the user information from the token.
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            // Assigns the user data to the request.user to be identifyed.
            req.user = data;
        } catch (err) {
            console.log('Invalid Token!');
        };

        // Return the updated token in the request.
        return req;
    },
    // Signs the token when user created/logged in.
    signToken: function ({ username, email, _id }) {
        // Assigns the parameters to the payload.
        const payload = { username, email, _id };

        // Returns the signed token.
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};