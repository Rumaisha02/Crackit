import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Role title is required'],
      trim: true,
    },
    jdText: {
      type: String,
      default: '',
    },
    sourceLink: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['wishlist', 'applied', 'screening', 'interview', 'offer', 'selected', 'rejected'],
      default: 'wishlist',
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
    deadline: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const Internship = mongoose.model('Internship', internshipSchema);
