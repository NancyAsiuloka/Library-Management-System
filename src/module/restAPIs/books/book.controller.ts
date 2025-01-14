import { NextFunction, Request, Response } from "express";
import { UpdateBook} from "../../../types/book.types";
import { BookService } from "./book.service";
import { unauthorized } from "../../../utils/error";
import httpStatus from "http-status";

export interface BookControllerInterface {
    updateBook: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response<unknown, Record<string, unknown>> | void>;
  getBook: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response<unknown, Record<string, unknown>> | void>;
  deleteBook: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response<unknown, Record<string, unknown>> | void>;

}

export class BookController implements BookControllerInterface {
  private bookService: BookService;

  constructor() {
    this.bookService = new BookService();
  }

  async updateBook(
    req: Request,
    res: Response
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const data: UpdateBook = req.body;
      const bookId = req.params.id;

      const responseData = await this.bookService.updateBook(data, bookId);

      return res.status(httpStatus.OK).send({
        message: "Book updated successfully",
        responseData,
      });
    } catch (error) {
      console.error("[ERROR]:", error);
      const statusCode = unauthorized.httpCode;
      const message = unauthorized.message;
      return res.status(statusCode).json({
        error: message,
      });
    }
  }

  async getBook(
    req: Request,
    res: Response
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const bookId = req.params.id;

      const responseData = await this.bookService.getBook(bookId);

      return res.status(httpStatus.OK).send({
        message: "Book fetched successfully",
        responseData,
      });
    } catch (error) {
      console.error("[ERROR]:", error);
      const statusCode = unauthorized.httpCode;
      const message = unauthorized.message;
      return res.status(statusCode).json({
        error: message,
      });
    }
  }
  async deleteBook(
    req: Request,
    res: Response
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const bookId = req.params.id;

      const responseData = await this.bookService.deleteBook(bookId);

      return res.status(httpStatus.OK).send({
        message: "Book deleted successfully",
        responseData,
      });
    } catch (error) {
      console.error("[ERROR]:", error);
      const statusCode = unauthorized.httpCode;
      const message = unauthorized.message;
      return res.status(statusCode).json({
        error: message,
      });
    }
  }
}