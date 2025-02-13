import Teacher from "./teacher.schema";
import Student from "../students/student.schema";
import {
  CreateTeacher,
  UpdateTeacher,
  CreateStudentUnderTeacher,
} from "../../../types/book.types";

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
    console.log(data)

    console.log("teacherId", teacherId);

    const student = await Student.create({ name, teacher: teacherId });

    console.log("student", student);
    await Teacher.findByIdAndUpdate(teacherId, {
      // $push: { students: student._id },
      $addToSet: { students: student._id },
    }, );

    return student;
  }

  async studentsOfTeacher(teacherId: string) {
    const students = await Student.find({ teacher: teacherId });
    return students;
  }

  async getTeacherById(teacherId: string) {
    const teacher = await Teacher.findById(teacherId).populate("students");
    return teacher;
  }

  async updateTeacher(teacherId: string, data: UpdateTeacher) {
    const teacher = await Teacher.findByIdAndUpdate(teacherId, data, {
      new: true,
    });
    return teacher;
  }

  async deleteTeacher(teacherId: string) {
    const teacher = await Teacher.findByIdAndDelete(teacherId);
    return teacher;
  }
}
