//const transporter = require('./initService').transporter;
const hbs = require('nodemailer-express-handlebars');
let nodeMailer = require("nodemailer");
const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com", // hostname
    secureConnection: true, // TLS requires secureConnection to be false
    port: 465, // port for secure SMTP
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

// transporter.use('compile', hbs({
//     viewEngine: {
//         extName: '.hbs',
//         partialsDir: './email_templates/',
//         layoutsDir: './email_templates/',
//         defaultLayout: 'verification.hbs',
//     },
//
//     //viewEngine: 'express-handlebars',
//     viewPath: './email_templates/',
//     extName: '.hbs',
//
// }));

function sendVerificationEmail(email, code){
    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: 'ellenabarasova@gmail.com', // Sender address
            to: email, // List of recipients
            subject: 'Verify Your Account', // Subject line
            text: code, // Plain text body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("err1 ", error);
                reject(error)

            } else {
                resolve("Activation code has been sent!")
            }
        });

    })
}

module.exports = {
    sendVerificationEmail: sendVerificationEmail
}