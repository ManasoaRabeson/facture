// export function HistoriqueDePaiment(){
//     return(
//         <>
//              <div className="offcanvas offcanvas-end !w-[45em]" tabIndex="-1" id={`offcanvas${invoice.idInvoice}`} aria-labelledby="offcanvas">
//                 <div className="flex flex-col w-full">
//                     <div className="inline-flex items-center justify-between w-full px-4 py-2 bg-gray-100">
//                     <p className="text-lg font-medium text-gray-500">
//                         Historique des paiements | N°: {invoice.invoice_number}
//                     </p>
//                     <a data-bs-toggle="offcanvas" href={`#offcanvas${invoice.idInvoice}`} role="button" aria-controls="offcanvas"
//                         className="flex items-center justify-center w-10 h-10 duration-200 rounded-md cursor-pointer hover:text-inherit hover:bg-gray-200">
//                         <i className="text-gray-500 fa-solid fa-xmark"></i>
//                     </a>
//                     </div>

//                     <div className="w-full overflow-x-auto p-4 overflow-y-auto h-[100vh] pb-3">
//                     <div className="flex flex-col gap-4">
//                         {totalPaid === 0 ? (
//                         <p className="font-semibold text-center text-gray-700">
//                             Aucun paiement effectué sur ce facture.
//                         </p>
//                         ) : (
//                         invoice.payments.map((payment, index) => (
//                             <div
//                             key={payment.id}
//                             className="flex flex-col gap-2 payment-row"
//                             data-invoice-id={invoice.idInvoice}
//                             data-payment-id={payment.id}
//                             >
//                             <div className="flex items-center justify-between w-full">
//                                 <p className="text-lg font-semibold text-gray-700">{index + 1}e paiement</p>
//                                 <i
//                                 className="text-gray-300 cursor-pointer fa-solid fa-trash-can hover:text-red-500 delete-payment"
//                                 data-id={payment.id}
//                                 data-invoice-id={invoice.idInvoice}
//                                 onClick={() => handleDeletePayment(payment.id)}
//                                 ></i>
//                             </div>
//                             <hr />
//                             <div className="flex items-center justify-between">
//                                 <div className="flex flex-col w-full gap-2">
//                                 <p className="w-full text-gray-500">
//                                     {dayjs(payment.payment_date).format('D MMMM YYYY')}
//                                 </p>
//                                 <div className="flex items-center w-full gap-2">
//                                     <p className="text-gray-500 uppercase">
//                                     {payment.modePaiement.pm_type_name}
//                                     </p>
//                                     {payment.payment_method_id !== 4 ? (
//                                     payment.payment_method_id === 3 ? (
//                                         <p className="font-semibold text-gray-500"></p>
//                                     ) : (
//                                         <p className="font-semibold text-gray-500">
//                                         {payment.bankacount
//                                             ? `- ${payment.bankacount.ba_titulaire} ${payment.bankacount.ba_name}`
//                                             : '- aucun compte bancaire associé'}
//                                         </p>
//                                     )
//                                     ) : (
//                                     <p className="font-semibold text-gray-500">
//                                         - {payment.mobilemoneyacount.mm_phone} {payment.mobilemoneyacount.mm_operateur}
//                                     </p>
//                                     )}
//                                 </div>
//                                 <input
//                                     className="text-gray-500 outline-none inline-edit"
//                                     name="payment_description"
//                                     value={payment.payment_description}
//                                     onChange={(e) =>
//                                     handleInlineEdit(payment.id, 'payment_description', e.target.value)
//                                     }
//                                 />
//                                 </div>
//                                 <input
//                                 className="w-1/3 font-semibold text-right text-gray-700 outline-none inline-edit amount-input"
//                                 name="amount"
//                                 value={payment.amount.toLocaleString('fr-FR')}
//                                 onChange={(e) =>
//                                     handleInlineEdit(payment.id, 'amount', e.target.value)
//                                 }
//                                 />
//                             </div>
//                             </div>
//                         ))
//                         )}

//                         <div className="flex justify-end w-full">
//                         <div className="w-full"></div>
//                         <div className="w-full">
//                             <div className="flex flex-col w-full gap-2">
//                             <div className="flex items-center justify-between">
//                                 <h3 className="font-semibold text-gray-700">Total payé :</h3>
//                                 <h3 id={`totalPaid_${invoice.idInvoice}`} className="font-semibold text-gray-700">
//                                 {totalPaid.toLocaleString('fr-FR')}
//                                 </h3>
//                             </div>
//                             <div className="flex items-center justify-between">
//                                 <h3 className="font-semibold text-gray-700">Reste à payer :</h3>
//                                 <h3 id={`remainingAmount_${invoice.idInvoice}`} className="font-semibold text-gray-700">
//                                 {remainingAmount.toLocaleString('fr-FR')}
//                                 </h3>
//                             </div>
//                             <div className="flex items-center justify-between py-2 border-t-2">
//                                 <h3 className="font-semibold text-gray-700">Total :</h3>
//                                 <h3 id={`totalAmount_${invoice.idInvoice}`} className="font-semibold text-gray-700">
//                                 {invoice.invoice_total_amount.toLocaleString('fr-FR')} Ar
//                                 </h3>
//                             </div>
//                             </div>
//                         </div>
//                         </div>

//                     </div>
//                     </div>
//                 </div>
//                 </div>
//         </>
//     )
// }