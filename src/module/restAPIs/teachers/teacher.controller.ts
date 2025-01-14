import { NextFunction, Request, Response } from "express";
import { CreateTeacher, CreateStudentUnderTeacher, UpdateTeacher } from "../../../types/book.types";
import { TeacherService } from "./teacher.service";
import { unauthorized } from "../../../utils/error";
import httpStatus from "http-status";

export interface TeacherControllerInterface {
  createTeacher: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response<unknown, Record<string, unknown>> | void>;
  getTeachers: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response<unknown, Record<string, unknown>> | void>;
  createStudent: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response<unknown, Record<string, unknown>> | void>;
  studentsOfTeacher: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response<unknown, Record<string, unknown>> | void>;
  getTeacherById: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response<unknown, Record<string, unknown>> | void>;
  updateTeacher: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response<unknown, Record<string, unknown>> | void>;
  deleteTeacher: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response<unknown, Record<string, unknown>> | void>;
}

export class TeacherController implements TeacherControllerInterface {
  private teacherService: TeacherService;

  constructor() {
    this.teacherService = new TeacherService();
  }

  async createTeacher(
    req: Request,
    res: Response
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const data: CreateTeacher = req.body;

      const responseData = await this.teacherService.createTeacher(data);

      return res.status(httpStatus.OK).send({
        message: "Teacher created successfully",
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

  async getTeachers(
    req: Request,
    res: Response
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const responseData = await this.teacherService.getTeachers();

      return res.status(httpStatus.OK).send({
        message: "Teachers fetched successfully",
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

  async createStudent(
    req: Request,
    res: Response
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const data: CreateStudentUnderTeacher = req.body;
      const teacherId = req.params.id;

      const responseData = await this.teacherService.createStudent(data, teacherId);

      return res.status(httpStatus.OK).send({
        message: "Student created successfully",
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

  async studentsOfTeacher(
    req: Request,
    res: Response
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const teacherId = req.params.id;

      const responseData = await this.teacherService.studentsOfTeacher(teacherId);

      return res.status(httpStatus.OK).send({
        message: "Students fetched successfully",
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

  async getTeacherById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const teacherId = req.params.id;

      const responseData = await this.teacherService.getTeacherById(teacherId);

      return res.status(httpStatus.OK).send({
        message: "Teacher fetched successfully",
        responseData,
      });
    } catch (error: any) {
      console.error("[ERROR]:", error);
      const statusCode = unauthorized.httpCode;
      const message = unauthorized.message;
      return res.status(statusCode).json({
        error: message,
      });
    }
  }
  async updateTeacher(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const data: UpdateTeacher = req.body;
      const teacherId = req.params.id;

      const responseData = await this.teacherService.updateTeacher(teacherId, data);

      return res.status(httpStatus.OK).send({
        message: "Teacher fetched successfully",
        responseData,
      });
    } catch (error: any) {
      console.error("[ERROR]:", error);
      const statusCode = unauthorized.httpCode;
      const message = unauthorized.message;
      return res.status(statusCode).json({
        error: message,
      });
    }
  }
  async deleteTeacher(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const teacherId = req.params.id;

      const responseData = await this.teacherService.deleteTeacher(teacherId);

      return res.status(httpStatus.OK).send({
        message: "Teacher fetched successfully",
        responseData,
      });
    } catch (error: any) {
      console.error("[ERROR]:", error);
      const statusCode = unauthorized.httpCode;
      const message = unauthorized.message;
      return res.status(statusCode).json({
        error: message,
      });
    }
  }



}