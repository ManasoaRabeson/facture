import { useState } from "react";
import axios from "axios";

export function PaiementModal({ invoice, data, closeModal ,setData,index}) {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMesssage] = useState();
  console.log(data);
  
  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/${formData.get("invoice_id")}/payment/store`, formData,{
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
        });
        if(response.data.status === 200) {
          if (data?.invoices.data[index].payments.length === 0) {
            window.location.reload();
          }else{
            setData(prevData => ({
              ...prevData,
              invoices: {
                ...prevData.invoices,
                data: prevData.invoices.data.map((invoice, i) => {
                  if (i === index) {
                    const lastId = invoice.payments.length > 0
                      ? Math.max(...invoice.payments.map(p => p.id || 0))
                      : 0;
                    
                    const payment_method_id = Number(formData.get("payment_method_id"));
                    let paiement_name = "";
                    
                    switch (payment_method_id) {
                      case 1:
                        paiement_name = "Chèque";
                        break;
                      case 2:
                        paiement_name = "Virement bancaire";
                        break;
                      case 3:
                        paiement_name = "Espèce";
                        break;
                      case 4: 
                        paiement_name = "Mobile Money";
                        break;
                    }
                    
                    const newPayment = {
                      id: lastId + 1,
                      amount: formData.get("amount"),
                      payment_date: formData.get("payment_date"),
                      payment_method_id: payment_method_id,
                      payment_bank_id: formData.get("payment_bank_id"),
                      payment_description: formData.get("payment_description"),
                      created_at: new Date().toISOString(),
                      updated_at: new Date().toISOString(),
                      mode_paiement: {
                        idTypePm: payment_method_id,
                        pm_type_name: paiement_name
                      }
                    };
          
                    const newPayments = [...invoice.payments, newPayment];
                    
                    const total = parseFloat(invoice.invoice_total_amount) || 0;
                    const paid = newPayments.reduce((acc, p) => {
                      const amount = parseFloat(p.amount) || 0;
                      return acc + amount;
                    }, 0);
                    const remaining = total - paid;
                    
                    const isFullyPaid = remaining <= 0;
                    
                    return {
                      ...invoice,
                      payments: newPayments,
                      remaining: remaining,
                      invoice_status: isFullyPaid ? 4 : 5,
                      status: {
                        idInvoiceStatus: isFullyPaid ? 4 : 5,
                        invoice_status_name: isFullyPaid ? "Payé" : "Partiel"
                      },
                      status_color : isFullyPaid ?  "teal-600" : "yellow-600" 
                    };
                  } else {
                    return invoice;
                  }
                })
              }
            }));
          }       
        }
      setMesssage( response.data.message);
      setSuccessMessageVisible(true);
      setErrorMessage(""); // Réinitialiser les erreur
      setTimeout(() => {
        setSuccessMessageVisible(false);
        closeModal();
      }, 3000);
    } catch (error) {
      console.error('Erreur d’envoi :', error.response?.data || error.message);
      setErrorMessage('Erreur lors de l\'envoi des données.');
      setSuccessMessageVisible(false); // Si une erreur survient, on cache le message de succès
    }
  };
  return (
    <>
 {!successMessageVisible && (
 <div className="fixed inset-0 z-40 flex items-center justify-center max-w-screen-md mx-auto overflow-hidden modal-dialog faster">
 <div className="border border-teal-500 modal-container bg-white w-[75%] mx-auto rounded shadow-lg z-50 overflow-y-auto">
   <div className="px-6 py-4 text-left modal-content">
     <div className="flex items-center justify-between">
       <h1 className="text-xl font-semibold text-gray-700">Enregistrer le paiement de cette facture</h1>
       <div className="z-50 cursor-pointer" onClick={closeModal}>
         <i className="text-gray-400 fa-solid fa-xmark text-md"></i>
       </div>
     </div>
     <form action={ handleSubmit }>
       <div className="flex flex-col gap-3 my-3 mr-10">
         <p className="text-lg font-semibold text-gray-700">Reste à payer
           : <span className="text-lg font-semibold text-gray-700">  {(
    (Number(invoice.invoice_total_amount) || 0) -
    (Array.isArray(invoice.payments)
      ? invoice.payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0): 0))
      .toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} Ar</span>
         </p>
         <input type="hidden" name="invoice_id" value={invoice.idInvoice} />
             <div className="inline-flex items-center w-full gap-4">
                 <div className="flex items-center justify-end w-2/5">
                     <p className="text-base font-semibold text-gray-700">Date
                         <span className="text-red-500">*</span>
                     </p>
                 </div>
                 <div className="flex items-center w-3/5">
                     <input type="date" name="payment_date" required
                      className="px-3 py-2 border-[1px] border-gray-200 rounded-md hover:border-purple-300 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 duration-200 text-gray-400"/>
                 </div>
             </div>
             <div className="inline-flex items-center w-full gap-4">
                 <div className="flex items-center justify-end w-2/5">
                     <p className="text-base font-semibold text-gray-700">
                      Montant<span className="text-red-500">*</span>
                     </p>
                 </div>
                 <div
                     className="w-3/5 flex items-center px-3 py-2 gap-2 border-[1px] border-gray-200 rounded-md hover:border-purple-300 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 duration-200 text-gray-400">
                     <p>Ar</p>
                     <input type="number" name="amount" className="w-full outline-none" required/>
                 </div>
             </div>
             <div className="inline-flex items-center w-full gap-4">
                 <div className="flex items-center justify-end w-2/5">
                     <p className="text-base font-semibold text-gray-700">
                         Méthode<span className="text-red-500">*</span>
                     </p>
                 </div>
                 <div className="flex items-center w-3/5">
                     <select name="payment_method_id" id="payment_method_id" required
                         className="w-full p-2 text-base border rounded focus:outline-none focus:ring-purple-500 focus:ring-1">
                         {data.pm_types.map((type) => (
                         <option key={type.idTypePm} value={type.idTypePm}>
                             Par {type.pm_type_name}
                         </option>
                         ))}
                     </select>
                 </div>
             </div>
             <div className="inline-flex items-center w-full gap-4">
                 <div className="flex items-center justify-end w-2/5">
                     <p className="text-base font-semibold text-gray-700">
                         Compte<span className="text-red-500">*</span>
                     </p>
                 </div>
                 <div className="flex items-center w-3/5 payment_acompte_container" id="">
                     <select name="payment_bank_id" id="payment_bank_id"
                         className="w-full p-2 text-base border rounded focus:outline-none focus:ring-purple-500 focus:ring-1">
                         {data.ba_accounts.map((account) => (
                         <option key={account.id} value={account.id}>
                             {account.ba_titulaire} - {account.ba_name}
                         </option>
                         ))}
                     </select>
                 </div>
             </div>
             <div className="inline-flex items-start w-full gap-4">
                 <div className="flex items-center justify-end w-2/5">
                     <p className="text-base font-semibold text-gray-700">Memo / notes</p>
                 </div>
                 <div className="flex items-center w-3/5">
                     <textarea name="payment_description" rows="10" cols="50"
                         className="w-full h-20 p-2 text-base border rounded focus:outline-none focus:ring-purple-500 focus:ring-1"></textarea>
                 </div>
             </div>
         </div>
         <div className="flex justify-end pt-2">
             <button type="button" onClick={closeModal} className="btn mr-3">Annuler</button>
             <button type="submit" className="btn btn-primary bg-[#A462A4]">Enregistrer</button>
         </div>
     </form>
 </div>
</div>
</div>
    )}
      {/* Message de succès */}
  {successMessageVisible && (
    <div className="validation-message success" style={{ color: 'green', backgroundColor: '#e0f7e0', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
     {message}
    </div>
  )}

  {/* Message d'erreur */}
  {errorMessage && (
    <div className="validation-message error" style={{ color: 'red', backgroundColor: '#fbe9e7', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
      {errorMessage}
    </div>
  )}

</>
)}