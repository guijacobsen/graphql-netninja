import React, { useState } from "react";

import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../../services/apollo-querys";
import BookDetails from "../BookDetails";

const BookList = ({ ...props }) => {
  const { loading, error, data } = useQuery(getBooksQuery);

  const [selected, setSelected] = useState(null);

  return (
    <div id="book-list">
      <h2>List books</h2>
      {loading && <p>Carregando</p>}
      {error && <p>Erro</p>}
      {!loading && !error && (
        <>
          <ul>
            {data.books.map((book) => (
              <li key={book.id} onClick={(event) => setSelected(book.id)}>
                <p>Name: {book.name}</p>
                <p>Genre: {book.genre}</p>
                <p>Author: {book.author.name}</p>
              </li>
            ))}
          </ul>
          <BookDetails bookId={selected} />
        </>
      )}
    </div>
  );
};

export default BookList;
