/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const createError = require('./error_response');

module.exports = {
    signAccessToken: (userId) =>
        new Promise((resolve, reject) => {
            const payload = {
                userId,
            };
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const option = {
                expiresIn: '6h',
            };
            jwt.sign(payload, secret, option, (err, token) => {
                if (err) reject(err);
                resolve(token);
            });
        }),

    verifyAccessToken: (req, res, next) => {
        if (!req.headers.authorization) return res.status(400).send(createError('Bad request'));

        const token = req.headers.authorization;

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                return res.status(401).send(createError('Unauthorized'));
            }
            req.payload = payload;
            next();
        });
    },
};
