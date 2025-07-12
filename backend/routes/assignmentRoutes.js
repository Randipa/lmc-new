const express = require('express');
const router = express.Router();
const controller = require('../controllers/assignmentController');
const { authenticateToken, requireTeacher } = require('../middleware/authMiddleware');

router.post('/', authenticateToken, requireTeacher, controller.createAssignment);
router.get('/course/:courseId', authenticateToken, controller.getAssignmentsByCourse);

module.exports = router;
