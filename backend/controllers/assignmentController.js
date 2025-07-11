const Assignment = require('../models/Assignment');

exports.createAssignment = async (req, res) => {
  try {
    const { courseId, title, description } = req.body;
    const teacherId = req.user.userId;
    const baseUrl =
      process.env.BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `${req.protocol}://${req.get('host')}`);
    const fileUrl = req.file ? `${baseUrl}/uploads/assignments/${req.file.filename}` : undefined;
    const assignment = new Assignment({ courseId, teacherId, title, description, fileUrl });
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

exports.getAssignmentsByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const assignments = await Assignment.find({ teacherId })
      .populate('courseId', 'title')
      .sort({ createdAt: -1 });
    res.json({ assignments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get assignments' });
  }
};

exports.getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    res.json({ assignment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get assignment' });
  }
};
