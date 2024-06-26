import React, { useState, useEffect } from "react";
// import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { Document, Page, pdfjs } from "react-pdf";
import type { ViewFileProps } from "../types";

export const ViewFile: React.FC<ViewFileProps> = ({ filePath }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  });

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const incrementPage = () => {
    if (numPages > pageNumber) setPageNumber((prevPage) => prevPage + 1);
  };

  const decrementPage = () => {
    if (pageNumber > 1) setPageNumber((prevPage) => prevPage - 1);
  };

  return (
    <div className="border-black border-2 rounded-3xl w-fit p-1 pb-3 flex flex-col items-center bg-white overflow-hidden">
      <div className="border-black rounded-3xl border-2">
        <button
          disabled={pageNumber <= 1}
          onClick={() => decrementPage()}
          className="text-lg px-2 leading-relaxed hover:bg-[#DDDDDD] rounded-l-3xl border-2 border-white"
        >
          &larr;
        </button>
        <span className="py-1 px-2 bg-[#DDDDDD] border-x-2 border-dashed border-black">
          {pageNumber} / {numPages}
        </span>
        <button
          disabled={pageNumber >= numPages}
          onClick={() => incrementPage()}
          className="text-lg px-2 leading-relaxed hover:bg-[#DDDDDD] rounded-r-3xl border-2 border-white"
        >
          &rarr;
        </button>
      </div>
      <Document file={filePath} onLoadSuccess={onDocumentLoadSuccess}>
        <Page
          pageNumber={pageNumber}
          renderTextLayer={false}
          className="react-pdf_customClass"
        />
      </Document>
    </div>
  );
};
