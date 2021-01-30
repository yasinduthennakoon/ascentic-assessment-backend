/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const createError = require('../../helpers/error_response');
const User = require('../../model/User');
const { signAccessToken } = require('../../helpers/jwt_token');
const { signupSchema, signinSchema } = require('../../helpers/validation_schema');

exports.signup = async (req, res) => {
    try {
        // validating request body
        const validateBody = await signupSchema.validateAsync(req.body);

        // checking if the user already in the database
        const emailExist = await User.findOne({ email: validateBody.email });
        if (emailExist) return res.status(409).send(createError('Email already exists'));

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(validateBody.password, salt);

        const user = new User({
            firstName: validateBody.firstName,
            lastName: validateBody.lastName,
            email: validateBody.email,
            password: hashPassword,
        });

        await user.save();
        const accessToken = await signAccessToken(user._id);

        return res.send({
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            signAccessToken: accessToken,
        });
    } catch (error) {
        if (error.isJoi === true) return res.status(400).send(createError('Invalid request body'));
        return res.status(500).send(createError('Internal server error'));
    }
};

exports.signin = async (req, res) => {
    try {
        // validating request body
        const validateBody = await signinSchema.validateAsync(req.body);

        // checking if the email exist
        const user = await User.findOne({ email: validateBody.email });
        if (!user) return res.status(404).send(createError('User not found'));

        // compare password
        const validPassword = await bcrypt.compare(validateBody.password, user.password);
        if (!validPassword) return res.status(401).send(createError('Invalid password'));

        const accessToken = await signAccessToken(user._id);
        return res.status(200).send({
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            signAccessToken: accessToken,
        });
    } catch (error) {
        if (error.isJoi === true) return res.status(400).send(createError('Invalid request body'));
        return res.status(500).send(createError('Internal server error'));
    }
};
