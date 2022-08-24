const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const Code = require("../models/code.model")
const {sendVerificationEmail} = require("../services/verificationService");


exports.register = async (req, res) => {
    try {
        let { username, password, email } = req.body;
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

        const code = new Code({
            mail : email,
            verification_code: verificationCode
        })
        Code.create(code, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while generating verification code"
                })
            }
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

exports.verifyAccount = async (req, res) => {
    try {
        let {email, code} = req.body;
        Code.findByMail(email, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Verification code is not generated for ${email}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error while getting activation code"
                    });
                }
            } else {
                if (data.verification_code == code) {
                    User.activateByMail(email, (err, data) => {
                        if (err) {
                            res.status(500).send({
                                message: "Can't verify the account"
                            });
                        } else {
                            res.status(200).send({
                                message: `You have verified account`
                            })
                        }
                    })
                } else {
                    res.status(500).send({
                        message: "Verification code is not correct"
                    })
                }
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Error verifying account'
        })
    }
}

exports.resendCode = async (req, res) => {
    try {
        let { email } = req.body;
        //verification code generation
        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        const code = new Code({
            mail : email,
            verification_code: verificationCode
        })
        Code.create(code, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while generating verification code"
                })
            }
        })
        // Send verification code to the user's email
        await sendVerificationEmail(email, verificationCode);

        // Send user id and base32 key to user
        res.status(200).send({
            message: `Verification code sent to: ${email}`
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Error sending verification code'
        })
    }
}

exports.login = (req, res) => {
    try {
        let {email, password} = req.body;
        User.findByMail(email, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `There is no account which registered by ${email}.`
                    });
                } else {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating new user."
                    });
                }
            } else {
                console.log(data.password)
                if (!bcrypt.compareSync(password, data.password)) {
                    res.status(401).send('Invalid login credentials');
                }
                else {
                    res.status(200).send(data)
                }
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Error while login'
        })
    }
}