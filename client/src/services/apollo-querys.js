import { gql } from "@apollo/client";

const getBooksQuery = gql`
  {
    books {
      id
      name
      genre
      author {
        name
      }
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      id
      name
    }
  }
`;

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
      genre
    }
  }
`;

export { getBooksQuery, getAuthorsQuery, addBookMutation };
