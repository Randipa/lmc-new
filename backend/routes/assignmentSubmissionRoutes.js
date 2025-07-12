const express = require('express');
const router = express.Router({ mergeParams: true });
const controller = require('../controllers/assignmentSubmissionController');
const { authenticateToken, requireTeacher } = require('../middleware/authMiddleware');
const uploadSubmission = require('../middleware/uploadSubmission');

router.post('/', authenticateToken, uploadSubmission.single('file'), controller.submitAssignment);
router.get('/', authenticateToken, requireTeacher, controller.getSubmissions);

module.exports = router;
