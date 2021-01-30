/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const User = require('../../model/User');
const { signAccessToken } = require('../../helpers/jwt_token');

exports.signup = async (req, res) => {
    // checking if the user already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('email already exist');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword,
    });

    try {
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
        console.log(error);

        return res.status(400).send(error);
    }
};

exports.signin = async (req, res) => {
    // checking if the email exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('user not in the database');

    // compare password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid password');

    try {
        const accessToken = await signAccessToken(user._id);
        return res
            .status(200)
            .send({
                userId: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                signAccessToken: accessToken,
            });
    } catch (error) {
        return res.status(400).send('Internal Error');
    }
};
