import Book from '../../restAPIs/books/book.schema';
import { getAsync, setexAsync, delAsync } from '../../../utils/redis';

export const bookResolvers = {
  Query: {
    books: async () => {
      try {
        const cacheKey = 'books';
        const cachedBooks = await getAsync.get(cacheKey);

        if (cachedBooks) {
          return JSON.parse(cachedBooks);
        }

        const books = await Book.find();
        await setexAsync.set(cacheKey, JSON.stringify(books), 'EX', 3600); // Cache for 1 hour

        return books;
      } catch (error) {
        throw new Error(`Error fetching books: ${error.message}`);
      }
    },
  },
  Mutation: {
    createBook: async (_: any, { title, author }: { title: string, author: string }) => {
      try {
        const newBook = await Book.create({ title, author });
        await delAsync.del('books');
        return newBook;
      } catch (error) {
        throw new Error(`Error creating book: ${error.message}`);
      }
    },
    updateBook: async (_: any, { id, title, author }: { id: string, title: string, author: string }) => {
      try {
        const updatedBook = await Book.findByIdAndUpdate(
          id,
          { title, author },
          { new: true }
        );
        if (!updatedBook) throw new Error('Book not found');
        await delAsync.del('books');
        return updatedBook;
      } catch (error) {
        throw new Error(`Error updating book: ${error.message}`);
      }
    },
    deleteBook: async (_: any, { id }: { id: string }) => {
      try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) throw new Error('Book not found');
        await delAsync.del('books');
        return deletedBook;
      } catch (error) {
        throw new Error(`Error deleting book: ${error.message}`);
      }
    },
  },
};
