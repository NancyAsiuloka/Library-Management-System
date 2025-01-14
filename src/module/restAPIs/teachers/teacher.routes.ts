import { Router, Request, Response, NextFunction } from "express";
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
  "/:teacherId/students",
  async (req: Request, res: Response): Promise<void> => {
    await teacherController.createStudent(req, res);
  }
);

teacherRoutes.get(
  "/:teacherId/students",
  async (req: Request, res: Response): Promise<void> => {
    await teacherController.studentsOfTeacher(req, res);
  }
);
teacherRoutes.get(
  "/:teacherId",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await teacherController.getTeacherById(req, res, next);
  }
);
teacherRoutes.patch(
  "/:teacherId",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await teacherController.updateTeacher(req, res, next);
  }
);
teacherRoutes.delete(
  "/:teacherId",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await teacherController.deleteTeacher(req, res, next);
  }
);
