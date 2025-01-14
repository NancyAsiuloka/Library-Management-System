import { mergeResolvers } from '@graphql-tools/merge';
import { teacherResolvers } from '../graphql/resolvers/teacher.resolvers';
import { studentResolvers } from '../graphql/resolvers/student.resolvers';
import { bookResolvers } from '../graphql/resolvers/book.resolvers';

import { IResolvers } from '@graphql-tools/utils';

export const resolvers: IResolvers = mergeResolvers([
  teacherResolvers,
  studentResolvers,
  bookResolvers,
]);
