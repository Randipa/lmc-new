const Assignment = require('../models/Assignment');

exports.createAssignment = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, description, dueDate } = req.body;
    const assignment = new Assignment({
      courseId,
      teacherId: req.user.userId,
      title,
      description,
      dueDate
    });
    await assignment.save();
    res.status(201).json({ assignment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create assignment' });
  }
};

exports.getAssignments = async (req, res) => {
  try {
    const { courseId } = req.params;
    const assignments = await Assignment.find({ courseId }).sort({ createdAt: -1 });
    res.json({ assignments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch assignments' });
  }
};

exports.submitAssignment = async (req, res) => {
  try {
    const { courseId, assignmentId } = req.params;
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'File required' });

    const assignment = await Assignment.findOne({ _id: assignmentId, courseId });
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    assignment.submissions.push({
      studentId: req.user.userId,
      fileName: file.originalname,
      filePath: `/uploads/assignments/${file.filename}`
    });
    await assignment.save();
    res.json({ message: 'Submission uploaded' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to submit assignment' });
  }
};

exports.getSubmissions = async (req, res) => {
  try {
    const { courseId, assignmentId } = req.params;
    const assignment = await Assignment.findOne({ _id: assignmentId, courseId })
      .populate('submissions.studentId', 'firstName lastName phoneNumber');
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    res.json({ submissions: assignment.submissions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch submissions' });
  }
};
