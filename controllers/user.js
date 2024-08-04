const bcrypt = require('bcrypt');
const User= require('../models/user'); // Adjust the path according to your project structure
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.createuser = async (req, res) => {
  const { email,password,name, careerGoals } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email: email } });

    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await User.create({ email,  password: hashedPassword,name,careerGoals,});

    // Respond with the created user's information
    console.log('User created successfully');
    res.status(201).json({
      message: 'User created successfully!'
    });
  } catch (error) {
    // Handle any errors
    console.log(error);
    res.status(500).json({
      message: 'Error creating user',
      error: error.errors ? error.errors[0].message : error.message
    });
  }
};

exports.loginuser = async (req, res, next) => {
    const { email, password } = req.body;
    
    try {
        // Find user by email
        console.log('login method called');
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_PRIVATE_KEY);

        // Successful login
        res.status(200).json({ message: 'Login successful', token , userid:user.id});
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getprofile=(req,res)=>{
  try{
    if(!req.user){
      res.status(404).json({message:'user not found'});
    }
    const user={
      id:req.user.id,
      email:req.user.email,
      name:req.user.name,
      careerGoals:req.user.careerGoals
    }
    res.status(200).json({user:user});
  }catch(error){
    console.log('error getting profile');
    res.status(500).json({message:'Internal server error'});
  }
}

exports.editprofile=(req,res)=>{
  try{
    console.log("edit method called");
    req.user.name=req.body.name || req.user.name;
    req.user.email=req.body.email || req.user.email;
    req.user.careerGoals=req.body.careerGoals || req.user.careerGoals;
    req.user.save();
    const user={
      id:req.user.id,
      email:req.user.email,
      name:req.user.name,
      careerGoals:req.user.careerGoals
    }
    res.status(200).json({user:user});
  }catch(error){
    console.log('error updating profile');
    res.status(500).json({message:'Internal server error'});
  }
}