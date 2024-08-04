const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const jobListingController = require('../controllers/joblisting');

router.post('/addjob/:id', authenticate, jobListingController.addJobListing);
router.get('/getjobs/:id', authenticate, jobListingController.getAllJobListings);
router.put('/updatejob/:id', authenticate, jobListingController.updateJobListing);
router.delete('/deletejob/:id', authenticate, jobListingController.deleteJobListing);

module.exports = router;
