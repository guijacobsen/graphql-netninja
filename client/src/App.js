import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
const App = ({ ...props }) => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Ninja's Reading List</h1>

        <AddBook />
        <BookList />
      </div>
    </ApolloProvider>
  );
};

export default App;
