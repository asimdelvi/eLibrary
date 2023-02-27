import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

export const ViewFile = ({ filePath }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const incrementPage = () => {
    if (numPages > pageNumber) setPageNumber((prevPage) => prevPage + 1);
  };

  const decrementPage = () => {
    if (pageNumber > 1) setPageNumber((prevPage) => prevPage - 1);
  };

  return (
    <div>
      <Document file={filePath} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        <button disabled={pageNumber <= 1} onClick={() => decrementPage()}>
          -
        </button>
        {pageNumber} / {numPages}
        <button
          disabled={pageNumber >= numPages}
          onClick={() => incrementPage()}
        >
          +
        </button>
      </p>
    </div>
  );
};
