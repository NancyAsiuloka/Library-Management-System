import { Router, Request, Response } from "express";
import { BookController } from "./book.controller";

const bookController = new BookController();

export const bookRoutes = Router();

bookRoutes.patch(
  "/:bookId",
  async (req: Request, res: Response): Promise<void> => {
    await bookController.updateBook(req, res);
  }
);

bookRoutes.get(
  "/:bookId",
  async (req: Request, res: Response): Promise<void> => {
    await bookController.getBook(req, res);
  }
);
bookRoutes.delete(
  "/:bookId",
  async (req: Request, res: Response): Promise<void> => {
    await bookController.deleteBook(req, res);
  }
);
