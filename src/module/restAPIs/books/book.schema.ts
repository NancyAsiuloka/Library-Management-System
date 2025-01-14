import mongoose, { Schema } from 'mongoose';
import { IBook } from '../../../types/book.types';

const BookSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model<IBook>('Book', BookSchema);

export default Book;
