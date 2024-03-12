import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./components/Pagination";
import Users from "./components/Users";
import { USERS_PER_PAGE } from "./utils/constants";

const App = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://randomuser.me/api/?page=1&results=50&nat=us")
      .then((response) => {
        const result = response.data.results;
        setUsers(result);
        setTotalPages(Math.ceil(result.length / USERS_PER_PAGE));
        setIsLoading(false);
      });
  }, []);

  const handleClick = (key) => {
    // Generate an array of page numbers
    const pages = [...Array(totalPages).keys()].map((number) => number + 1);

    // Get the first and last page numbers
    const firstPage = pages[0];
    const lastPage = pages[pages.length - 1];

    // Handle click events based on the key
    if (key === "<") {
      const currentPage = page - 1;
      setPage(currentPage < firstPage ? firstPage : currentPage); // Ensure currentPage is not less than firstPage
    } else if (key === "<<") {
      setPage(firstPage); // Set page to firstPage
    } else if (key === ">") {
      const currentPage = page + 1;
      setPage(currentPage > lastPage ? lastPage : currentPage); // Ensure currentPage is not greater than lastPage
    } else if (key === ">>") {
      setPage(lastPage); // Set page to lastPage
    } else {
      setPage(Number(key)); // Set page to the clicked page number
    }
  };

  return (
    <div>
      <h1>Pagination Demo</h1>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <React.Fragment>
          <Users users={users} page={page} />
          <Pagination
            totalPages={totalPages}
            handleClick={handleClick}
            page={page}
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default App;
