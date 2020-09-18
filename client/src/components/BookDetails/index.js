import React from "react";

import { useQuery } from "@apollo/client";
import { getBookQuery } from "../../services/apollo-querys";

const BookDetails = ({ ...props }) => {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id: props.bookId },
  });

  if (error) {
    console.log("-- error : ", error);
  }
  console.log("-- data : ", data);

  return !data?.book ? null : (
    <div id="book-details">
      <h3>Books details</h3>
      {/* {loading && <p>Carregando</p>}
      {error && <p>Erro</p>} */}
      {!loading && !error && (
        <div>
          <p>Name: {data.book.name}</p>
          <p>Genre: {data.book.genre}</p>
          <p>Author: {data.book.author.name}</p>
          <div>
            <p>All author's books:</p>
            <ul>
              {data.book.author.books.map((book) => (
                <li key={book.id}>
                  <p>Name: {book.name}</p>
                  <p>Genre: {book.genre}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
