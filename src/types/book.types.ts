import mongoose from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  student: mongoose.Types.ObjectId;
}

export interface CreateBook{
  title: string;
  author: string;
  student: mongoose.Types.ObjectId;
}
export interface UpdateBook{
  title?: string;
  author?: string;
  student: mongoose.Types.ObjectId;
}

export interface CreateTeacher{
  name: string;
  email: string;
  students: mongoose.Types.ObjectId[];
}
export interface UpdateTeacher{
  name?: string;
  email?: string;
  students: mongoose.Types.ObjectId[];
}

export interface CreateStudentUnderTeacher{
  name: string;
}