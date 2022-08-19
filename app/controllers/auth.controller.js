const speakeasy = require("speakeasy");
const uuid = require("uuid")
const User = require("../models/user.model");


exports.register = (req, res) => {
    const id = uuid.v4();
    try {
        const path = `/user/${id}`;
        // Create temporary secret until it is verified
        const temp_secret = speakeasy.generateSecret();
        // Create user in the database
        const user = new User({
            id: id,
            secret: temp_secret.base32
        })
        User.create(user, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating new user."
                });
        })
        // Send user id and base32 key to user
        res.json({id, secret: temp_secret.base32});
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Error generating secret key'
        });
    }
}