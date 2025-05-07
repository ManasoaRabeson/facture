import axios from "axios";
import { useEffect, useState } from "react";

export function GererProfil(){
    const [data,setData] = useState([]);
    //const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // optionnel
    const [error, setError] = useState(null);     // optionnel

    //const {data,loading,error,callApi} = useApi();
    useEffect(()=>{
       const fetchData = async () =>{
        try {
        setLoading(true);
        const response = await axios.get(`http://127.0.0.1:8000/api/cfp/profils/${JSON.parse(sessionStorage.getItem("user")).id}/index`,
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
              }
        }
        );
        setData(response.data);    
        } catch (error) {
                setError(error);
        } finally {
        setLoading(false);
        }
       };
       fetchData();
       // callApi(`cfp/profils/${JSON.parse(sessionStorage.getItem("user")).id}/index`);
    },[]);
    if(!data) return ;
    if (loading) return  <div className="flex justify-center items-center h-screen">
    </div>;
    if (error) return <p>Erreur : {error.message}</p>;
    console.log(data);
    
    return (
        <>
            <div class="w-full h-full my-4">
                <div class="flex flex-col w-full max-w-screen-xl p-4 mx-auto bg-white rounded-xl">
                <div class="grid grid-cols-1 gap-2">
                    <span class="text-gray-400">Profil &gt; { data.infoProfilEtp.customerName }</span>
                    <h1 class="w-full text-xl font-medium text-gray-700 truncate">
                        {data.infoProfilEtp.customer_description ? (
                        data.infoProfilEtp.customer_description
                        ):(
                        <span class="text-gray-600">--</span>
                         )}
                    </h1>
                </div>
                </div>
            </div>
        </>
    )
}