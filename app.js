const express=require('express');
const cors=require('cors');
const bodyparser=require('body-parser');
const sequelize=require('./util/database');

//models
const User = require('./models/user');
const JobApplication = require('./models/jobapplication');
const Attachment = require('./models/attachment');
const Reminder = require('./models/reminder');
const Company = require('./models/company');
const JobListing = require('./models/joblisting');
const Note = require('./models/note');

//import routes
const userroutes=require('./routes/user');
const jobapplicationroutes=require('./routes/jobapplication');
const attachmentroutes=require('./routes/attachment');
const noteroutes=require('./routes/note');
const companyroutes=require('./routes/company');
const joblistingroutes=require('./routes/joblisting');
const reminderroutes=require('./routes/reminder');
//require('./util/scheduler'); //uncomment this line later

const app=express();
app.use(cors());
app.use(bodyparser.json());


//Associations

// User and JobApplication
User.hasMany(JobApplication);
JobApplication.belongsTo(User);

// JobApplication and Attachment
JobApplication.hasMany(Attachment);
Attachment.belongsTo(JobApplication);

// User and Reminder
User.hasMany(Reminder);
Reminder.belongsTo(User);

// JobApplication and Reminder
JobApplication.hasMany(Reminder);
Reminder.belongsTo(JobApplication);

// User and Reminder
User.hasMany(Reminder);
Reminder.belongsTo(User);

// User and Company
User.hasMany(Company);
Company.belongsTo(User);

// Company and JobListing
Company.hasMany(JobListing);
JobListing.belongsTo(Company);

// JobApplication and Note
JobApplication.hasMany(Note);
Note.belongsTo(JobApplication);

//  User.findByPk(1).then((user)=>{
//      console.log(Object.keys(user.__proto__));
//  });

//  Company.findByPk(2).then((company)=>{
//     console.log(Object.keys(company.__proto__));
// });

//  JobApplication.findByPk(1).then((j)=>{
//     console.log(Object.keys(j.__proto__));
//  });
//use routes
app.use('/user',userroutes);
app.use('/jobapplication',jobapplicationroutes);
app.use('/attachments',attachmentroutes);
app.use('/note',noteroutes);
app.use('/company',companyroutes);
app.use('/companyjobs',joblistingroutes);
app.use('/reminder',reminderroutes);

(async () => {
    try {
        await sequelize.sync();
        app.listen(process.env.PORT, () => {
            console.log(`Server is listening on port ${process.env.PORT}`);
        });
    } catch (err) {
        console.log('Unable to start server : '+err);
    }
})();