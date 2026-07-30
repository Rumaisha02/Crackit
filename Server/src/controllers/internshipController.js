import { Internship } from '../models/Internship.js';
import { Resource } from '../models/Resource.js';
import { PrepItem } from '../models/PrepItem.js';

const VALID_STATUSES = ['wishlist', 'applied', 'screening', 'interview', 'offer', 'selected', 'rejected'];

/**
 * @route   POST /api/internships
 * @desc    Create a new internship application for authenticated user
 * @access  Private
 */
export const createInternship = async (req, res) => {
  try {
    const { company, role, jdText, sourceLink, status, appliedDate, deadline } = req.body;

    if (!company || !role) {
      return res.status(400).json({ error: 'Company and role are required' });
    }

    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` });
    }

    const internship = await Internship.create({
      userId: req.user._id,
      company,
      role,
      jdText: jdText || '',
      sourceLink: sourceLink || '',
      status: status || 'wishlist',
      appliedDate: appliedDate || Date.now(),
      deadline: deadline || null,
    });

    res.status(201).json(internship);
  } catch (error) {
    console.error('[Create Internship Error]', error);
    res.status(500).json({ error: 'Server error creating internship' });
  }
};

/**
 * @route   GET /api/internships
 * @desc    Get all internships belonging ONLY to the authenticated user
 * @access  Private
 */
export const getInternships = async (req, res) => {
  try {
    const { status, search } = req.query;

    const query = { userId: req.user._id };

    if (status && status !== 'all') {
      if (VALID_STATUSES.includes(status)) {
        query.status = status;
      }
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { company: searchRegex },
        { role: searchRegex },
        { jdText: searchRegex },
      ];
    }

    const internships = await Internship.find(query).sort({ updatedAt: -1 });
    res.json(internships);
  } catch (error) {
    console.error('[Get Internships Error]', error);
    res.status(500).json({ error: 'Server error fetching internships' });
  }
};

/**
 * @route   GET /api/internships/:id
 * @desc    Get a single internship only if it belongs to authenticated user
 * @access  Private
 */
export const getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!internship) {
      return res.status(404).json({ error: 'Internship not found' });
    }

    const resources = await Resource.find({ internshipId: internship._id, userId: req.user._id }).sort({ createdAt: -1 });
    const prepItems = await PrepItem.find({ internshipId: internship._id, userId: req.user._id }).sort({ createdAt: -1 });

    res.json({
      ...internship.toObject(),
      resources,
      prepItems,
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Internship not found' });
    }
    console.error('[Get Internship By ID Error]', error);
    res.status(500).json({ error: 'Server error fetching internship workspace' });
  }
};

/**
 * @route   PATCH /api/internships/:id/status
 * @desc    Update ONLY the status field of an internship
 * @access  Private
 */
export const updateInternshipStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !VALID_STATUSES.includes(status)) {
      return res.status(400).json({ error: `Status must be one of: ${VALID_STATUSES.join(', ')}` });
    }

    const internship = await Internship.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!internship) {
      return res.status(404).json({ error: 'Internship not found' });
    }

    internship.status = status;
    const updatedInternship = await internship.save();

    res.json(updatedInternship);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Internship not found' });
    }
    console.error('[Update Status Error]', error);
    res.status(500).json({ error: 'Server error updating internship status' });
  }
};

/**
 * @route   PATCH /api/internships/:id or PUT /api/internships/:id
 * @desc    Update internship details
 * @access  Private
 */
export const updateInternship = async (req, res) => {
  try {
    const internship = await Internship.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!internship) {
      return res.status(404).json({ error: 'Internship not found' });
    }

    const allowedUpdates = ['company', 'role', 'jdText', 'sourceLink', 'status', 'appliedDate', 'deadline'];

    if (req.body.status && !VALID_STATUSES.includes(req.body.status)) {
      return res.status(400).json({ error: `Status must be one of: ${VALID_STATUSES.join(', ')}` });
    }

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        internship[field] = req.body[field];
      }
    });

    const updatedInternship = await internship.save();
    res.json(updatedInternship);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Internship not found' });
    }
    console.error('[Update Internship Error]', error);
    res.status(500).json({ error: 'Server error updating internship' });
  }
};

/**
 * @route   DELETE /api/internships/:id
 * @desc    Delete an internship application belonging to authenticated user
 * @access  Private
 */
export const deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!internship) {
      return res.status(404).json({ error: 'Internship not found' });
    }

    await Internship.deleteOne({ _id: internship._id });
    await Resource.deleteMany({ internshipId: internship._id });
    await PrepItem.deleteMany({ internshipId: internship._id });

    res.json({ message: 'Internship and associated items deleted successfully' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Internship not found' });
    }
    console.error('[Delete Internship Error]', error);
    res.status(500).json({ error: 'Server error deleting internship' });
  }
};
