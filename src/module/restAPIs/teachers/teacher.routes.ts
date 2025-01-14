import { Router, Request, Response } from "express";
import { TeacherController } from "./teacher.controller";

const teacherController = new TeacherController();

export const teacherRoutes = Router();

teacherRoutes.post(
  "/",
  async (req: Request, res: Response): Promise<void> => {
    await teacherController.createTeacher(req, res);
  }
);

teacherRoutes.get(
  "/",
  async (req: Request, res: Response): Promise<void> => {
    await teacherController.getTeachers(req, res);
  }
);

teacherRoutes.post(
  "/:id/students",
  async (req: Request, res: Response): Promise<void> => {
    await teacherController.createStudent(req, res);
  }
);

teacherRoutes.get(
  "/:id/students",
  async (req: Request, res: Response): Promise<void> => {
    await teacherController.studentsOfTeacher(req, res);
  }
);
