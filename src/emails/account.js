const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendSignUpEmail = (email, name, service, seats) => {
    sgMail.send({
        to: email,
        from: 'emailbot@wildwoodcalvary.com',
        subject: 'Wildwood Christmas Eve Service',
        html: `
        <head>
            <style>
                * {
                    background-color:#1f1f1f;
                    font: Arial;
                }
                p {
                    color: #866740;
                    font-size:22px;
                }
                h1 {
                    color: #864a40;
                    font-size:30px;
                }
            </style>
        </head>
        <body>
            <h1>Wildwood Christmas Services</h1>
            <p>Thank you ${name} for joining Wildwood for our Christmas services!</p>
            <p>You selected ${seats} seats for our ${service}. We can't wait to see you there!</p>
        </body>
        `
    })
}

module.exports = sendSignUpEmail