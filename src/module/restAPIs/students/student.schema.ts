import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  books: mongoose.Types.ObjectId[];
  teacher: mongoose.Types.ObjectId;
}

const StudentSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      required: true,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model<IStudent>('Student', StudentSchema);

export default Student;
