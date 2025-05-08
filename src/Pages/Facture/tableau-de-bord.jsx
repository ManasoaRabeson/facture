import { useEffect } from "react";
import { TbLoader } from 'react-icons/tb';
import useApi from "../../Hooks/Api";
import { Spinner } from "../../Components/spinner";
export function TableauDeBord(){
    return(
        <>
        <TableauDeBordContent/>
        </>
    )
}
 function TableauDeBordContent(){
    const { loading, error, data, callApi } = useApi();
    useEffect(()=>{
        callApi('/dashboard');
      },[callApi]);
      if (loading) return <Spinner/>
      if (error) return <p>Erreur : {error.message}</p>; 
      //console.log(data);
      if (!data) return null;    
    return(
        <>
    <div className="flex flex-col w-full h-full gap-4 ">
        <div className="sm:w-[1024px] lg:w-full h-full bg-white">
            <div className="flex justify-center w-full">
                <div className="w-full xl:w-3/4 border-[1px] border-gray-200 flex items-start justify-between rounded-md">
                    <div className="flex flex-col w-full gap-2 px-12 py-3 border-r">
                        <p className="text-lg font-normal text-gray-500">{ data.countInvoices <= 1 ? 'Facture' : 'Factures' }</p>
                        <p className="text-2xl font-semibold text-gray-600">{data.countInvoices }</p>
                    </div>
                    <div 
                        className="flex flex-col w-full gap-2 px-12 py-3 border-r cursor-pointer hover:bg-gray-100">
                        <p className="text-lg font-normal text-gray-500">Total facture</p>
                        <p className="text-2xl font-semibold text-gray-600">
                         AR {new Intl.NumberFormat('fr-FR').format(data.total_montant)}
                        </p>

                    </div>
                    <div 
                        className="flex flex-col w-full gap-2 px-12 py-3 border-r cursor-pointer hover:bg-gray-100">
                        <p className="text-lg font-normal text-gray-500">Total restant dû</p>
                        <p className="text-2xl font-semibold text-gray-600">
                        AR {new Intl.NumberFormat('fr-FR').format(data.restantDu)}
                        </p>
                    </div>
                    <div 
                        className="flex flex-col w-full gap-2 px-12 py-3 cursor-pointer hover:bg-gray-100">
                        <p className="text-lg font-normal text-gray-500">Total échues</p>
                        <p className="text-2xl font-semibold text-gray-600">
                        AR {new Intl.NumberFormat('fr-FR').format(data.remaining_due_past_due)}
                            </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</>
    )
}