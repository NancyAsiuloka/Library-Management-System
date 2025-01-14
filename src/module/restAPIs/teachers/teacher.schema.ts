import mongoose, { Schema, Document } from 'mongoose';

export interface ITeacher extends Document {
  name: string;
  students: mongoose.Types.ObjectId[];
}

const TeacherSchema: Schema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
      },
    ],
  },
  { timestamps: true }
);

const Teacher = mongoose.model<ITeacher>('Teacher', TeacherSchema);

export default Teacher;
