const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const {sendVerificationEmail} = require("../services/verificationService");


exports.register = async (req, res) => {
    try {
        let { username, password, email } = req.body;
        console.log(req.body);
        console.log(username, password, email);
        //password encryption
        password = bcrypt.hashSync(password, 10);

        //verification code generation
        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        // Create user in the database
        const user = new User({
            username,
            password,
            mail: email,
            is_google: false,
            is_verified: false
        })

        User.create(user, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating new user."
                });
        })

        // Send verification code to the user's email
        await sendVerificationEmail(email, verificationCode);
        
        // Send user id and base32 key to user
        res.status(200).send({
            message: `You have Registered Successfully, Verification code sent to: ${email}`
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Error generating secret key'
        });
    }
}