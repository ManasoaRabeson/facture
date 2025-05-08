import { useEffect, useState } from "react";
import { ProfoTemplate } from "./profo-template";
import axios from "axios";
import { TbLoader } from "react-icons/tb";
import { Spinner } from "../../../Components/spinner";
export function NewProforma(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // optionnel
    const [error, setError] = useState(null);     // optionnel
    let IsProforma = true;
    const [dataProfil,setDataProfil] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
            const res = await axios.get("http://127.0.0.1:8000/api/cfp/factureProfo/create",{
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
        
        if (loading) return  <Spinner/>;
        if (error) return <p>Erreur : {error.message}</p>;
    return (
        <>
            <div className="flex flex-col w-full h-full">
                <div className="sm:w-[1280px] lg:w-full">
                    <ProfoTemplate data={data}
                    IsProforma={IsProforma} dataProfil={dataProfil}/>
                </div>
            </div>
        </>
    )
}