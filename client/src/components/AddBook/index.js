import React, { useState } from "react";

import { useQuery, useMutation } from "@apollo/client";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../../services/apollo-querys";

const AddBook = ({ ...props }) => {
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addBook] = useMutation(addBookMutation);

  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    console.log({
      name,
      genre,
      authorId,
    });

    addBook({
      variables: {
        name,
        genre,
        authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  }

  return (
    <div>
      {loading && <p>Carregando</p>}
      {error && <p>Erro</p>}
      {!loading && !error && (
        <form id="add-book" onSubmit={handleSubmit}>
          <h2>Add book</h2>
          <div>
            <label>
              <span>Name: </span>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              <span>Genre: </span>
              <input
                type="text"
                value={genre}
                onChange={(event) => setGenre(event.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              <span>Author: </span>
              <select onChange={(event) => setAuthorId(event.target.value)}>
                <option value="">Select an author</option>
                {data.authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button>+</button>
        </form>
      )}
    </div>
  );
};

export default AddBook;
