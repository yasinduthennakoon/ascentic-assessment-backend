const Joi = require('joi');

const signupSchema = Joi.object({
    firstName: Joi.string().min(3).max(50).pattern(new RegExp('^[a-zA-Z]+$')).required(),
    lastName: Joi.string().min(3).max(50).pattern(new RegExp('^[a-zA-Z]+$')).required(),
    email: Joi.string().email().min(6).required(),
    password: Joi.string()
        .min(6)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'))
        .required(),
});

const signinSchema = Joi.object({
    email: Joi.string().email().min(6).required(),
    password: Joi.string()
        .min(6)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'))
        .required(),
});

module.exports = {
    signupSchema,
    signinSchema,
};
