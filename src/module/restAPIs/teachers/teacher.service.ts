import Teacher from "./teacher.schema";
import Student from "../students/student.schema";
import { CreateTeacher, CreateStudentUnderTeacher } from "../../../types/book.types";

export class TeacherService {
  async createTeacher(data: CreateTeacher) {
    const { name, email, students } = data;
    const teacher = await Teacher.create({ name, email, students });

    return teacher;
  }

  async getTeachers() {
    const teachers = await Teacher.find().populate("students");
    return teachers;
  }

  async createStudent(data: CreateStudentUnderTeacher, teacherId: string) {
  const { name } = data;

  const student = await Student.create({ name, teacher: teacherId });
  await Teacher.findByIdAndUpdate(teacherId, { $push: { students: student._id } });

    return student;
  }

  async studentsOfTeacher(teacherId: string) {
    const students = await Student.find({ teacher: teacherId });
    return students;
  }

}
