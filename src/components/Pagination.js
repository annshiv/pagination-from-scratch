import React from "react";

const Pagination = ({ totalPages, handleClick, page }) => {
  // Generate an array of page numbers
  const pages = [...Array(totalPages).keys()].map((number) =>
    String(number + 1)
  );

  // Add navigation buttons for first, previous, next, and last pages
  const updatedPages = ["<<", "<", ...pages, ">", ">>"];

  return (
    <div className="numbers">
      {updatedPages.map((key) => (
        <a
          key={key}
          href="/#"
          onClick={() => handleClick(key)} // Handle click events
          className={`${page === Number(key) && "active"}`} // Apply 'active' class if page is active
        >
          {key}
        </a>
      ))}
    </div>
  );
};

export default Pagination;
