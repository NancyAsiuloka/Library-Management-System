import { Router, Request, Response } from "express";
import { StudentController } from "./student.controller";

const studentController = new StudentController();

export const studentRoutes = Router();

studentRoutes.post(
  "/:id/books",
  async (req: Request, res: Response): Promise<void> => {
    await studentController.createBookForStudent(req, res);
  }
);

studentRoutes.get(
  "/:id/books",
  async (req: Request, res: Response): Promise<void> => {
    await studentController.getBooksOfStudent(req, res);
  }
);
