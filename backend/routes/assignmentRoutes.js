const express = require('express');
const router = express.Router({ mergeParams: true });
const controller = require('../controllers/assignmentController');
const upload = require('../middleware/uploadAssignment');
const { authenticateToken, requireTeacher, requireStudentOnly } = require('../middleware/authMiddleware');
const courseOwnerOrAdmin = require('../middleware/courseOwnerMiddleware');

router.post('/', authenticateToken, requireTeacher, courseOwnerOrAdmin, controller.createAssignment);
router.get('/', authenticateToken, controller.getAssignments);
router.post('/:assignmentId/submissions', authenticateToken, requireStudentOnly, upload.single('file'), controller.submitAssignment);
router.get('/:assignmentId/submissions', authenticateToken, requireTeacher, courseOwnerOrAdmin, controller.getSubmissions);

module.exports = router;
