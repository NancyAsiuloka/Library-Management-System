import Book from "../books/book.schema";
import Student from "../students/student.schema";
import { UpdateBook } from "../../../types/book.types";

export class BookService {
  async getBook(bookId: string) {
    const book = await Book.findById({ id: bookId });
    if (!book) {
      throw Error("Not found");
    }
    return book;
  }

  async updateBook(data: UpdateBook, bookId: string) {
    const { title, author } = data;
    const book = await Book.findByIdAndUpdate(
      bookId,
      { title, author },
      { new: true }
    );
    if (!book) throw Error("Book not found");
    return book;
  }

  async deleteBook(bookId: string){
    const book = await Book.findByIdAndDelete(bookId);
    if (!book) throw Error("Book not found");

    await Student.updateOne({ books: bookId }, { $pull: { books: bookId } });

    return book;
  }
}
