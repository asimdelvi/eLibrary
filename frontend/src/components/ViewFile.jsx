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
    <div className="border-gray-700 border-[1px] shadow-xl rounded-xl p-1 flex flex-col items-center">
      <div className="pt-2">
        <button
          disabled={pageNumber <= 1}
          onClick={() => decrementPage()}
          className="border-[1px] border-gray-400 bg-[#b59d9a75] rounded-l-md px-2 leading-relaxed hover:bg-[#b59d9aa8]"
        >
          -
        </button>
        <span className="border-[1px] border-gray-400 bg-[#b59d9aa8] py-1 px-2">
          {pageNumber} / {numPages}
        </span>
        <button
          disabled={pageNumber >= numPages}
          onClick={() => incrementPage()}
          className="border-[1px] border-gray-400 bg-[#b59d9a75] rounded-r-md px-2 leading-relaxed hover:bg-[#b59d9aa8]"
        >
          +
        </button>
      </div>
      <Document file={filePath} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
    </div>
  );
};
