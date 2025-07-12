const Assignment = require('../models/Assignment');
const Course = require('../models/Course');
const User = require('../models/User');

async function teacherOwnsCourse(req, courseId) {
  if (req.user.userRole === 'admin') return true;
  const course = await Course.findById(courseId);
  if (!course) return false;
  const user = await User.findById(req.user.userId);
  if (!user) return false;
  const name = `${user.firstName} ${user.lastName}`;
  return (
    course.createdBy?.toString() === req.user.userId ||
    course.teacherName === name
  );
}

exports.createAssignment = async (req, res) => {
  try {
    const { courseId, title, description } = req.body;
    const teacherId = req.user.userId;

    if (!(await teacherOwnsCourse(req, courseId))) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const assignment = new Assignment({ courseId, teacherId, title, description });
    await assignment.save();
    res.status(201).json({ assignment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create assignment' });
  }
};

exports.getAssignmentsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const assignments = await Assignment.find({ courseId }).sort({ createdAt: -1 });
    res.json({ assignments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get assignments' });
  }
};
