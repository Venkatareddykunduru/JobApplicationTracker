const express=require('express');
const router=express.Router();
const authenticate=require('../middleware/authenticate');
const attachmentcontroller=require('../controllers/attachment');
const {upload}=require('../util/s3service');

router.get('/getattachmentsforapplicationid/:id',authenticate,attachmentcontroller.getattachments);
router.delete('/deleteattachment/:id',authenticate,attachmentcontroller.deleteattachment);
router.post('/addattachment/:id',authenticate,upload.array('attachment'),attachmentcontroller.addattachment);
module.exports=router;