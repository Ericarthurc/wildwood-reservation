const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const chalk = require('chalk')

const transporter = nodemailer.createTransport(smtpTransport({
    host: process.env.MAILER_HOST,
    port: 587,
    auth: {
        user: process.env.MAILER_USER, // my mail
        pass: process.env.MAILER_PASS
    }
}));

const sendSignUpEmail = async (email, name, service, seats) => {
    try {
        const mail = await transporter.sendMail({
            from: '"Wildwood Christmas❄️" <mailer@wildwoodchristmas.com>',
            to: email,
            subject: "Wildwood Christmas Services",
            // text: "That was easy!",
            html:
                `
                <head>
                    <style>
                        * {
                            text-align: center;
                        }
                        .body {
                            background-color: #ebebeb;
                            font: Arial;
                            border-radius: 20px;
                            padding-top: 20px;
                            padding-bottom: 20px;
                        }
                        p {
                            color: #866740;
                            font-size:20px;
                        }
                        h1 {
                            color: #864a40;
                            font-size:27px;
                        }
                        .logo {
                            width: 60%;
                            max-width: 300px;
                        }
                    </style>
                </head>
                <body class="body">
                    <a href="#"><img class="logo" src="https://static1.squarespace.com/static/55b65b10e4b0c62a632dc7ad/t/5d1a82a115c77500011ee5d3/1570468072312/?format=1500w" alt="image here"></a>
                    <h1>Wildwood Christmas Services</h1>
                    <p>Thank you ${name} for joining Wildwood for our Christmas services!</p>
                    <p>You selected ${seats} seats for our ${service}. We can't wait to see you there!</p>
                </body>
                `
        })
        console.log(mail.response)
    } catch (e) {
        console.log(e)
    }
}

module.exports = sendSignUpEmail