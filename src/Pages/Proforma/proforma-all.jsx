import dayjs from 'dayjs';
import 'dayjs/locale/fr';

import {Thead } from "../../Components/Table/Headers";
import DropdownItem from '../../Components/Dropdown/dropdown-item';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pagination } from '../Pagination';
import DropdownButton from '../../Components/Dropdown/dropdown-boutton';
import { handleApprouve, handleCancel, handleSendEmail } from '../../Services/service-action';
import { EntreprisePopoverCell } from '../Facture/list/liste-facture';
export function TousProforma({filters}){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    useEffect(() => {
        const fetchData = async (page) => {
          try {
            const res = await axios.get(`http://127.0.0.1:8000/api/cfp/factureProfo`,{
              params : {
                page,
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
            setLastPage(res.data.invoices.last_page);
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false);
          }
        };
        fetchData(currentPage);
      }, [filters,currentPage]);
    
      if (loading) return (
        <div className="flex justify-center items-center h-10">
          <div className="animate-spin text-purple-500"></div>
        </div>
      );
      
    return(
        <>
            <div className="flex flex-col " id="subContentInvoice">
                <table id="invoiceTable"> 
                    <Thead/>
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

                                <td
                                id={`remainingAmount_${invoice.idInvoice}`}
                                className="text-right text-gray-500"
                                >
                                Ar{' '}
                                {invoice.payments?.reduce((acc, p) => acc + p.amount, 0) === 0
                                ? Number(invoice.invoice_total_amount).toLocaleString('fr-FR')
                                : Number(invoice.invoice_total_amount - invoice.payments.reduce((acc, p) => acc + p.amount, 0)).toLocaleString('fr-FR')}
                                </td>
                                {(invoice.invoice_status === 1 || invoice.invoice_status === 2) ? (
                                <td className="p-2 text-base text-gray-500 flex justify-end">
                                    <div className="flex flex-1 btn-group dropdown w-max">
                                        <div className="inline-flex items-center justify-end w-full">
                                        {invoice.invoice_status === 1 && (
                                            <button
                                                onClick={()=>handleApprouve(invoice.idInvoice,setData,index)}
                                                className="text-base text-gray-600 px-3 py-1 hover:bg-gray-200 bg-gray-100 transition duration-200 outline-none border-[1px] capitalize"
                                            >
                                            Approuver
                                            </button>
                                        )}
                                        {invoice.invoice_status === 2 && (
                                        <button
                                            onClick={()=>handleSendEmail(invoice.idInvoice,setData,index)}
                                            className="text-base text-gray-600 px-3 py-1 hover:bg-gray-200 bg-gray-100 transition duration-200 outline-none border-[1px] capitalize"
                                        >
                                            Envoyer
                                        </button>
                                        )}
                                    <button
                                    type="button"
                                    className="text-gray-600 px-3 py-1 h-full hover:bg-gray-200 bg-gray-100 transition-all border-none dropdown-toggle focus:bg-gray-200 border-[1px]"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    >
                                    <span className="visually-hidden">Toggle Dropdown</span>
                                    </button>
                                
                                    <ul className="bg-white border-none shadow-md dropdown-menu">
                                    <DropdownItem type="lien" titre="Voir" idInvoice={invoice.idInvoice} 
                                    />
                                    {invoice.invoice_status === 1 && (
                                    <DropdownItem type="lien" titre="Editer" idInvoice={invoice.idInvoice}
                                    nature="EditerProforma" />
                                    )}
                                    <DropdownItem type="lien" titre="Exporter en PDF"/>
                                    <li className="z-50">
                                        <button onClick={()=>handleCancel(invoice.idInvoice,setData,index)}
                                            className="text-base text-gray-600 transition duration-150 cursor-pointer dropdown-item hover:bg-gray-50 focus:bg-gray-500 focus:text-white"
                                        >
                                            Annuler
                                        </button>
                                    </li>
                                    <DropdownItem type="lien" titre="Supprimer" data={data} setData={setData} idInvoice={invoice.idInvoice} />
                                    </ul>
                                    </div>
                                    </div>
                                    </td>):(
                                    <td className="p-2 text-base text-gray-500 flex justify-end">
                                    <DropdownButton type="simple" first="Voir" idInvoice={invoice.idInvoice} >
                                        <DropdownItem type="lien" titre="Exporter en PDF" idInvoice={invoice.idInvoice}/>
                                    </DropdownButton>
                                </td>
                                )}
                            </tr>     
                        ))       
                      )} 
                    </tbody>
                </table>
                {lastPage > 1 && (
                    <Pagination
                      setCurrentPage={setCurrentPage}
                      lastPage={lastPage}
                      currentPage={currentPage}
                    />
                  )} 
        </div>        
    </>
)}