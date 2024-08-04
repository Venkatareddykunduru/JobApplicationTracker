const cron = require('node-cron');
const Reminder = require('../models/reminder');
const User = require('../models/user');
const sendReminderEmail = require('./sendinblue');
const moment = require('moment');
const { Op } = require('sequelize');

cron.schedule('* * * * *', async () => {
    try {
        const now = moment();
        const upcomingReminders = await Reminder.findAll({
            where: {
                reminderDate: {
                    [Op.between]: [now.toDate(), moment(now).add(1, 'hour').toDate()]
                }
            },
            include: [User]
        });
        console.log(upcomingReminders);

        for (const reminder of upcomingReminders) {
            const { reminderDate, message } = reminder;
            let email=reminder.user.email;
            email='venkatareddykunduru123@gmail.com'; //remove this line later
            const subject = `Reminder: ${message}`;
            const text = `You have a reminder set for ${moment(reminderDate).format('LLLL')}: ${message}`;
            await sendReminderEmail(email, subject, text);

            // Mark reminder as sent
            reminder.sent = true;
            await reminder.save();
        }

        
    } catch (error) {
        console.error('Error sending reminder emails:', error);
    }
});
