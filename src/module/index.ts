import { Router } from "express";
import { bookRoutes } from "./restAPIs/books/book.routes";
import { teacherRoutes } from "./restAPIs/teachers/teacher.routes";
import { studentRoutes } from "./restAPIs/students/student.routes";

const routes = Router();

routes.use("/teachers", teacherRoutes);
routes.use("/students", studentRoutes);
routes.use("/books", bookRoutes);

export default routes;