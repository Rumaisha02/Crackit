import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
  {
    internshipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Internship',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Resource title is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['link', 'note', 'question'],
      required: [true, 'Resource type is required'],
    },
    content: {
      type: String,
      required: [true, 'Resource content is required'],
    },
  },
  {
    timestamps: true,
  }
);

export const Resource = mongoose.model('Resource', resourceSchema);
