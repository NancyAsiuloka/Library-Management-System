import Student from '../../restAPIs/students/student.schema';
import Book from '../../restAPIs/books/book.schema';
import { IResolvers } from '@graphql-tools/utils';
import { Document } from 'mongoose';

interface IStudent extends Document {
    id: string;
    books: string[];
}

interface IBook extends Document {
    student: string;
}

export const studentResolvers: IResolvers = {
    Query: {
        students: async (): Promise<{ id: string; books: string[] }[]> => {
            try {
                const students = await Student.find().populate('books');
                return students.map(student => ({
                    id: student._id.toString(),
                    books: student.books.map(book => book.toString()),
                }));
            } catch (error) {
                throw new Error(`Error fetching students: ${error.message}`);
            }
        },
    },
    Student: {
        books: async (student: IStudent): Promise<IBook[]> => {
            try {
                return await Book.find({ student: student.id });
            } catch (error) {
                throw new Error(`Error fetching books for student: ${error.message}`);
            }
        },
    },
};
