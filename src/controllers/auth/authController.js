const User = require('../../model/User');

exports.signup = async (req, res) => {

    // checking if the user already in the database
    const emailExist =  await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).send("email already exist");


    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    }); 

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }
};
