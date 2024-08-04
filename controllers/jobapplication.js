const JobApplication=require('../models/jobapplication');
const Attachment=require('../models/attachment');
const { parseISO, isValid } = require('date-fns');

exports.createjobapplication= async (req, res) => {
    try {
      const { companyName, jobTitle, applicationDate, status} = req.body;


      // Validate and parse the applicationDate
    const parsedDate = parseISO(applicationDate);
    if (!isValid(parsedDate)) {
      return res.status(400).json({ error: 'Invalid application date' });
    }
        
      // Create job application
      const jobApplication = await req.user.createJobApplication({
        companyName,
        jobTitle,
        applicationDate:parsedDate,
        status,
      });
  
      // Save attachments
      const files = req.files;
      console.log(files);
      for (const file of files) {
        console.log(file.location);
        await jobApplication.createAttachment({
          fileName: file.originalname,
          filePath: file.location,
          fileKey: file.key
        });
      }
  
      res.status(201).json(jobApplication);
    } catch (error) {
      console.log('Error creating job application:', error);
      res.status(500).json({ error: 'Failed to create job application' });
    }
};


exports.getjobapplicaitons= async (req,res)=>{
    try{
        //console.log('this is the user : ',req.user);
        const jobapplications=await req.user.getJobApplications();
        res.status(200).json(jobapplications);
    }catch (error){
        console.log('Error getting job applications:', error);
      res.status(500).json({ error: 'Failed to get job applications' });
    }
}


exports.getjobapplicationbyid= async (req,res)=>{
    try{
        const id=parseInt(req.params.id,10);
        console.log("applicationid type: ",typeof id);
        const jobapplication=await JobApplication.findByPk(id);
        if(!jobapplication){
            return res.status(200).json({message:'job application not found'});
        }
        res.status(200).json(jobapplication);
    }catch(error){
        console.log('Error getting job application for this id');
        res.status(500).json({error:'Failed to get job application for this id'});
    }
}

exports.updatejobapplicationbyid = async (req, res) => {
    try {
        const id=parseInt(req.params.id,10);
        const updates = req.body;
        
        const jobApplication = await JobApplication.findByPk(id);
        if (!jobApplication) {
            return res.status(404).json({ message: 'Job application not found' });
        }

        await jobApplication.update(updates);
        res.status(200).json(jobApplication);
    } catch (error) {
        console.log('Error updating job application:', error);
        res.status(500).json({ error: 'Failed to update job application' });
    }
};

exports.deletejobapplicationbyid = async (req, res) => {
    try {
        const id=parseInt(req.params.id,10);

        const jobApplication = await JobApplication.findOne({ where: { id, userId: req.user.id } });
        if (!jobApplication) {
            return res.status(404).json({ message: 'Job application not found' });
        }

        await jobApplication.destroy();
        res.status(200).json({ message: 'Job application deleted successfully' });
    } catch (error) {
        console.log('Error deleting job application:', error);
        res.status(500).json({ error: 'Failed to delete job application' });
    }
};