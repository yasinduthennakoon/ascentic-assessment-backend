const jwt = require('jsonwebtoken');

module.exports = {
    signAccessToken: (userId) =>
        new Promise((resolve, reject) => {
            const payload = {
                userId
            };
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const option = {
                expiresIn: '1h',
            };
            jwt.sign(payload, secret, option, (err, token) => {
                if (err) reject(err);
                resolve(token);
            });
        }),
};
