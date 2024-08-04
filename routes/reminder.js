const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const reminderController = require('../controllers/reminder');

router.post('/addreminder/:id', authenticate, reminderController.addReminder);
router.get('/getreminderbyid/:id', authenticate, reminderController.getReminderById);
router.get('/getremindersbyid/:jobApplicationId', authenticate, reminderController.getRemindersByJobApplicationId);
router.put('/updatereminder/:id', authenticate, reminderController.updateReminder);
router.delete('/deletereminder/:id', authenticate, reminderController.deleteReminder);

module.exports = router;