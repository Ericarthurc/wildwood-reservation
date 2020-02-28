const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const transporter = nodemailer.createTransport(
  smtpTransport({
    host: process.env.MAILER_HOST,
    port: 587,
    auth: {
      user: process.env.MAILER_USER, // my mail
      pass: process.env.MAILER_PASS
    }
  })
);

const sendSignUpEmail = async (email, name, service, seats) => {
  const splitService = service.split(' ');
  try {
    const mail = await transporter.sendMail({
      from: '"Wildwood Easter" <mailer@wildwoodeaster.com>',
      to: email,
      subject: 'Wildwood Easter Services',
      // text: "That was easy!",
      html: `
                <head>
                    <style>
                        .body {
                            text-align: center;
                            background-color: #ede9d3;
                            font: Arial;
                            border-radius: 20px;
                            padding-top: 20px;
                            padding-bottom: 20px;
                        }
                        p {
                            color: #25201f;
                            font-size:20px;
                            margin: 0px;
                            padding: 0px;
                        }
                        h1 {
                            color: #c79f27;
                            font-size:27px;
                            margin: 0px;
                            padding: 0px;
                        }
                        .logo {
                            width: 60%;
                            max-width: 300px;
                        }
                    </style>
                </head>
                <body class="body">
                    <a href="#"><img class="logo" src="https://static1.squarespace.com/static/55b65b10e4b0c62a632dc7ad/t/5d1a82a115c77500011ee5d3/1570468072312/?format=1500w" alt="image here"></a>
                    <h1>Wildwood Easter Services</h1>
                    <p>Thank you ${name} for joining Wildwood for our Easter services!</p>
                    <p>You selected ${seats} seats for our ${splitService[0]}'s ${splitService[1]} service. We can't wait to see you there!</p>
                </body>
                `
    });
  } catch (e) {
    console.log('Mailer failed');
  }
};

module.exports = sendSignUpEmail;
