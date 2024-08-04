const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const JobListing = sequelize.define('JobListing', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  jobTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  jobDescription: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  applicationUrl: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = JobListing;
