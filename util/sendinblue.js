// util/sendinblue.js
const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env file

const sendReminderEmail = async (to, subject, text) => {
    const apiKey = process.env.SENDINBLUE_API_KEY;
    const senderEmail = process.env.SENDER_EMAIL;

    const emailData = {
        sender: { email: senderEmail },
        to: [{ email: to }],
        subject: subject,
        htmlContent: `<p>${text}.</p>`
    };

    try {
        await axios.post('https://api.sendinblue.com/v3/smtp/email', emailData, {
            headers: { 'api-key': apiKey, 'Content-Type': 'application/json' }
        });
        console.log('Reminder email sent to : ',to);
    } catch (err) {
        console.error('Error sending email:', err);
        throw err;
    }
};

module.exports = sendReminderEmail;

