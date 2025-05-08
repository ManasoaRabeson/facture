import axios from "axios";
import {useContext, useEffect, useState } from "react";
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/fr';
import { LineProgress } from "../../../Components/line-progress";
import {Pagination} from "../../Pagination";
dayjs.extend(localizedFormat);
import {DropdownButton} from "../../../Components/Dropdown/dropdown-boutton";
import DropdownItem from "../../../Components/Dropdown/dropdown-item";
import { PaiementModal } from "../../../Components/Modals/paiment-modal";
import { handleApprouve, handleCancel, handleSendEmail } from "../../../Services/service-action";
import { EntreprisePopoverCell } from "./liste-facture";
import { InvoiceContext } from "../../../Contexts/invoice";
dayjs.locale('fr');
export function ResultCherche({filters,idInvoice}){
  const { isPaid} = useContext(InvoiceContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // optionnel
    const [error, setError] = useState(null);     // optionnel
    
    //pagination
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    //renitialiser le pagination si la page change
    useEffect(()=>{
      setPage(1)
    },[idInvoice]);
// console.log(sessionStorage.getItem('token'));

    //liste de facture par idPage
    useEffect(() => {
      const fetchData = async (page, idInvoice) => {
        try {
          setLoading(true);
          const res = await axios.get(`http://127.0.0.1:8000/api/cfp/factures/id/${idInvoice}`, {
            params: {
              page,
              idEntreprise: filters.idEntreprise,
              invoice_status: filters.idInvoiceStatus,
              invoice_number: filters.invoice_number,
              "invoice_date_pm": filters.invoice_date_pm
            },
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
              }
            
          });
          // Ajouter "remaining" pour chaque facture
          const updatedInvoices = res.data.invoices.data.map(invoice => {
            const total = Number(invoice.invoice_total_amount) || 0;
            const paid = Array.isArray(invoice.payments)
              ? invoice.payments.reduce((acc, p) => acc + (Number(p.amount) || 0), 0)
              : 0;
            const remaining = total - Number(paid);
            return { ...invoice, remaining };
          });
    
          setData({
            ...res.data,
            invoices: {
              ...res.data.invoices,
              data: updatedInvoices
            }
          });
    
          setLastPage(res.data.invoices.last_page);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
    
      fetchData(page, idInvoice);
    }, [filters.idEntreprise, filters.idInvoiceStatus, filters.invoice_number, filters.invoice_date_pm, page, idInvoice,isPaid]);
    if (loading) return <LineProgress/>
    if (error) return <p>Erreur : {error.message}</p>;
    // let vari = JSON.parse(sessionStorage.getItem("user")).id;
    // console.log(data);
    
    return(
            <>
              <div id="contentInvoice" className="">
                  <div className="flex flex-col gap-2" id="subContentInvoice">
                      <table id="invoiceTable"> 
                      <thead>
                          <tr id="" className="border-b-[1px] border-gray-100 hover:bg-gray-50 duration-150 cursor-pointer ">
                          <th className="p-2 font-semibold text-base text-gray-500 ">#</th>
                              <th className="p-2 font-semibold text-base text-gray-500 ">Statut</th>
                              <th className="p-2 font-semibold text-base text-gray-500 ">Echue</th>
                              <th className="p-2 font-semibold text-base text-gray-500 ">Date d'échéance</th>
                              <th className="p-2 font-semibold text-base text-gray-500 ">Date facture</th>
                              <th className="p-2 font-semibold text-base text-gray-500 text-center">N° Facture</th>
                              <th className="p-2 font-semibold text-base text-gray-500 ">Entreprise</th>
                              <th className="p-2 font-semibold text-base text-gray-500 text-right">Montant dû</th>
                              <th className="p-2 font-semibold text-base text-gray-500 text-right">Restant dû</th>
                              <th className="p-2 font-semibold text-base text-gray-500 text-right">Actions</th>
                          </tr>
                          </thead>
                          <tbody>
                          {data.invoices.data.length <= 0 ? (
                              <tr className="p-2 hover:bg-gray-50">
                                <td className='p-2 text-base text-gray-500' colSpan='9'>
                                  <p className="text-lg font-normal text-center text-gray-500">
                                    Vous n'avez pas de facture pour l'instant
                                  </p>
                                </td>
                              </tr>
                          ):(
                            data.invoices.data.map((invoice,index) => (
                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 duration-150 cursor-pointer">
                              <td className="p-2 text-base text-gray-500 ">
                                {index+1}
                              </td>
                              <td className="p-2 text-base text-gray-500 ">
                              <span
                                className={
                                   `px-3 py-1 text-sm text-white bg-${invoice.status_color } rounded-md`}
                                  >
                                  {invoice.status?.invoice_status_name || ''}
                              </span>
                              </td>
                              <td className="p-2 text-base text-gray-500">
                                  {new Date(invoice.invoice_date_pm) < new Date() &&
                                    invoice.invoice_status !== 4 &&
                                    invoice.invoice_status !== 1 &&
                                    invoice.invoice_status !== 9 ? (
                                    <span className="px-3 py-1 text-sm text-gray-500 bg-gray-100 rounded-md">
                                        Echue
                                    </span>
                                  ) : null}
                                </td>
                                <td className="p-2 text-base text-gray-500 ">
                                    {dayjs(invoice.invoice_date_pm).format('D MMMM YYYY')}
                                </td>
                                <td className="p-2 text-base text-gray-500">
                                    {dayjs(invoice.invoice_date).format('D MMMM YYYY')}
                                </td>
                                <td className="text-center text-gray-500">
                                    {invoice.invoice_number}
                                </td>
                                <EntreprisePopoverCell invoice={invoice}/>
                                <td className="text-right text-gray-500">
                                Ar {Number(invoice.invoice_total_amount).toLocaleString('fr-FR')}
                                </td>
                                <td id={`remainingAmount_${invoice.idInvoice}`} className="text-right text-gray-500">
                                  Ar {Number(invoice.remaining).toLocaleString('fr-FR')}
                                </td>
                              <InvoiceActions invoice={invoice}   data={data} setData={setData} index={index}/>
                              </tr>     
                              ))       
                          )} 
                          </tbody>
                      </table>
                      {lastPage > 1 && (
                      <Pagination
                        setCurrentPage={setPage}
                        lastPage={lastPage}
                        currentPage={page}
                      />
                    )}    
                </div>
              </div>
            </>
    )
  }
  function InvoiceActions({invoice,data,setData,index}){
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false)
    // Fonction pour fermer la modale
    const closeModal = () => setIsModalOpen(false);
    
    // Fonction pour ouvrir la modale
    const openModal = () => setIsModalOpen(true);
    const openOffcanvas = (invoice) => {
      setSelectedInvoice(invoice);
    };
  
    const closeOffcanvas = () => {
      setSelectedInvoice(null);
    };
 //console.log(data);
 
    return (
      <>{
          (invoice.invoice_status === 1 || invoice.invoice_status === 2) && (
            <td className="flex justify-end">
              <div className="flex flex-1 btn-group dropdown w-max">
                <div className="inline-flex items-center justify-end w-full">
                {invoice.invoice_status === 1 && (          
                    <button
                    onClick={()=>handleApprouve(invoice.idInvoice,setData,index)}
                    className="text-base text-white px-3 py-1 hover:bg-rose-400 bg-rose-500 transition duration-200 outline-none border-[1px] capitalize"
                    >
                    Approuver
                    </button>
                  )}
                  {invoice.invoice_status === 2 && (
                      <button
                      onClick={()=>handleSendEmail(invoice.idInvoice,setData,index)}
                      className="text-base text-white px-3 py-1 hover:bg-teal-500 bg-teal-600 transition duration-200 outline-none border-[1px] capitalize"
                      >
                      Envoyer
                      </button>
                  )}
                  <button
                    type="button"
                    className={
                      invoice.invoice_status === 1
                        ? "text-white px-3 py-1 h-full hover:bg-rose-500 bg-rose-500 transition-all border-none dropdown-toggle focus:bg-rose-500 border-[1px]"
                        : "text-white px-3 py-1 h-full hover:bg-teal-600 bg-teal-600 transition-all border-none dropdown-toggle focus:bg-teal-600 border-[1px]"
                    }
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                  <span className="visually-hidden">Toggle Dropdown</span>
                  </button>
                  <ul className="bg-white border-none shadow-md dropdown-menu">
                  <DropdownItem type="lien" titre="Voir" idInvoice={invoice.idInvoice} 
                 
                  />
                  {invoice.invoice_status === 1 && (
                  <DropdownItem type="lien" titre="Editer" nature="EditerInvoice" idInvoice={invoice.idInvoice}
                    />
                  )}
                  <DropdownItem type="lien" titre="Exporter en PDF" idInvoice={invoice.idInvoice} />
                  <li className="z-50">
                   
                    <button
                    onClick={()=>handleCancel(invoice.idInvoice,setData,index)}
                    className="text-base text-gray-600 transition duration-150 cursor-pointer dropdown-item hover:bg-gray-50 focus:bg-gray-500 focus:text-white"
                    >
                    Annuler
                    </button>
                  </li>
                  <DropdownItem type="lien" titre="Supprimer" 
                  data={data} setData={setData} idInvoice={invoice.idInvoice} />
                  {invoice.invoice_status === 2 && (
                  <>
                    <DropdownItem type="drawer" titre="Historique de paiement"drawerClick={() =>openOffcanvas(invoice)} />
                  <li className="btn-group">
                  <button onClick={openModal}
                  className="text-base text-gray-600 transition duration-150 dropdown-item hover:bg-gray-50 focus:bg-gray-500 focus:text-white"
                  >
                  Paiement
                  </button>

                  </li>
                  </>
                  
                  )}

                </ul>
                </div>
                <div
                  className="modal fade"
                  id={`record${invoice.idInvoice}`}
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex={-1}
                >
                  {/* Include modal content here */}
                </div>
              </div>
              {isModalOpen && (
                  <div  className="modal fade show" style={{ display: "block" }} >
                  <div>
                    <PaiementModal invoice={invoice} data={data}  closeModal={closeModal}
                    setData={setData} index={index}/>
                    </div>
                  </div>
                  )}
            </td>
          )}
        {(invoice.invoice_status === 4 || invoice.invoice_status === 9) && (
          <td className="p-2 text-base text-gray-500 flex justify-end">
          <DropdownButton type="simple" first="Voir" idInvoice={invoice.idInvoice} >
            <DropdownItem type="lien" titre="Exporter en PDF" idInvoice={invoice.idInvoice} />
            <DropdownItem type="drawer" titre="Historique de paiement"drawerClick={() =>openOffcanvas(invoice)} />
            <DropdownItem type="lien" titre="Supprimer" 
            data={data} setData={setData} idInvoice={invoice.idInvoice} />
          </DropdownButton>
          </td>
        )}
        {(invoice.invoice_status === 3 ||
          invoice.invoice_status === 5 ||
          invoice.invoice_status === 6 ||
          invoice.invoice_status === 7 ||
          invoice.invoice_status === 8) && (
          <td className="p-2 text-base text-gray-500 flex justify-end">
            <DropdownButton type="modal" >
            <div className="inline-flex items-center justify-end w-full">
            <button onClick={openModal}
            className="text-base text-white px-3 py-1 hover:bg-[#A462A4] bg-[#A462A4] transition duration-200 outline-none border-[1px] capitalize"
            >
            Paiement
            </button>
            {isModalOpen && (
            <div  className="modal fade show" style={{ display: "block" }} >
             <div>
               <PaiementModal invoice={invoice} data={data} setData={setData} closeModal={closeModal} index={index}/>
              </div>
            </div>
            )}
            </div>
            <button type="button"
            className="text-white px-3 py-1 text-sm hover:bg-[#A462A4] bg-[#A462A4] transition-all border-[#A462A4] dropdown-toggle focus:bg-[#A462A4] border-[1px]"
            data-bs-toggle="dropdown" aria-expanded="false">
                <span className="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu border-none bg-white border-[1px] border-[#A462A4] shadow">
            <DropdownItem type="lien" titre="Voir" idInvoice={invoice.idInvoice} 
            />
            <DropdownItem type="lien" titre="Exporter en PDF" idInvoice={invoice.idInvoice} />
            <DropdownItem type="drawer" titre="Historique de paiement"  
             drawerClick={() =>openOffcanvas(invoice)}/>
            <DropdownItem type="lien" titre="Supprimer" 
            idInvoice={invoice.idInvoice}   data={data} setData={setData}/>
            </ul>
            </DropdownButton>
            </td>
          )}
          {
          invoice.invoice_status === null && (
          <td className="text-center">Statut non défini</td>
          )} 
          {selectedInvoice && (
            <td><PaymentHistoryOffcanvas invoice={selectedInvoice} onClose={closeOffcanvas} setData={setData} index={index}/></td>
          )} 
    </>  
    );
  };
  const PaymentHistoryOffcanvas = ({ invoice, onClose, setData, index }) => {
    const [payments, setPayments] = useState(invoice.payments);
  
    const totalPaid = payments.reduce((acc, p) => acc + Number(p.amount), 0);

    const remaining = invoice.invoice_total_amount - totalPaid;
  
    const onDeletePayment = async (paymentId) => {
      if (window.confirm("Êtes-vous sûr de vouloir supprimer ce paiement ?")) {
        try {
          const response = await axios.delete(`http://127.0.0.1:8000/api/payments/${paymentId}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          });
  
          if (response.data.success === true) {
            // Mise à jour de l'état global
            setData((prevData) => ({
              ...prevData,
              invoices: {
                ...prevData.invoices,
                data: prevData.invoices.data.map((invoiceItem, i) => {
                  if (i === index) {
                    const deletedPayment = invoiceItem.payments.find((p) => p.id === paymentId);
                    const newPayments = invoiceItem.payments.filter((p) => p.id !== paymentId);
                    
                    // Fonction de conversion sécurisée
                    const toNumber = (value) => {
                      const num = parseFloat(value);
                      return isNaN(num) ? 0 : num;
                    };
                    
                    const currentRemaining = toNumber(invoiceItem.remaining);
                    const refundAmount = deletedPayment ? toNumber(deletedPayment.amount) : 0;
                    const newRemaining = currentRemaining + refundAmount;
                
                    // console.log('Calcul:', {
                    //   currentRemaining,
                    //   refundAmount,
                    //   newRemaining,
                    //   deletedPayment
                    // });
                    
                    return {
                      ...invoiceItem,
                      payments: newPayments,
                      remaining: newRemaining,
                    };
                  }
                  return invoiceItem;
                }),
              },
            }));
  
            // Mise à jour de l'état local du composant
            setPayments((prev) => prev.filter((p) => p.id !== paymentId));
  
            alert("Paiement supprimé avec succès.");
          }
        } catch (error) {
          console.error(error);
          alert("Erreur lors de la suppression. Veuillez réessayer.");
        }
      }
    };

    
    // ...
    return (
      <>
       <div className="fixed top-0 right-0 h-full w-[45em] bg-white shadow-lg z-50 overflow-y-auto">
        <div className="flex flex-col w-full h-full">
          <div className="inline-flex items-center justify-between w-full px-4 py-2 bg-gray-100">
            <p className="text-lg font-medium text-gray-500">
              Historique des paiements | N°: {invoice.invoice_number}
            </p>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-10 h-10 duration-200 rounded-md cursor-pointer hover:text-inherit hover:bg-gray-200"
            >
              <i className="text-gray-500 fa-solid fa-xmark"></i>
            </button>
          </div>
  
          <div className="w-full overflow-x-auto p-4 overflow-y-auto h-full pb-3">
            <div className="flex flex-col gap-4">
              {totalPaid === 0 ? (
                <p className="font-semibold text-center text-gray-700">
                  Aucun paiement effectué sur cette facture.
                </p>
              ) : (
                payments.map((payment, index) => (
                  <div
                    key={payment.id}
                    className="flex flex-col gap-2 payment-row"
                    data-invoice-id={invoice.idInvoice}
                    data-payment-id={payment.id}
                  >
                    <div className="flex items-center justify-between w-full">
                      <p className="text-lg font-semibold text-gray-700">
                        {index + 1}e paiement
                      </p>
                      <i
                        className="text-gray-300 cursor-pointer fa-solid fa-trash-can hover:text-red-500 delete-payment"
                        onClick={() =>onDeletePayment(payment.id)}
                      ></i>
                    </div>
                    <hr />
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col w-full gap-2">
                        <p className="w-full text-gray-500">
                          {new Date(payment.payment_date).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        <div className="flex items-center w-full gap-2">
                          {  <p className="text-gray-500 uppercase">
                            {payment.mode_paiement.pm_type_name}
                          </p> }
                          {payment.payment_method_id !== 4 ? (
                            payment.payment_method_id === 3 ? (
                              <p className="font-semibold text-gray-500"></p>
                            ) : (
                              <p className="font-semibold text-gray-500">
                                -{" "}
                                {payment.bankacount
                                  ? `${payment.bankacount.ba_titulaire} ${payment.bankacount.ba_name}`
                                  : "aucun compte bancaire associé"}
                              </p>
                            )
                          ) : (
                            <p className="font-semibold text-gray-500">
                              - {payment.mobilemoneyacount.mm_phone}{" "}
                              {payment.mobilemoneyacount.mm_operateur}
                            </p>
                          )}
                        </div>
  
                        <input
                          className="text-gray-500 outline-none inline-edit"
                          name="payment_description"
                          value={payment.payment_description}
                        />
                      </div>
                      <input
                        className="w-1/3 font-semibold text-right text-gray-700 outline-none inline-edit amount-input"
                        name="amount"
                        value={Number(payment.amount).toLocaleString("fr-FR")}
                      />
                    </div>
                  </div>
                ))
              )}
  
              <div className="flex justify-end w-full">
                <div className="w-full" />
                <div className="w-full">
                  <div className="flex flex-col w-full gap-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-700">Total payé :</h3>
                      <h3 className="font-semibold text-gray-700">
                        {totalPaid.toLocaleString("fr-FR")}
                      </h3>

                    </div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-700">Reste à payer :</h3>
                      <h3 className="font-semibold text-gray-700">
                        {remaining.toLocaleString("fr-FR")}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between py-2 border-t-2">
                      <h3 className="font-semibold text-gray-700">Total :</h3>
                      <h3 className="font-semibold text-gray-700">
                        {Number(invoice.invoice_total_amount).toLocaleString("fr-FR")} Ar
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> 
      </div>
      </>
    );
  };