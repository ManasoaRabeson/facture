import { Thead } from "../../Components/Table/Headers";
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import DropdownItem from "../../Components/Dropdown/dropdown-item";
import {  handleApprouveDraft } from "../../Services/service-action";
import { EntreprisePopoverCell } from "../Facture/list/liste-facture";
export function Brouillons({data}){
   // console.log(data.invoicesDraft);
    const statusColorList = [
        { id: 1, color: 'gray-400' },
        { id: 2, color: 'rose-500' },
        { id: 3, color: '[#37718e]' },
        { id: 4, color: 'teal-600' },
        { id: 5, color: 'yellow-600' },
        { id: 6, color: 'red-400' },
        { id: 7, color: 'green-600' },
        { id: 8, color: 'red-600' },
        { id: 9, color: 'rose-500' },
      ];

      
    return(
    <>
    <div className="flex flex-col " id="subContentInvoice">
    <table id="invoiceTable"> 
      <Thead/>
      <tbody>
      {data.invoicesDraft.length <= 0 ? (
        <tr className="p-2 hover:bg-gray-50">
            <td className='p-2 text-base text-gray-500' colSpan='9'>
            <p className="text-lg font-normal text-center text-gray-500">
                Vous n'avez pas de facture pour l'instant
            </p>
            </td>
        </tr>
        ):(
            data.invoicesDraft.map((invoice,index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 duration-150 cursor-pointer">
                    <td className="p-2 text-base text-gray-500 ">
                            {index+1}
                    </td>
                    <td className="p-2 text-base text-gray-500 ">
                    <span
                        className={
                        statusColorList.map((colorList) =>
                            invoice.status?.idInvoiceStatus === colorList.id
                                ? `px-3 py-1 text-sm text-white bg-${colorList.color} rounded-md`
                                : ''
                            )
                            .find((cls) => cls !== '') // Trouve la première classe non vide
                            }
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
                    {(() => {
                        const total = Number(invoice.invoice_total_amount);
                        const paid = invoice.payments?.reduce((acc, p) => acc + p.amount, 0) || 0;
                        const remaining = total - paid;

                        return `Ar ${remaining.toLocaleString('fr-FR', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                        })}`;
                    })()}
                    </td>
                    <td className="p-2 text-base text-gray-500 flex justify-end">
                        <div className="flex flex-1 btn-group dropdown w-max">
                          <div className="inline-flex items-center justify-end w-full">
                            <button 
                            onClick={()=>handleApprouveDraft(invoice.idInvoice)}
                                className="text-base text-gray-600 px-3 py-1 hover:bg-gray-200 bg-gray-100 transition duration-200 outline-none border-[1px] capitalize"
                            >
                            {invoice.invoice_status === 1 ? 'Approuver' : 'Envoyé' }
                            </button>
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
                                    <DropdownItem type="lien" titre="Editer"  nature ="EditerProforma" idInvoice={invoice.idInvoice}/>
                                    )}
                                    <DropdownItem type="lien" titre="Exporter en PDF" url="{{ route('exportInvoice', $invoice->idInvoice) }}" />
                                    <li className="z-50">
                                    <form action="{{ route('cfp.factures.cancel', $invoice->idInvoice) }}"
                                        method="POST">
                                        <button type="submit"
                                            class="text-base text-gray-600 transition duration-150 cursor-pointer dropdown-item hover:bg-gray-50 focus:bg-gray-500 focus:text-white">Annuler</button>
                                    </form>
                                    </li>
                                </ul>
                          </div>
                        </div>
                    </td>
                </tr>))
        )}
      </tbody>
      </table>
    </div>
        </>
    )
}