const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendSignUpEmail = (email, name, service, seats) => {
    sgMail.send({
        to: email,
        from: 'emailbot@wildwoodcalvary.com',
        subject: 'Wildwood Christmas Eve Service',
        text: `Thank you ${name} for joining Wildwood for our Christmas Eve service! You selected ${seats} seats for our ${service}. We can't wait to see you there!`
    })
}

module.exports = sendSignUpEmail