import { PrepItem } from '../models/PrepItem.js';
import { Internship } from '../models/Internship.js';

/**
 * @route   POST /api/prep-items
 * @desc    Add a mock interview prep question to an internship workspace
 * @access  Private
 */
export const addPrepItem = async (req, res) => {
  try {
    const { internshipId, question, myAnswer } = req.body;

    if (!internshipId || !question) {
      return res.status(400).json({ error: 'internshipId and question are required' });
    }

    // Verify ownership of the parent internship
    const internship = await Internship.findOne({
      _id: internshipId,
      userId: req.user._id,
    });

    if (!internship) {
      return res.status(404).json({ error: 'Internship not found' });
    }

    const prepItem = await PrepItem.create({
      internshipId,
      userId: req.user._id,
      question,
      myAnswer: myAnswer || '',
    });

    res.status(201).json(prepItem);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Internship not found' });
    }
    console.error('[Add Prep Item Error]', error);
    res.status(500).json({ error: 'Server error adding prep item' });
  }
};

/**
 * @route   GET /api/prep-items/internship/:internshipId
 * @desc    Get all prep items for a specific internship belonging to user
 * @access  Private
 */
export const getPrepItemsByInternship = async (req, res) => {
  try {
    // Verify ownership of parent internship
    const internship = await Internship.findOne({
      _id: req.params.internshipId,
      userId: req.user._id,
    });

    if (!internship) {
      return res.status(404).json({ error: 'Internship not found' });
    }

    const prepItems = await PrepItem.find({
      internshipId: req.params.internshipId,
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(prepItems);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Internship not found' });
    }
    console.error('[Get Prep Items Error]', error);
    res.status(500).json({ error: 'Server error fetching prep items' });
  }
};

/**
 * @route   PUT /api/prep-items/:id
 * @desc    Update a prep item's question or answer
 * @access  Private
 */
export const updatePrepItem = async (req, res) => {
  try {
    const prepItem = await PrepItem.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!prepItem) {
      return res.status(404).json({ error: 'Prep item not found' });
    }

    if (req.body.question !== undefined) prepItem.question = req.body.question;
    if (req.body.myAnswer !== undefined) prepItem.myAnswer = req.body.myAnswer;

    const updated = await prepItem.save();
    res.json(updated);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Prep item not found' });
    }
    console.error('[Update Prep Item Error]', error);
    res.status(500).json({ error: 'Server error updating prep item' });
  }
};

/**
 * @route   DELETE /api/prep-items/:id
 * @desc    Delete a prep item by ID
 * @access  Private
 */
export const deletePrepItem = async (req, res) => {
  try {
    const prepItem = await PrepItem.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!prepItem) {
      return res.status(404).json({ error: 'Prep item not found' });
    }

    await PrepItem.deleteOne({ _id: prepItem._id });
    res.json({ message: 'Prep item deleted successfully' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Prep item not found' });
    }
    console.error('[Delete Prep Item Error]', error);
    res.status(500).json({ error: 'Server error deleting prep item' });
  }
};
