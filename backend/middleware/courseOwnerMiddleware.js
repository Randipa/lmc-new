const Course = require('../models/Course');
const User = require('../models/User');

module.exports = async function courseOwnerOrAdmin(req, res, next) {
  try {
    const courseId = req.params.courseId || req.params.id;
    if (!courseId) return res.status(400).json({ message: 'Course ID required' });
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(401).json({ message: 'User not found' });

    if (req.user.userRole === 'admin') {
      return next();
    }

    if (req.user.userRole === 'teacher') {
      const teacherName = `${user.firstName} ${user.lastName}`.trim();
      if (course.teacherName && course.teacherName.trim() === teacherName) {
        return next();
      }
    }

    return res.status(403).json({ message: 'Access denied' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Authorization failed' });
  }
};
