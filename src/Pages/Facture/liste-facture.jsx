import {  useEffect, useState } from "react";
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/fr';
dayjs.extend(localizedFormat);
dayjs.locale('fr');


import { SearchBar } from "./Formulaire/search-bar";
import { ResultCherche } from "./result-recherche";
import useApi from "../../Hooks/Api";
export function ListeFacture(){
  const [filters, setFilters] = useState({
    idEntreprise: 0,
    idInvoiceStatus: 0,
    invoice_number: '',
    invoice_date_pm: ''
  });
  const {data, callApi} = useApi();
  useEffect(() => {
      callApi('/cfp/factures/id/1');
  }, [callApi]);
  // Action handler pour React 19
  // const handleFormAction = (formData) => {
  //   setFilters({
  //     idEntreprise: Number(formData.get('idEntreprise')),
  //     idInvoiceStatus: Number(formData.get('invoice_status')),
  //     invoice_number: formData.get('invoice_number'),
  //     invoice_date_pm: formData.get('invoice_date_pm')
  //   });
  //   // setIdEtp(formData.get('idEntreprise')) ;
  //   // setIdInvoiceStatus(formData.get('invoice_status'));
  //   // setInvoice_number(formData.get('invoice_number'));
  //   // setInvoice_date_pm(formData.get('invoice_date_pm'));
  // };
  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div className="sm:w-[1024px] lg:w-full h-full bg-white">
        <div className="flex flex-col w-full gap-6 mt-3">
          <SearchBar
            // actionClick={handleFormAction} 
            filters={filters} setFilters={setFilters} data={data}
          />
          <ResultCherche
          filters={filters}/>
        </div>
      </div>
    </div>
  );
}

 export const EntreprisePopoverCell = ({ invoice }) => {
  const entreprise = invoice.entreprise_from_vcollaboration ?? invoice.entreprise_from_vcfp_all;
  return (
    <td className="cursor-pointer hover:underline">
      <HoverPopover
        button={
          <div data-serialtip="etp">
            <label className="max-w-xs overflow-hidden text-base text-gray-500 uppercase truncate cursor-pointer hover:underline underline-offset-2 whitespace-nowrap text-ellipsis">
              {entreprise?.etp_name ?? entreprise?.customerName}
            </label>
          </div>
        }
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-12 h-12 text-xl font-medium text-purple-500 uppercase rounded-full bg-purple-50">
              {entreprise?.etp_initial_name ?? entreprise?.initial_name}
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-gray-700 uppercase">
                {entreprise?.etp_name ?? entreprise?.customerName}
              </p>
              <p className="text-base text-gray-500">
                {entreprise?.etp_email ?? entreprise?.customerEmail}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <div className="inline-flex items-center gap-4">
            <div className="flex justify-end w-1/3">
              <p className="text-gray-400">Adresse :</p>
            </div>
            <div className="flex justify-start w-1/2">
              <p className="text-gray-500">
                {entreprise?.etp_addr_lot ?? entreprise?.customer_addr_lot ?? 'Adresse inconnue'}{' '}
                {entreprise?.etp_addr_quartier ?? entreprise?.customer_addr_quartier}
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-4">
            <div className="flex justify-end w-1/3">
              <p className="text-gray-400">Téléphone :</p>
            </div>
            <div className="flex justify-start w-1/2">
              <p className="text-gray-500">
                {entreprise?.etp_phone ?? entreprise?.customerPhone ?? 'Téléphone inconnu'}
              </p>
            </div>
          </div>
        </div>
      </HoverPopover>
    </td>
  );
};

const HoverPopover = ({ button, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div>{button}</div>
      {open && (
        <div className="absolute z-10 mt-2 bg-white border rounded shadow-md p-4 w-[26em]">
          {children}
        </div>
      )}
    </div>
  );
};




