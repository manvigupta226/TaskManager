const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ActivityLog = sequelize.define('ActivityLog', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  action: { type: DataTypes.STRING },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  details: { type: DataTypes.TEXT }, // store old->new or JSON
  userId: { type: DataTypes.INTEGER }
}, {
  tableName: 'activity_logs',
  timestamps: false,
});

module.exports = ActivityLog;
