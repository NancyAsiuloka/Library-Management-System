import Teacher from '../../restAPIs/teachers/teacher.schema';
import Student from '../../restAPIs/students/student.schema';

export const teacherResolvers = {
  Query: {
    teachers: async () => {
      try {
        return await Teacher.find().populate('students');
      } catch (error) {
        throw new Error(`Error fetching teachers: ${error.message}`);
      }
    },
  },
  Teacher: {
    students: async (teacher: any) => {
      try {
        return await Student.find({ teacher: teacher.id });
      } catch (error) {
        throw new Error(`Error fetching students for teacher: ${error.message}`);
      }
    },
  },
};
