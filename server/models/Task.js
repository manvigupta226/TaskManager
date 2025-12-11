const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Task = sequelize.define('Task', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  category: { type: DataTypes.STRING },
  priority: { type: DataTypes.ENUM('Low','Medium','High'), defaultValue: 'Low' },
  dueDate: { type: DataTypes.DATE },
  status: { type: DataTypes.ENUM('Pending','In Progress','Completed'), defaultValue: 'Pending' },
  userId: { type: DataTypes.INTEGER, allowNull: false },
}, {
  timestamps: true,
  tableName: 'tasks'
});

Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = Task;
