import Book from "../books/book.schema";
import Student from "../students/student.schema";
import { CreateBook } from "../../../types/book.types";

export class StudentService {
  async createBookForStudent(data: CreateBook, studentId: string) {
    const { title, author } = data;
    const book = await Book.create({ title, author, students: studentId });
    await Student.findByIdAndUpdate(studentId, { $push: { books: book._id } });

    return book;
  }

  async getBooksOfStudent(studentId: string){
    const books = await Student.find({ student: studentId });
    return books;
  }
}
