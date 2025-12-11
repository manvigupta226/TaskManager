const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const tc = require('../controllers/taskController');

router.post('/', auth, tc.createTask);          // Create Task
router.get('/', auth, tc.listTasks);            // List (filter with ?status=&priority=)
router.put('/:id', auth, tc.updateTask);        // Update task
router.delete('/:id', auth, tc.deleteTask);     // Delete

module.exports = router;
