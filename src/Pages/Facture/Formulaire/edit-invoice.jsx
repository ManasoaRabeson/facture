import axios from "axios";
import {  useContext, useEffect, useState } from "react";
import { TbLoader } from 'react-icons/tb';
import { FactTemplate } from "./fact-template";
import { InvoiceContext } from "../../../Contexts/invoice";

export function EditInvoice(){
  
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // optionnel
    const [error, setError] = useState(null);     // optionnel
    let isFacture = true;
    const isEdit = "facture";
    const [dataProfil,setDataProfil] = useState([]);
    const { idInvoice } = useContext(InvoiceContext);
    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
            const res = await axios.get(`http://127.0.0.1:8000/api/cfp/factures/${idInvoice}/edit`,{
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
              }
            });
            const response = await axios.get(`http://127.0.0.1:8000/api/cfp/profils/${JSON.parse(sessionStorage.getItem("user")).id}/index`,
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                  }
            });
            setData(res.data);
            setDataProfil(response.data);
          } catch (err) {
            setError(err);
          } finally {
            setLoading(false);
          }
          };
        fetchData();
      }, [idInvoice]);
        if (loading) return  <div className="flex justify-center items-center h-screen">
        <TbLoader className="animate-spin text-purple-500 text-4xl" />
        </div>;
        if (error) return <p>Erreur : {error.message}</p>;   
    return(
        <>
            <div className="flex flex-col w-full h-full">
                <div className="sm:w-[1280px] lg:w-full">
                   {!isEdit && <div className="inline-flex items-center justify-center gap-2 px-3 py-2 text-center bg-yellow-100 rounded">
                          <i className="text-lg bi bi-info-circle"></i>
                          <p className="text-gray-700 text-md">
                          Veuillez ajouter un <span className="font-semibold text-gray-700 uppercase text-md">client</span> en premier, avant de remplir les autres champs. Merci.
                          </p>
                      </div>} 
                      <div className="flex justify-center w-full mt-2 bg-white rounded-md">
                    </div>
                    <FactTemplate data={data} isFacture={isFacture} isEdit={isEdit} dataProfil={dataProfil}/>
                </div>
            </div>
        </>
    )
}