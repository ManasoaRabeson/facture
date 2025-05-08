import axios from "axios";
import {  useEffect, useState } from "react";
import { TbLoader } from 'react-icons/tb';
import { FactTemplate } from "./fact-template";
import { Spinner } from "../../../Components/spinner";

export function NewInvoice(){
  
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // optionnel
    const [error, setError] = useState(null);     // optionnel
    const [dataProfil,setDataProfil] = useState([]);
    let isFacture = true;

    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
            const res = await axios.get("http://127.0.0.1:8000/api/cfp/factures/create",{
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
              }
              });
              const response = await axios.get(`http://127.0.0.1:8000/api/cfp/profils/${JSON.parse(sessionStorage.getItem("user")).id}/index`,
              {
                  headers: {
                      Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }
              }
              );
            setData(res.data);
            setDataProfil(response.data);
          } catch (err) {
            setError(err);
          } finally {
            setLoading(false);
          }
          };
        fetchData();
      }, []);
        
        if (loading) return  <Spinner/>
        if (error) return <p>Erreur : {error.message}</p>;
        
    return(
        <>
            <div className="flex flex-col w-full h-full">
                <div className="sm:w-[1280px] lg:w-full">
                    <div className="flex justify-center w-full mt-2 bg-white rounded-md">
                      <div className="inline-flex items-center justify-center gap-2 px-3 py-2 text-center bg-yellow-100 rounded">
                          <i className="text-lg bi bi-info-circle"></i>
                          <p className="text-gray-700 text-md">
                          Veuillez ajouter un <span className="font-semibold text-gray-700 uppercase text-md">client</span> en premier, avant de remplir les autres champs. Merci.
                          </p>
                      </div>
                    </div>
                    <FactTemplate data={data} isFacture={isFacture} dataProfil={dataProfil}  />
                </div>
            </div>
        </>
    )
}