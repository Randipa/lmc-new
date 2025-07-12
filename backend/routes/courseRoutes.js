const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const videoController = require('../controllers/uploadCourseVideo');
const upload = require('../middleware/upload');
const uploadSubtitle = require('../middleware/uploadSubtitle');
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware');
const courseOwnerOrAdmin = require('../middleware/courseOwnerMiddleware');

// Course CRUD
router.post('/courses', authenticateToken, requireAdmin, courseController.createCourse);
router.get('/courses', courseController.getAllCourses);
router.get('/courses/stats', courseController.getCourseStats);
router.get('/courses/available-grades', courseController.getAvailableGrades);
router.get('/courses/:id', courseController.getCourseById);
router.put('/courses/:id', authenticateToken, courseOwnerOrAdmin, courseController.updateCourse);
router.delete('/courses/:id', authenticateToken, courseOwnerOrAdmin, courseController.deleteCourse);
router.put('/courses/:id/full', authenticateToken, requireAdmin, courseController.updateFullCourse);

// Add course content (manual embed or Bunny.net metadata)
router.get('/courses/:id/content', courseController.getCourseContent);
router.post('/courses/:id/content', authenticateToken, courseOwnerOrAdmin, courseController.addCourseContent);
router.put('/courses/:id/content/:contentId', authenticateToken, courseOwnerOrAdmin, courseController.updateCourseContent);
router.delete('/courses/:id/content/:contentId', authenticateToken, courseOwnerOrAdmin, courseController.deleteCourseContent);

// Subtitle management
router.post('/courses/:id/subtitles', authenticateToken, courseOwnerOrAdmin, uploadSubtitle.single('subtitleFile'), courseController.uploadSubtitle);
router.delete('/courses/:id/subtitles/:subtitleId', authenticateToken, courseOwnerOrAdmin, courseController.deleteSubtitle);

// Upload video file directly to Bunny.net and attach to course
router.post('/courses/:id/upload-video', authenticateToken, courseOwnerOrAdmin, upload.single('video'), videoController.uploadCourseVideo);

module.exports = router;
