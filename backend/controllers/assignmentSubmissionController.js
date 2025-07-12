const AssignmentSubmission = require('../models/AssignmentSubmission');
const path = require('path');

exports.submitAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const studentId = req.user.userId;
    const baseUrl =
      process.env.BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `${req.protocol}://${req.get('host')}`);
    const fileUrl = `${baseUrl}/uploads/submissions/${req.file.filename}`;
    const originalName = req.file.originalname;
    const submission = new AssignmentSubmission({
      assignmentId,
      studentId,
      fileUrl,
      originalName
    });
    await submission.save();
    res.status(201).json({ submission });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to submit assignment' });
  }
};

exports.getSubmissions = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const submissions = await AssignmentSubmission.find({ assignmentId }).populate('studentId', 'firstName lastName');
    res.json({ submissions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch submissions' });
  }
};
