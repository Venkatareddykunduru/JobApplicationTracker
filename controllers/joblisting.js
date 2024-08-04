const JobListing = require('../models/joblisting');
const Company = require('../models/company');

exports.addJobListing = async (req, res) => {
    try {
        const id=parseInt(req.params.id,10);
        const company=await Company.findByPk(id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        //console.log(company);
        const { jobTitle, jobDescription, applicationUrl } = req.body;

        const jobListing = await company.createJobListing({ jobTitle, jobDescription, applicationUrl });
        res.status(201).json(jobListing);
    } catch (error) {
        console.log('Error adding job listing:', error);
        res.status(500).json({ error: 'Failed to add job listing' });
    }
};

exports.getAllJobListings = async (req, res) => {
    try {
        const id=parseInt(req.params.id,10);
        const company=await Company.findByPk(id);
        const jobListings = await company.getJobListings();
        res.status(200).json(jobListings);
    } catch (error) {
        console.log('Error getting job listings:', error);
        res.status(500).json({ error: 'Failed to get job listings' });
    }
};

exports.updateJobListing = async (req, res) => {
    try {
        const jobListingId = parseInt(req.params.id,10);
        const { jobTitle, jobDescription, applicationUrl } = req.body;

        const jobListing = await JobListing.findByPk(jobListingId);
        if (!jobListing) {
            return res.status(404).json({ message: 'Job listing not found' });
        }

        jobListing.jobTitle = jobTitle;
        jobListing.jobDescription = jobDescription;
        jobListing.applicationUrl = applicationUrl;
        await jobListing.save();

        res.status(200).json(jobListing);
    } catch (error) {
        console.log('Error updating job listing:', error);
        res.status(500).json({ error: 'Failed to update job listing' });
    }
};

exports.deleteJobListing = async (req, res) => {
    try {
        const jobListingId = parseInt(req.params.id,10);

        const jobListing = await JobListing.findByPk(jobListingId);
        if (!jobListing) {
            return res.status(404).json({ message: 'Job listing not found' });
        }

        await jobListing.destroy();
        res.status(200).json({ message: 'Job listing deleted successfully' });
    } catch (error) {
        console.log('Error deleting job listing:', error);
        res.status(500).json({ error: 'Failed to delete job listing' });
    }
};
