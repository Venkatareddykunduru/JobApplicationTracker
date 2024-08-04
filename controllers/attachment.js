const JobApplication=require('../models/jobapplication');
const Attachment=require('../models/attachment');
const {s3}=require('../util/s3service');
exports.getattachments = async (req, res) => {
    try {
        const jobApplicationId = parseInt(req.params.id,10);
        //const jobapplication=await JobApplication.findByPk(jobApplicationId);
        //const attachments=await jobapplication.getAttachments();

        const attachments = await Attachment.findAll({ where: { JobApplicationId:jobApplicationId } });
        if (attachments.length) {
            return res.status(404).json({ message: 'No attachments found for this job application' });
        }

        res.status(200).json(attachments);
    } catch (error) {
        console.log('Error getting attachments for job application:', error);
        res.status(500).json({ error: 'Failed to get attachments for this job application' });
    }
};

exports.deleteattachment= async (req,res) => {
    try {
        const attachmentId = parseInt(req.params.id,10);

        const attachment = await Attachment.findByPk(attachmentId);
        if (!attachment) {
            return res.status(404).json({ message: 'Attachment not found' });
        }

        // Delete file from S3
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: attachment.fileKey
        };
        await s3.deleteObject(params);
        

        // Delete attachment record from database
        await attachment.destroy();

        res.status(200).json({ message: 'Attachment deleted successfully' });
    } catch (error) {
        console.log('Error deleting attachment:', error);
        res.status(500).json({ error: 'Failed to delete attachment' });
    }
}

exports.addattachment=async(req,res)=>{
    try{
        const id=parseInt(req.params.id,10);
        const files = req.files;
        console.log(files);
        for (const file of files) {
            console.log(file.location);
            await Attachment.create({
              fileName: file.originalname,
              filePath: file.location,
              fileKey: file.key,
              JobApplicationId: id
            });
        }
        res.status(200).json({message:'Attachment added successfully'});

      
    }catch(error){
        console.log('Error Adding attachment:', error);
        res.status(500).json({ error: 'Failed to Add attachment' });
    }
}