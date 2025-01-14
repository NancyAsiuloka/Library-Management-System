import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  # Type definitions for Teacher
  type Teacher {
    id: ID!
    name: String!
    students: [Student!] # A teacher can have multiple students
  }

  # Type definitions for Student
  type Student {
    id: ID!
    name: String!
    books: [Book!] # A student can have multiple books
  }

  # Type definitions for Book
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  # Query definitions
  type Query {
    # Fetch all teachers
    teachers: [Teacher!]!

    # Fetch all students
    students: [Student!]!

    # Fetch all books
    books: [Book!]!

    # Fetch a single book by its ID
    book(id: ID!): Book
  }

  # Mutation definitions
  type Mutation {
    # Create a new book
    createBook(title: String!, author: String!): Book!

    # Update an existing book by ID
    updateBook(id: ID!, title: String, author: String): Book!

    # Delete a book by ID
    deleteBook(id: ID!): Book!
  }
`;
