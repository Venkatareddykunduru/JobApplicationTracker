const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Attachment = sequelize.define('Attachment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fileKey:{
    type:DataTypes.STRING,
    allowNull:false
  }
});

module.exports = Attachment;
