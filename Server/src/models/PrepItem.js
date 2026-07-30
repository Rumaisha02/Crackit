import mongoose from 'mongoose';

const prepItemSchema = new mongoose.Schema(
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
    question: {
      type: String,
      required: [true, 'Prep question is required'],
      trim: true,
    },
    myAnswer: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const PrepItem = mongoose.model('PrepItem', prepItemSchema);
