import { useContext, useEffect, useState } from "react";
import { AjoutFacture } from "../../Footer/AjoutFacture";
import { AjoutClient } from "./AjoutClient";
          
import { Search} from "./search";
import { Count } from "./count";
import axios from "axios";
import { InvoiceContext } from "../../../Contexts/invoice";
export function FactTemplate({data,isFacture,isEdit,dataProfil}){
const { setCurrentPage,setIdInvoice} = useContext(InvoiceContext);
const [idEtp, setIdEtp] = useState(null);
const [sumFolder, setSumFolder] =useState(0);
const [sumProject, setSumProject] =useState(0);
const [sumItems, setSumItems] =useState(0);
const [sumTotal, setSumTotal] =useState(0);
const [sumCours,setSumCours] = useState(0);
const [errors, setErrors] = useState({});
const [selectPaymentValue,setSelectPaymentValue] =useState(1);
const [invoiceNumber, setInvoiceNumber] = useState('');
const [invoiceBc, setInvoiceBc] = useState("");
//calcul date 
const [joursAvantPaiementSelect, setJoursAvantPaiementSelect] = useState(10);
const [invoiceDatePm, setInvoiceDatePm] = useState(new Date().toISOString().split('T')[0]);
const [invoice_date,setInvoice_date] = useState(new Date().toISOString().split('T')[0]);

//const {data,loading,error,callApi} = useApi();

useEffect(() => {
    if (isEdit && data?.invoice) {
      setInvoiceNumber(data.invoice.invoice_number || "");
      setInvoiceBc(data.invoice.invoice_bc || "");
      setInvoice_date(data.invoice.invoice_date || "");
      setInvoiceDatePm(data.invoice.invoice_date_pm || "");
    }
    //console.log(data.invoice.invoice_bc);
    
  }, [isEdit, data]);

useEffect (()=>{
    const total = parseInt(Number(sumProject) + Number(sumItems) + Number(sumFolder) + Number(sumCours));   
    setSumTotal(total);
 },[sumProject,sumItems,sumFolder,sumCours]);
// const [setOpenFolder,setOpenFolder] = useState(false);

useEffect(() => {
    if (!invoice_date || !joursAvantPaiementSelect) return;
  
    const dateFacture = new Date(invoice_date);
    const jours = parseInt(joursAvantPaiementSelect, 10);
  
    if (isNaN(dateFacture.getTime()) || isNaN(jours)) return;
  
    const datePaiement = new Date(dateFacture);
    datePaiement.setDate(datePaiement.getDate() + jours);
  
    setInvoiceDatePm(datePaiement.toISOString().split("T")[0]);
  }, [ invoice_date,joursAvantPaiementSelect]);
  
// calcul reduction
const [openDiv,setOpenDiv] = useState(false);
const handleSubmit = async (formData) => {
    try {
      // Affiche toutes les données contenues dans formData
    //   for (let [key, value] of formData.entries()) {
    //     console.log(`${key}:`, value);
    //   }
  
      if (isEdit) {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/cfp/factures/${data.invoice.idInvoice}`,
          formData,{
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
            });
        setIdInvoice(response.data.idInvoice);
        setCurrentPage(6);
      } else {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/cfp/factures",
          formData,{
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
            }
        );
        setIdInvoice(response.data.idInvoice);
        setCurrentPage(6);
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Erreur serveur :", error);
      }
    }
  }; 
      console.log(dataProfil.companies);       
return(
    <>
      <form action={handleSubmit} className="flex flex-col gap-4">
                {isEdit &&
                    <div className="flex items-center justify-between mx-12">
                    <div className="inline-flex items-center gap-4">
                        <h1 className="font-sans text-xl font-semibold text-gray-700 uppercase">{data.invoice.typeFacture }
                            #<span className="font-sans text-xl font-semibold text-gray-700">{data.invoice.invoice_number }</span>
                        </h1>
                    </div>
                    <div className="">
                        <button type="submit"
                            className="px-3 py-2 text-base rounded-full border-[1px] border-gray-400 bg-gray-600 text-white">
                            Sauver et apercevoir
                        </button>
                    </div>
                </div>}
                <div className="flex flex-col mx-12 bg-white rounded-md shadow-sm">
                {Object.keys(errors).length > 0 && (
                        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
                        <ul className="list-disc list-inside">
                            {Object.entries(errors).map(([field, messages]) =>
                            messages.map((msg, index) => (
                            <li key={`${field}-${index}`}>{msg}</li>
                            ))
                            )}
                        </ul>
                        </div>
                    )}
                    {/*Header*/}
                    <div className="inline-flex justify-between px-12 py-8" onClick={()=>setOpenDiv(false)}>
                    <AjoutClient idEtp={idEtp} setIdEtp={setIdEtp} isEdit={isEdit} data={data}/>
                        {/* RIGHT */}
                        <div className="w-[45%] flex flex-col gap-2">
                            <div className="flex justify-end mb-4">
                                <p className="text-4xl font-semibold text-gray-600">Facture</p>
                                <input type="hidden" name="idTypeFacture" id="idTypeFacture" value={isEdit==="proforma" ? 2 : 1} />
                            </div>
                            <div class="inline-flex items-center gap-4">
                                <div class="flex justify-end w-1/3">
                                <label for="invoice_number" class="flex-1 text-base font-semibold text-right text-gray-500">
                                    <span class="text-lg text-red-500">* </span>
                                    Adresse de facturation :
                                </label>
                                </div>
                            <div class="flex flex-col justify-start w-2/3">
                                <select name="idCompany" id="idCompany" class="p-2 border rounded-lg focus:outline-none focus:ring-purple-500 focus:ring-1">
                                    {dataProfil.companies.map(company =>(
                                    <option value={company.id}>Nom : {company.name} 
                                    - NIF  : {company.nif}
                                   </option>
                                    ))}
                                </select>
                            </div>
                            </div>
                            <div className="inline-flex items-center gap-4">
                                <div className="flex justify-end w-1/3">
                                    <label htmlFor="invoice_number" className="flex-1 text-base font-semibold text-right text-gray-500">
                                        <span className="text-lg text-red-500">* </span>
                                        Numero de facture :
                                    </label>
                                </div>
                                <div className="flex flex-col justify-start w-2/3" onClick={(e) => {
                                    e.stopPropagation(); // Empêche le clic de remonter
                                    setOpenDiv(true);
                                    }}>
                                    <input
                                    type="text"
                                    id="invoice_number"
                                    name="invoice_number"
                                    value={invoiceNumber}
                                    onChange={(e) => setInvoiceNumber(e.target.value)}
                                    placeholder="Fact-001"
                                    required
                                    className="w-full p-2 text-base text-gray-900 border rounded-lg placeholder:italic focus:outline-none focus:ring-purple-500 focus:ring-1"
                                    />
                                    </div>
                            </div>
                            {/* Last Invoice */}
                            {openDiv && data.number_invoice && data.number_invoice.length > 0 && (
                            <div className="inline-flex items-center gap-4">
                                <div className="flex justify-end w-1/3"></div>
                                <div className="flex flex-col justify-start w-2/3">
                                    <div id="lastInvoice" className=" w-full px-2 py-1 border rounded-lg">
                                    <div className="px-2 font-semibold text-gray-500">
                                    Trois derniers numéros de factures :
                                    </div>
                                    {data.number_invoice.map((invoice, index) => (
                                    <div className="px-2 text-gray-500" key={index}>
                                    {invoice.invoice_number} - {new Date(invoice.invoice_date).toLocaleDateString()}
                                    </div>
                                    ))}
                                    </div>
                                </div>
                            </div>
                            )}
                            {!(isEdit ==="proforma") && 
                            <div id="invoice_bc_container" className="inline-flex items-center gap-4">
                                <div className="flex justify-end w-1/3">
                                    <label htmlFor="invoice_bc" className="flex-1 text-base font-semibold text-right text-gray-500">
                                        {/* <span className="text-lg text-red-500">* </span> */}
                                        Numero B.C :
                                    </label>
                                </div>
                                <div className="flex flex-col justify-start w-2/3">
                                    <input type="text" id="invoice_bc" name="invoice_bc" 
                                        value={invoiceBc}
                                        onChange={(e) => setInvoiceBc(e.target.value)}
                                        className="w-full p-2 text-base text-gray-900 border rounded-lg placeholder:italic focus:outline-none focus:ring-purple-500 focus:ring-1"
                                        placeholder="" 
                                        
                                        />
                                </div>
                            </div>}
                            {isEdit ==="proforma" && <input type="hidden" name="invoice_bc" id="invoice_bc" />}
                            <div className="inline-flex items-center gap-4">
                                <div className="flex justify-end w-1/3">
                                    <label htmlFor="invoice_date" className="flex-1 text-base font-semibold text-right text-gray-500">
                                        <span className="text-lg text-red-500">* </span>
                                        Date de facture :
                                    </label>
                                </div>
                                <div className="flex flex-col justify-start w-2/3">
                                    <input type="date" id="invoice_date" name="invoice_date"
                                        className="w-full p-2 text-base text-gray-900 border rounded-lg placeholder:italic focus:outline-none focus:ring-purple-500 focus:ring-1"
                                        placeholder=""
                                        value={invoice_date}
                                        
                                        onChange={(e)=>setInvoice_date(e.target.value)}
                                        />
                                </div>
                            </div>
                            <div className="inline-flex items-center gap-4">
                                <div className="flex justify-end w-1/3">
                                    <label
                                    htmlFor="invoice_date_pm"
                                    className="flex-1 text-base font-semibold text-right text-gray-500"
                                    >
                                    <span className="text-lg text-red-500">*</span> Date de paiement :
                                    </label>
                                </div>
                                <div className="flex flex-col justify-start w-2/3">
                                    <div className="flex items-center justify-start gap-2">
                                    <select
                                        id="joursAvantPaiement"
                                        className="p-2 border rounded-lg focus:outline-none focus:ring-purple-500 focus:ring-1"
                                        value={joursAvantPaiementSelect}
                                        onChange={(e) => setJoursAvantPaiementSelect(e.target.value)}
                                    >
                                        <option value="10">10 jours</option>
                                        <option value="20">20 jours</option>
                                        <option value="30">30 jours</option>
                                    </select>
                                    <input
                                        type="date"
                                        id="invoice_date_pm"
                                        name="invoice_date_pm"
                                        required
                                        value={invoiceDatePm}
                                        onChange={(e) => setInvoiceDatePm(e.target.value)}
                                        className="w-full p-2 text-base text-gray-900 border rounded-lg placeholder:italic focus:outline-none focus:ring-purple-500 focus:ring-1"
                                    />
                                    </div>
                                </div>
                                </div>
                            <input type="hidden" id="invoice_status" name="invoice_status" value="1" />
                            <input type="hidden" id="idCustomer" name="idCustomer" value={data.customer.idCustomer}/>
                        </div>
                    </div>
                    {/* --SERVICE-- */}
                    <Search idEtp={idEtp} data={data} setSumFolder={setSumFolder} setSumItems={setSumItems} setSumProject={setSumProject} isFacture={isFacture} isEdit={isEdit} setSumCours={setSumCours}/>
                    {/*-- AFFICHAGE COUNT -- */}
                    <Count sumTotal={sumTotal} data={data} isEdit={isEdit}/>

                    {/* -- MODE DE PAIEMENT --*/}
                    <div className="px-12 py-8 text-base font-normal border-b">
                        <div>
                            <label htmlFor="idPaiement" className="block mb-2 text-base font-medium">
                                Choisissez le mode de paiement : <span className="text-lg text-red-500">* </span>
                            </label>
                            <select
                                id="idPaiement"
                                name="idPaiement"
                                required
                                value={selectPaymentValue}
                                onChange={(e)=>setSelectPaymentValue(e.target.value)}
                                className="p-2 mb-4 text-base border rounded focus:outline-none focus:ring-purple-500 focus:ring-1"
                            >
                                {data.pm.map((p) => (
                                    <option key={p.idTypePm} value={p.idTypePm}>
                                        {p.pm_type_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {isEdit &&     
                        <input type="hidden" id="idPay" name="idPay" value={data.invoice.idPaiement}/>
                        }
                        {selectPaymentValue !=3 && 
                            <div id="bank-acount">
                            <label htmlFor="idBankAcount" className="block mb-2 text-base font-medium">
                                Choisissez un compte bancaire : <span className="text-lg text-red-500">* </span>
                            </label>
                            <select
                                id="idBankAcount"
                                name="idBankAcount"
                                defaultValue={isEdit ?data.invoice.idTypePm : ''}
                                className="p-2 mb-4 text-base border rounded focus:outline-none focus:ring-purple-500 focus:ring-1"
                            >
                                <option value="" disabled>Sélectionner un compte</option>
                                {data.accounts.map((account) => (
                                    <option key={account.id} value={account.id}>
                                        {account.ba_titulaire} - {account.ba_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        }


                        <div className="flex flex-col gap-2 py-2">
                            <p className="text-base font-semibold text-gray-700">Condition de paiement :</p>
                            <textarea
                                id="invoice_condition"
                                name="invoice_condition"
                                className="w-1/3 p-2 text-base text-gray-500 border rounded-md outline-none"
                                placeholder="Exemple : (50% avant la formation - 50% après la formation)"
                            ></textarea>
                        </div>
                    </div>
                </div>
                {/*Footer */}
                <AjoutFacture data={data}/>
                {isEdit ? (
                        <div className="flex items-center justify-end gap-3 mx-12 mt-2 mb-12">
                        <div id="multi-error">
                        </div>
                        <button type="submit"
                            className="px-3 py-2 text-base rounded-full border-[1px] border-gray-400 bg-gray-600 text-white">
                            Sauver et apercevoir
                        </button>
                    </div>
                ):(
                    <div className="flex items-center justify-end gap-3 m-12">
                    <button className="btn btn-primary bg-[#A462A4]" type="submit">
                        Sauver et apercevoir
                    </button>
                </div>
                )}

            </form>
        </>
    )
}


