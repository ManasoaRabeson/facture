// import { useEffect } from "react";
// import useApi from "../../../Hooks/Api";

export function SearchBar({  data,filters, setFilters }) {

  const handleReset = () => {
    setFilters({
      idEntreprise: 0,
      idInvoiceStatus: 0,
      invoice_number: '',
      invoice_date_pm: ''
    });
  };
  // if (loading) return  <div className="flex items-center justify-center h-10"></div>;
  return (
      <div className="flex items-center justify-center h-10">
          <form 
            className="flex gap-4 px-3 py-1 rounded-full bg-slate-50"
          >
              {/* Champ Entreprise */}
              <div className="flex items-center w-1/5 px-2 border-r-2">
                  <div><i className="text-gray-600 fa-solid fa-building"></i></div>
                  <select 
                      value={filters.idEntreprise}
                      onChange={(e) => setFilters(prev => ({ ...prev, idEntreprise: Number(e.target.value) }))}
                      name="idEntreprise"
                      className="w-full p-2 bg-transparent border-[1px] rounded-md outline-none border-gray-50/5"
                  >
                      <option value={0}>Entreprise</option>
                      {data?.entreprises &&
                          Object.values(data.entreprises)
                              .sort((a, b) => {
                                  const nameA = (a.etp_name ?? a.customerName ?? "").toLowerCase();
                                  const nameB = (b.etp_name ?? b.customerName ?? "").toLowerCase();
                                  return nameA.localeCompare(nameB);
                              })
                              .map((entreprise, index) => (
                                  <option 
                                      key={index}
                                      value={entreprise.idEtp ?? entreprise.idCfp ?? entreprise.idCustomer}
                                  >
                                      {entreprise.etp_name ?? entreprise.customerName}
                                  </option>
                              ))
                      }
                  </select>
              </div>
  
              {/* Champ Statut */}
              <div className="flex items-center w-1/5 px-2 border-r-2">
                  <div><i className="text-gray-600 fa-solid fa-diagram-project"></i></div>
                  <select 
                      name="invoice_status"
                      value={filters.idInvoiceStatus}
                      onChange={(e) => setFilters(prev => ({ ...prev, idInvoiceStatus: Number(e.target.value) }))}
                      className="w-full p-2 bg-transparent border-[1px] rounded-md outline-none border-gray-50/5"
                  >
                      <option value={0}>Statut</option>
                      {data?.statuses?.map((status, index) => (
                          <option key={index} value={status.idInvoiceStatus}>
                              {status.invoice_status_name}
                          </option>
                      ))}
                  </select>
              </div>
  
              {/* Champ Numéro */}
              <div className="flex items-center w-1/5 px-2 border-r-2">
                  <div><i className="text-gray-600 fa-solid fa-arrow-down-9-1"></i></div>
                  <input 
                      type="text" 
                      name="invoice_number" 
                      value={filters.invoice_number}
                      onChange={(e) => setFilters(prev => ({ ...prev, invoice_number: e.target.value }))}
                      placeholder="Numéro de facture" 
                      className="w-full p-2 text-gray-700 bg-transparent outline-none" 
                  />
              </div>
  
              {/* Champ Date */}
              <div className="flex items-center w-1/5 px-2 border-r-2">
                  <div><i className="text-gray-600 bi bi-calendar-date-fill"></i></div>
                  <input 
                      type="date" 
                      name="invoice_date_pm"
                      value={filters.invoice_date_pm}
                      onChange={(e) => setFilters(prev => ({ ...prev, invoice_date_pm: e.target.value }))}
                      className="w-full p-2 bg-transparent outline-none" 
                  />
              </div>
  
              <div className="flex items-center justify-center gap-2">
                  <button
                      type="button"
                      onClick={ handleReset}
                      className="w-full p-2 text-gray-700 rounded-md hover:bg-white"
                  >
                      <i className="text-gray-600 fa-solid fa-rotate-right"></i>
                  </button>
              </div>
          </form>
      </div>
  );
}