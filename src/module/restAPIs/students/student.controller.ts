import { NextFunction, Request, Response } from "express";
import { CreateBook} from "../../../types/book.types";
import { StudentService } from "./student.service";
import { unauthorized } from "../../../utils/error";
import httpStatus from "http-status";

export interface StudentControllerInterface {
    createBookForStudent: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response<unknown, Record<string, unknown>> | void>;
  getBooksOfStudent: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response<unknown, Record<string, unknown>> | void>;

}

export class StudentController implements StudentControllerInterface {
  private studentService: StudentService;

  constructor() {
    this.studentService = new StudentService();
  }

  async createBookForStudent(
    req: Request,
    res: Response
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const data: CreateBook = req.body;
      const studentId = req.params.id;

      const responseData = await this.studentService.createBookForStudent(data, studentId);

      return res.status(httpStatus.OK).send({
        message: "Book created successfully",
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

  async getBooksOfStudent(
    req: Request,
    res: Response
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const studentId = req.params.id;

      const responseData = await this.studentService.getBooksOfStudent(studentId);

      return res.status(httpStatus.OK).send({
        message: "Books fetched successfully",
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