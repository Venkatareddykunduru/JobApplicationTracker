const express=require('express');
const router=express.Router();
const usercontroller=require('../controllers/user');
const authenticate=require('../middleware/authenticate');

router.post('/signup',usercontroller.createuser);
router.post('/login',usercontroller.loginuser);
router.get('/getprofile',authenticate,usercontroller.getprofile);
router.put('/editprofile',authenticate,usercontroller.editprofile);



module.exports=router;