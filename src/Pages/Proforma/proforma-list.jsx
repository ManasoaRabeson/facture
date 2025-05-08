import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/fr';
import { TousProforma } from "./proforma-all";
import { Converti } from "./Converti";
import { Brouillons } from "./Brouillons";
import { Spinner } from "../../Components/spinner";
import useApi from "../../Hooks/Api";
dayjs.extend(localizedFormat);
dayjs.locale('fr');
export function ProformaList(){
return(
<>
<div className="flex flex-col w-full h-full gap-4 ">
    <div className="sm:w-[1024px] lg:w-full h-full bg-white">
      <div className="flex flex-col w-full gap-6">
        <FilterNavBar />
      </div>
    </div>
</div>
</>
)}

function FilterNavBar(){
    // const [currentPage , setCurrentPage] = useState(1);
    const [nav,setNav] = useState("proforma-tous");
    //const [data, setData] = useState([]);
    const [filters, setFilters] = useState({
        idEntreprise: 0,
        idInvoiceStatus: 0,
        invoice_number: '',
        invoice_date_pm: ''
      });
      const { loading,data, callApi } = useApi();
      useEffect(() => {
        callApi('/cfp/factureProfo').catch(err => console.error("Erreur API:", err));
      }, [callApi]);
    if (loading) return (
        <Spinner/>
    );
    console.log(data);
    
    // const actionClick = (formData) => {
    //     setFilters({
    //       idEntreprise: Number(formData.get('idEntreprise')),
    //       idInvoiceStatus: Number(formData.get('invoice_status')),
    //       invoice_number: formData.get('invoice_number'),
    //       invoice_date_pm: formData.get('invoice_date_pm')
    //     });
    //   };
    return(
        <>
        <ProformaFilter data={data} filters={filters} setFilters={setFilters}/>
        <TabFacture data={data} actif={nav} setNav={setNav}/>
        <ProformaResult nav={nav} filters={filters} />
        </>
    )
}
function ProformaFilter({data,filters,setFilters}){
  const handleReset = () => {
    setFilters({
      idEntreprise: 0,
      idInvoiceStatus: 0,
      invoice_number: '',
      invoice_date_pm: ''
    });
  };
    return(
        <>
        <div className="flex items-center justify-center h-10 mt-3">
            <form  
            //action={actionClick} 
            className="flex gap-4 px-3 py-1 border rounded-full bg-slate-50">
                <div className="flex items-center w-1/5 px-2 border-r-2">
                    <div><i className="fa-solid fa-building"></i></div>
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
                <div className="flex items-center w-1/5 px-2 border-r-2">
                    <div><i className="fa-solid fa-diagram-project"></i></div>
                    <select name="invoice_status"
                        className="w-full p-2 bg-transparent border-[1px] rounded-md outline-none border-gray-50/5"
                        value={filters.idInvoiceStatus}
                        onChange={(e) => setFilters(prev => ({ ...prev, idInvoiceStatus: Number(e.target.value) }))}
                        >
                        <option value="">Statut</option>
                        {data?.statuses?.map((status, index) => (
                        <option key={index} value={status.idInvoiceStatus}>
                            {status.invoice_status_name}
                        </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center w-1/5 px-2 border-r-2">
                    <div><i className="fa-solid fa-arrow-down-9-1"></i></div>
                    <input 
                    value={filters.invoice_number}
                     onChange={(e) => setFilters(prev => ({ ...prev, invoice_number: e.target.value }))}
                    type="text" name="invoice_number" placeholder="Numéro de facture"
                        className="w-full p-2 text-gray-700 bg-transparent outline-none" />
                </div>
                <div className="flex items-center w-1/5 px-2 border-r-2">
                    <div><i className="bi bi-calendar-date-fill"></i></div>
                    <input 
                      value={filters.invoice_date_pm}
                      onChange={(e) => setFilters(prev => ({ ...prev, invoice_date_pm: e.target.value }))}
                    type="date" name="invoice_date_pm" className="w-full p-2 bg-transparent outline-none"
                        />
                </div>
                <div className="flex items-center justify-center gap-2">
                    {/* <button type="submit" className="flex items-center w-full gap-2 p-2 text-gray-700 rounded-md hover:bg-white"
                        title="Flitrer">
                        <i className="fa-solid fa-arrow-down-wide-short"></i>Filtrer
                    </button> */}
                    <a  onClick={ handleReset} className="w-full p-2 text-gray-700 rounded-md hover:bg-white"
                        title="Reset">
                        <i className="fa-solid fa-rotate-right"></i>
                    </a>
                </div>
            </form>
        </div>
        </>
    )
}
function TabFacture({data,actif,setNav}){
    return(
        <>
            <div className="flex flex-row gap-9 items-center bg-gray-200 h-[1px] px-4 relative right-0 my-3">
                <div className="flex items-center justify-center w-full">
                    <div className="w-max">
                        <div className="tab-slider--nav">
                            <ul className="tab-slider--tabs flex list-none flex-nowwrap min-w-[340px]:ml-[200px] items-center rounded-xl bg-gray-100 p-1" role="list">
                                <li id="all" tab="tab2"  className={`items-center text-center btnTab ${actif === "proforma-tous" ? ' bg-white font-semibold rounded-xl shadow-sm' : ''}`}
                                    >
                                    <a className="tracking-wide  gap-2 flex w-max duration-200 cursor-pointer items-center text-md justify-center rounded-lg border-0 bg-inherit hover:text-inherit px-3 py-1 transition-all ease-in-out"
                                    onClick={()=>setNav("proforma-tous")}
                                    >
                                    Toutes les proforma
                                    <div className="flex items-center justify-center w-12 text-sm text-gray-600 bg-white rounded-full h-7">
                                        { data.countInvoices }</div>
                                    </a>
                                </li>
                                <li id="all" tab="tab2"  className={`items-center text-center btnTab ${actif === "converti" ? ' bg-white font-semibold rounded-xl shadow-sm' : ''}`}
                                    >
                                    <a className="tracking-wide  gap-2 flex w-max duration-200 cursor-pointer items-center text-md justify-center rounded-lg border-0 bg-inherit hover:text-inherit px-3 py-1 transition-all ease-in-out"
                                    onClick={()=>setNav("converti")}
                                    >
                                    Converti
                                    <div className="flex items-center justify-center w-12 text-sm text-gray-600 bg-white rounded-full h-7">
                                    { data.countInvoicesConvertis }
                                    </div>
                                    </a>
                                </li>
                                <li id="all" tab="tab2"  className={`items-center text-center btnTab ${actif === "brouillons" ? ' bg-white font-semibold rounded-xl shadow-sm' : ''}`}
                                    >
                                    <a className="tracking-wide gap-2 flex w-max duration-200 cursor-pointer items-center text-md justify-center rounded-lg border-0 bg-inherit hover:text-inherit px-3 py-1 transition-all ease-in-out"
                                    onClick={()=>setNav("brouillons")}
                                    >
                                    Brouillons
                                    <div className="flex items-center justify-center w-12 text-sm text-gray-600 bg-white rounded-full h-7">
                                    { data.countInvoicesDraft  }
                                    </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
function ProformaResult({nav,filters}){
    // const [currentPage , setCurrentPage] = useState(1);
    // const [idProforma,setIdProforma] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
   

    // const [currentPage, setCurrentPage] = useState(1);
    // const [lastPage, setLastPage] = useState(1);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`http://127.0.0.1:8000/api/cfp/factureProfo`,{
            params : {
                idEntreprise :filters.idEntreprise,
                invoice_status :filters.idInvoiceStatus,
                invoice_number : filters.invoice_number,
                "invoice_date_pm" :filters.invoice_date_pm
            },
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
              }
     
          });
          setData(res.data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [filters]);
  
    if (loading) return (
      <div className="flex justify-center items-center h-10">
        <div className="animate-spin text-purple-500"></div>
      </div>
    );
    const renderPage = () => {
      switch(nav){
         case "proforma-tous" :
         return <TousProforma filters={filters} />
         case "converti" : 
         return <Converti data={data}/>
         case "brouillons" : 
         return <Brouillons data={data} setData={setData}/>
      } 
    };
    
    return(
        <>
         <main>{renderPage()}</main>     
        </>
    )
}