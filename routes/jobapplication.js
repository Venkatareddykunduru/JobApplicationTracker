const express=require('express');
const router=express.Router();
const authenticate=require('../middleware/authenticate');
const {upload}=require('../util/s3service');
const jobapplicationcontroller=require('../controllers/jobapplication');

router.post('/createjobapplication',authenticate,upload.array('attachments'),jobapplicationcontroller.createjobapplication);
router.get('/getjobapplications',authenticate,jobapplicationcontroller.getjobapplicaitons);
router.get('/getjobapplicationbyid/:id',authenticate,jobapplicationcontroller.getjobapplicationbyid);
router.put('/updatejobapplicationbyid/:id',authenticate,jobapplicationcontroller.updatejobapplicationbyid);
router.delete('/deletejobapplicationbyid/:id',authenticate,jobapplicationcontroller.deletejobapplicationbyid);

module.exports=router;