const Reminder = require('../models/reminder');
const JobApplication = require('../models/jobapplication');
const User = require('../models/user');
const { parseISO, isValid } = require('date-fns');


exports.addReminder = async (req, res) => {
    try {
        const id=parseInt(req.params.id,10);
        const { reminderDate, message, sent } = req.body;
        const userId = parseInt(req.user.id,10); // Assuming user is set in req by authenticate middleware
        const parsedDate = parseISO(reminderDate);
        if (!isValid(parsedDate)) {
            return res.status(400).json({ error: 'Invalid application date' });
        }
        const jobApplication = await JobApplication.findByPk(id);
        if (!jobApplication) {
            return res.status(404).json({ message: 'Job application not found' });
        }

        const reminder = await Reminder.create({
            reminderDate:parsedDate,
            message,
            sent,
            JobApplicationId:id,
            userId
        });

        res.status(201).json(reminder);
    } catch (error) {
        console.log('Error adding reminder:', error);
        res.status(500).json({ error: 'Failed to add reminder' });
    }
};

exports.getReminderById = async (req, res) => {
    try {
        const id = parseInt(req.params.id,10);
        const reminder = await Reminder.findByPk(id);

        if (!reminder) {
            return res.status(404).json({ message: 'Reminder not found' });
        }

        res.status(200).json(reminder);
    } catch (error) {
        console.log('Error getting reminder by ID:', error);
        res.status(500).json({ error: 'Failed to get reminder by ID' });
    }
};

exports.getRemindersByJobApplicationId = async (req, res) => {
    try {
        const jobApplicationId = parseInt(req.params.jobApplicationId,10);
        const reminders = await Reminder.findAll({ where: { jobApplicationId } });

        if (reminders.length === 0) {
            return res.status(404).json({ message: 'No reminders found for this job application' });
        }

        res.status(200).json(reminders);
    } catch (error) {
        console.log('Error getting reminders by job application ID:', error);
        res.status(500).json({ error: 'Failed to get reminders by job application ID' });
    }
};

exports.updateReminder = async (req, res) => {
    try {
        const id = parseInt(req.params.id,10);
        const { reminderDate, message } = req.body;
        const parsedDate = parseISO(reminderDate);
        if (!isValid(parsedDate)) {
            return res.status(400).json({ error: 'Invalid application date' });
        }

        const reminder = await Reminder.findByPk(id);
        if (!reminder) {
            return res.status(404).json({ message: 'Reminder not found' });
        }

        reminder.reminderDate = reminderDate;
        reminder.message = message;

        await reminder.save();
        res.status(200).json(reminder);
    } catch (error) {
        console.log('Error updating reminder:', error);
        res.status(500).json({ error: 'Failed to update reminder' });
    }
};

exports.deleteReminder = async (req, res) => {
    try {
        const id = parseInt(req.params.id,10);

        const reminder = await Reminder.findByPk(id);
        if (!reminder) {
            return res.status(404).json({ message: 'Reminder not found' });
        }

        await reminder.destroy();
        console.log('deleted successfully');
        res.status(204).json({ message: 'Reminder deleted successfully' });
    } catch (error) {
        console.log('Error deleting reminder:', error);
        res.status(500).json({ error: 'Failed to delete reminder' });
    }
};
