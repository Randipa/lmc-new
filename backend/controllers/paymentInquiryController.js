const PaymentInquiry = require('../models/PaymentInquiry');

exports.createInquiry = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.userId;
    if (!courseId) {
      return res.status(400).json({ message: 'Course id required' });
    }

    const existing = await PaymentInquiry.findOne({
      userId,
      courseId,
      status: { $in: ['pending', 'approved'] }
    });

    if (existing) {
      return res.status(400).json({ message: 'Inquiry already submitted' });
    }

    const inquiry = await PaymentInquiry.create({ userId, courseId });
    res.status(201).json({ message: 'Inquiry submitted', inquiry });
  } catch (err) {
    console.error('Create inquiry error:', err);
    res.status(500).json({ message: 'Failed to submit inquiry' });
  }
};

exports.getMyInquiries = async (req, res) => {
  try {
    const userId = req.user.userId;
    const inquiries = await PaymentInquiry.find({ userId })
      .populate('courseId', 'title price description');
    res.json({ inquiries });
  } catch (err) {
    console.error('Get my inquiries error:', err);
    res.status(500).json({ message: 'Failed to fetch inquiries' });
  }
};

exports.getInquiries = async (req, res) => {
  try {
    const status = req.query.status;
    const query = status ? { status } : {};
    const inquiries = await PaymentInquiry.find(query)
      .populate('userId', 'firstName lastName')
      .populate('courseId', 'title');
    res.json({ inquiries });
  } catch (err) {
    console.error('Get inquiries error:', err);
    res.status(500).json({ message: 'Failed to fetch inquiries' });
  }
};

exports.approveInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const inquiry = await PaymentInquiry.findById(id);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });

    inquiry.status = 'approved';
    await inquiry.save();

    res.json({ message: 'Inquiry approved' });
  } catch (err) {
    console.error('Approve inquiry error:', err);
    res.status(500).json({ message: 'Failed to approve inquiry' });
  }
};

exports.markPaid = async (userId, courseId) => {
  try {
    await PaymentInquiry.findOneAndUpdate(
      { userId, courseId, status: 'approved' },
      { status: 'paid' }
    );
  } catch (err) {
    console.error('Mark paid error:', err);
  }
};
