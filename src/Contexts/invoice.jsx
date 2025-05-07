import { createContext, useState, useEffect } from "react";
export const InvoiceContext = createContext();
export const InvoiceProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [idInvoice, setIdInvoice] = useState(null);
  const [pageRecent, setPageRecent] = useState();

  useEffect(() => {
    if (currentPage !== 6 ) {
      setPageRecent(currentPage);
    }
  }, [currentPage]);

  return (
    <InvoiceContext.Provider value={{ currentPage, setCurrentPage, idInvoice, setIdInvoice, pageRecent }}>
      {children}
    </InvoiceContext.Provider>
  );
};
