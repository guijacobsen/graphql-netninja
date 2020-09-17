import React from "react";

import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../../services/apollo-querys";

const BookDetails = ({ ...props }) => {
  const { loading, error, data } = useQuery(getBooksQuery);
  return (
    <div id="book-details">
      <h3>Books details</h3>
    </div>
  );
};

export default BookDetails;
