import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const residentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      default: 'Other',
    },
    dateOfBirth: {
      type: Date,
    },
    roomNumber: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 160,
    },
    guardianName: {
      type: String,
      trim: true,
      maxlength: 120,
    },
    emergencyContact: {
      name: {
        type: String,
        trim: true,
        maxlength: 120,
      },
      relation: {
        type: String,
        trim: true,
        maxlength: 80,
      },
      phone: {
        type: String,
        trim: true,
        maxlength: 20,
      },
    },
    address: {
      type: String,
      trim: true,
      maxlength: 250,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 800,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    feedback: {
      type: [feedbackSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

residentSchema.virtual('averageRating').get(function averageRating() {
  if (!this.feedback || this.feedback.length === 0) {
    return 0;
  }

  const total = this.feedback.reduce((acc, item) => acc + item.rating, 0);
  return Number((total / this.feedback.length).toFixed(1));
});

residentSchema.index({ roomNumber: 1 });
residentSchema.index({ email: 1 }, { unique: true });
residentSchema.index({ fullName: 'text', roomNumber: 'text', email: 'text', phone: 'text' });

export default mongoose.model('Resident', residentSchema);
