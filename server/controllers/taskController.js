const Task = require('../models/Task');
const ActivityLog = require('../models/ActivityLog');

exports.createTask = async (req, res) => {
  try {
    const { title, description, category, priority, dueDate } = req.body;
    const userId = req.user.id;
    const task = await Task.create({ title, description, category, priority, dueDate, userId });
    // log
    await ActivityLog.create({ action: 'CREATE_TASK', details: JSON.stringify({ title }), userId });
    res.json(task);
  } catch (err) { res.status(500).send(err.message); }
};

exports.listTasks = async (req, res) => {
  try {
    const { status, priority } = req.query;
    const where = { userId: req.user.id };
    if (status) where.status = status;
    if (priority) where.priority = priority;
    const tasks = await Task.findAll({ where, order: [['createdAt','DESC']] });
    res.json(tasks);
  } catch (err) { res.status(500).send(err.message); }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ msg: 'Not found' });
    const old = task.toJSON();
    await task.update(req.body);
    await ActivityLog.create({ action: 'UPDATE_TASK', details: JSON.stringify({ old, new: task }), userId: req.user.id });
    res.json(task);
  } catch (err) { res.status(500).send(err.message); }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ msg: 'Not found' });
    await task.destroy();
    await ActivityLog.create({ action: 'DELETE_TASK', details: JSON.stringify({ id }), userId: req.user.id });
    res.json({ msg: 'Deleted' });
  } catch (err) { res.status(500).send(err.message); }
};
