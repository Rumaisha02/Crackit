import { Resource } from '../models/Resource.js';
import { Internship } from '../models/Internship.js';

const VALID_TYPES = ['link', 'note', 'question'];

/**
 * @route   POST /api/resources
 * @desc    Add a resource/note/link to an internship workspace
 * @access  Private
 */
export const addResource = async (req, res) => {
  try {
    const { internshipId, title, type, content } = req.body;

    if (!internshipId || !title || !content || !type) {
      return res.status(400).json({ error: 'internshipId, title, type, and content are required' });
    }

    if (!VALID_TYPES.includes(type)) {
      return res.status(400).json({ error: `Type must be one of: ${VALID_TYPES.join(', ')}` });
    }

    // Verify ownership of the parent internship
    const internship = await Internship.findOne({
      _id: internshipId,
      userId: req.user._id,
    });

    if (!internship) {
      return res.status(404).json({ error: 'Internship not found' });
    }

    const resource = await Resource.create({
      internshipId,
      userId: req.user._id,
      title,
      type,
      content,
    });

    res.status(201).json(resource);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Internship not found' });
    }
    console.error('[Add Resource Error]', error);
    res.status(500).json({ error: 'Server error adding resource' });
  }
};

/**
 * @route   GET /api/resources/internship/:internshipId
 * @desc    Get all resources for a specific internship belonging to user
 * @access  Private
 */
export const getResourcesByInternship = async (req, res) => {
  try {
    // Verify ownership of the parent internship
    const internship = await Internship.findOne({
      _id: req.params.internshipId,
      userId: req.user._id,
    });

    if (!internship) {
      return res.status(404).json({ error: 'Internship not found' });
    }

    const resources = await Resource.find({
      internshipId: req.params.internshipId,
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(resources);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Internship not found' });
    }
    console.error('[Get Resources Error]', error);
    res.status(500).json({ error: 'Server error fetching resources' });
  }
};

/**
 * @route   DELETE /api/resources/:id
 * @desc    Delete a resource by ID (ownership enforced)
 * @access  Private
 */
export const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    await Resource.deleteOne({ _id: resource._id });
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Resource not found' });
    }
    console.error('[Delete Resource Error]', error);
    res.status(500).json({ error: 'Server error deleting resource' });
  }
};
