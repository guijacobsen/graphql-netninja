import React from "react";

import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../../services/apollo-querys";

const BookList = ({ ...props }) => {
  const { loading, error, data } = useQuery(getBooksQuery);
  return (
    <div id="book-list">
      <h2>List books</h2>
      {loading && <p>Carregando</p>}
      {error && <p>Erro</p>}
      {!loading && !error && (
        <ul>
          {data.books.map((book) => (
            <li key={book.id}>
              <p>Name: {book.name}</p>
              <p>Genre: {book.genre}</p>
              <p>Author: {book.author.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
