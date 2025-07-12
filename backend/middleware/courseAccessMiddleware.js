const UserCourseAccess = require('../models/UserCourseAccess');
const Course = require('../models/Course');
const User = require('../models/User');

exports.checkCourseAccess = async (req, res, next) => {
  const userId = req.user.userId;
  const { courseId } = req.params;

  // allow teacher or admin users to access their own courses without purchase
  if (req.user.userRole === 'teacher' || req.user.userRole === 'admin') {
    try {
      const user = await User.findById(userId);
      const course = await Course.findById(courseId);
      if (user && course) {
        const fullName = `${user.firstName} ${user.lastName}`;
        if (course.teacherName === fullName || req.user.userRole === 'admin') {
          return next();
        }
      }
    } catch (err) {
      console.error('checkCourseAccess teacher lookup failed', err);
    }
  }

  const access = await UserCourseAccess.findOne({
    userId,
    courseId,
    expiresAt: { $gt: new Date() }
  });

  if (!access) {
    return res.status(403).json({ message: 'Course access denied. Please purchase this course.' });
  }

  next();
};