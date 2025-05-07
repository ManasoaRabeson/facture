import { useContext } from "react";
import { ExportPdf } from "../../../Services/export-pdf";
import { InvoiceContext } from "../../../Contexts/invoice";

export function HeaderInvoice({data}){
    const { setCurrentPage,pageRecent } = useContext(InvoiceContext);
    return(
        <>
          <div className="inline-flex items-center justify-between w-full pt-4">
                <div className="inline-flex items-center gap-4">
                    <a
                        onClick={() => setCurrentPage(pageRecent)}
                        className="btn btn-sm cursor-pointer">
                        <i className="fa-solid fa-chevron-left"></i>
                    </a>
                    <div>
                        <h1 className="font-sans text-xl font-semibold text-gray-700 uppercase">{data.invoice.typeFacture } #
                            <span
                            className="font-sans text-xl font-semibold text-gray-700">{data.invoice.invoice_number }</span></h1>
                    </div>
                </div>
                <div className="relative inline-flex items-center gap-2 ">
                    {/* <div className="absolute right-[135px] -bottom-16">
                        <lottie-player src="{{ asset('Animations/ClickHereBtn.json') }}" background="transparent" speed="1"
                            style="width: 100px; height: 100px;" loop autoplay></lottie-player>
                    </div> */}
                        <div className="flex flex-1 btn-group w-max">
                            <div className="w-full inline-flex items-center justify-end rounded-full border-gray-400 border-[1px]">
                                <button className="px-3 py-2 text-base text-gray-600 outline-none capitalize border-r-[1px] border-gray-400"
                                    type="button">
                                <a
                                    onClick={()=>{(data.invoice.idTypeFacture !== 2) ? setCurrentPage(10) : setCurrentPage(11)}}
                                className="transition duration-300 hover:text-gray-700"
                                >
                                Editer
                                </a>
                                </button>
                                <button type="button"
                                    className="text-gray-600 px-3 py-1 h-full hover:bg-gray-200 transition-all border-none dropdown-toggle dropdown-toggle-split focus:bg-gray-200 border-[1px]
                                    rounded-r-full"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className="visually-hidden">Toggle Dropdown</span>
                                </button>
                                <ul className="bg-white border-none shadow-md dropdown-menu">
                                    <li>
                                        <a onClick={()=>ExportPdf(data.invoice.idInvoice)}
                                            className="text-base text-gray-600 transition duration-150 dropdown-item hover:bg-gray-50 focus:bg-gray-500 focus:text-white cursor-pointer">
                                            Exporter en PDF
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <a
                        // href={
                        //     data.invoice.idTypeFacture !== 2
                        //     ? '/cfp/factures/create'
                        //     : '/cfp/factureProfo.create'
                        // }
                        onClick={()=>setCurrentPage(7)}
                        className="px-3 py-2 text-base rounded-full border-[1px] border-gray-400 bg-gray-600 text-white cursor-pointer"
                        >
                        Créer une autre facture
                        </a>
                </div>
            </div>
        </>
    )
}