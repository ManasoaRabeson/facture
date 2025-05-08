import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { HeaderInvoice } from "./header-invoice";
import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { InvoiceContext } from "../../../Contexts/invoice";
import { Spinner } from "../../../Components/spinner";
dayjs.locale("fr");
export function VoirDetails(){
  const { idInvoice} = useContext(InvoiceContext);
    const digitalOcean = 'https://formafusionmg.ams3.cdn.digitaloceanspaces.com/formafusionmg'
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // optionnel
    const [error, setError] = useState(null);     // optionnel
    const formatDate = (date) => dayjs(date).format("D MMMM YYYY");
    const formatNumber = (number) => Number(number).toLocaleString("fr-FR");
   
    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
            const res = await axios.get(`http://127.0.0.1:8000/api/cfp/factures/${idInvoice}`,{
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
              }
            }
            );
            setData(res.data);
          } catch (err) {
            setError(err);
          } finally {
            setLoading(false);
          }
          };
        fetchData();
      }, [idInvoice]);
        if (loading) return  <Spinner/>
        if (error) return <p>Erreur : {error.message}</p>;

      
    return(
        <>

            <div className="flex flex-col w-full sm:w-[1280px] lg:w-full gap-3 px-8">
              <HeaderInvoice data={data} />
              <div className="border-t-[1px] border-gray-100 rounded-sm w-full bg-white py-10 flex flex-col gap-6">
                <div className="inline-flex justify-between w-full px-8">
                  <div className="w-full">
                    <img
                      src={`${digitalOcean}/img/entreprises/${data.invoice.logo || ''}`}
                      alt="Logo-Organisme_de_Formation"
                      className="h-[88px] rounded-md"
                    />
                  </div>

                      <div className="flex flex-col w-full gap-3">
                          <div className="flex flex-col gap-1">
                              <h1 className="text-4xl font-medium text-right text-gray-700">{data.invoice.typeFacture }</h1>
                              <h4 className="text-lg font-semibold text-right text-gray-700">
                                  { data.invoice.name ? data.invoice.name : 'Pas de nom' }
                              </h4>
                          </div>
                          <div className="flex flex-col">
                              <div className="flex items-center justify-end gap-2">
                                  <div className="flex items-center gap-2">
                                      <p className="font-semibold text-gray-700">Adresse :</p>
                                      <p className="text-gray-600">
                                      {data.invoice.customer_addr_lot || data.invoice.customer_addr_quartier
                                        ? `${data.invoice.customer_addr_lot || ''} ${data.invoice.customer_addr_quartier || ''}`.trim()
                                        : "pas d'adresse"}
                                      </p>
                                  </div>
                              </div>
                              <div className="flex items-center justify-end gap-2">
                                  <div className="flex items-center gap-2">
                                      <p className="font-semibold text-gray-700">NIF :</p>
                                      <p className="text-gray-500"> { data.invoice.nif ? data.invoice.nif : 'pas de numero nif' }</p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                      <p className="font-semibold text-gray-700">STAT :</p>
                                      <p className="text-gray-500">{ data.invoice.stat ? data.invoice.stat : 'pas de numero stat' }</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <hr className="border" />
                      <div className="inline-flex justify-between w-full px-8">
                        <div className="flex flex-col w-full">
                          <h4 className="text-lg font-bold text-gray-800 uppercase">
                            {data.entreprise.etp_name || "pas de nom d'entreprise"}
                          </h4>

                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-gray-700">Adresse :</p>
                            <p className="text-gray-700">
                              {data.entreprise.etp_addr_lot || data.entreprise.etp_addr_quartier
                                ? `${data.entreprise.etp_addr_lot || ""} ${data.entreprise.etp_addr_quartier || ""}`
                                : "pas d'adresse"}
                            </p>
                          </div>

                          <p className="text-base text-gray-700">
                            Antananarivo {data.entreprise.etp_addr_code_postal}, Madagascar
                          </p>

                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-gray-700">NIF :</p>
                            <p className="text-base text-gray-700">
                              {data.entreprise.etp_nif || "Pas de numero NIF"}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-gray-700">STAT :</p>
                            <p className="text-base text-gray-700">
                              {data.entreprise.etp_stat || "Pas de numero NIF"}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 w-[30%]">
                          <div className="flex flex-col items-start">
                            <div className="inline-flex items-center justify-between w-full gap-2">
                              <h4 className="w-full text-lg font-semibold text-left text-gray-700">
                                Numéro de facture :
                              </h4>
                              <p className="w-full text-lg text-right text-gray-700">
                                {data.invoice.invoice_number}
                              </p>
                            </div>

                            {data.invoice.idTypeFacture !== 2 && (
                              <div className="inline-flex items-center justify-between w-full gap-2">
                                <h4 className="w-full text-lg font-semibold text-left text-gray-700">
                                  Numéro B.C :
                                </h4>
                                <p className="w-full text-lg text-right text-gray-700">
                                  {data.invoice.invoice_bc}
                                </p>
                              </div>
                            )}

                            <div className="inline-flex items-center justify-between w-full gap-2">
                              <h4 className="w-full text-lg font-semibold text-left text-gray-700">
                                Date de facture :
                              </h4>
                              <p className="w-full text-lg text-right text-gray-700 capitalize">
                                {formatDate(data.invoice.invoice_date)}
                              </p>
                            </div>

                            <div className="inline-flex items-center justify-between w-full gap-2">
                              <h4 className="w-full text-lg font-semibold text-left text-gray-700">
                                {data.invoice.idTypeFacture !== 2
                                  ? "Date de paiement :"
                                  : "Valable jusqu'au :"}
                              </h4>
                              <p className="w-full text-lg text-right text-gray-700 capitalize">
                                {formatDate(data.invoice.invoice_date_pm)}
                              </p>
                            </div>

                            <div className="inline-flex items-center justify-between w-full gap-2 py-2 bg-gray-100 rounded-sm">
                              <h4 className="w-full text-lg font-semibold text-left text-gray-700">
                                Montant dû (MGA) :
                              </h4>
                              <p className="w-full text-lg font-semibold text-right text-gray-700">
                                Ar{" "}
                                {data.invoice.invoice_total_amount.toLocaleString("fr-FR")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Fin sub header*/}
                      {/*Content */}
                      <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-[#CE9D13]">
                              <th className="px-8 py-2 w-[20%] text-white">Services</th>
                              <th className="px-8 py-2 w-[20%] text-white">Description</th>
                              <th className="px-8 py-2 w-[10%] text-white text-center">Quantité</th>
                              <th className="px-8 py-2 w-[10%] text-white text-center">Unité</th>
                              <th className="px-8 py-2 w-[10%] text-white text-right">Prix Unitaire</th>
                              <th className="px-8 py-2 w-[11%] text-white text-right">Montant</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.invoiceDetails.map((detail, index) => (
                              <tr key={`main-${index}`} className="hover:bg-gray-50 border-b-[2px]">
                                <td className="px-8 py-3 text-base font-semibold text-gray-700">
                                  Projet : {detail.module_name}
                                </td>
                                <td className="px-8 py-3 text-base font-semibold text-gray-700">
                                  {detail.item_description}
                                </td>
                                <td className="px-8 py-3 text-base font-semibold text-center text-gray-700">
                                  {detail.item_qty}
                                </td>
                                <td className="px-8 py-3 text-base font-semibold text-center text-gray-700">
                                  {detail.unit_name}
                                </td>
                                <td className="px-8 py-3 text-base font-semibold text-right text-gray-700">
                                  Ar {formatNumber(detail.item_unit_price)}
                                </td>
                                <td className="px-8 py-3 text-base font-semibold text-right text-gray-700">
                                  Ar {formatNumber(detail.item_total_price)}
                                </td>
                              </tr>
                            ))}

                            {data.invoiceDetailsOther.map((detail, index) => (
                              <tr key={`other-${index}`} className="hover:bg-gray-50 border-b-[2px]">
                                <td className="px-8 py-3 text-base font-semibold text-gray-700">
                                  {detail.Frais}
                                </td>
                                <td className="px-8 py-3 text-base font-semibold text-gray-700">
                                  {detail.item_description}
                                </td>
                                <td className="px-8 py-3 text-base font-semibold text-center text-gray-700">
                                  {detail.item_qty}
                                </td>
                                <td className="px-8 py-3 text-base font-semibold text-center text-gray-700">
                                  {detail.unit_name}
                                </td>
                                <td className="px-8 py-3 text-base font-semibold text-right text-gray-700">
                                  Ar {formatNumber(detail.item_unit_price)}
                                </td>
                                <td className="px-8 py-3 text-base font-semibold text-right text-gray-700">
                                  Ar {formatNumber(detail.item_total_price)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="flex flex-col gap-2 px-8 py-2 pr-3">
                          <div className="inline-flex justify-end w-full items-center gap-[70px] px-4">
                            <p className="text-base font-bold text-right text-gray-800">Sous-total :</p>
                            <p className="text-base font-semibold text-right text-gray-700">
                              Ar {formatNumber(data.invoice.invoice_sub_total)}
                            </p>
                          </div>

                          <div className="inline-flex justify-end w-full items-center gap-[80px] px-4">
                            <p className="text-base font-medium text-right text-gray-600">Réduction :</p>
                            <p className="text-base font-semibold text-right text-gray-700">
                              Ar {formatNumber(data.invoice.invoice_reduction)}
                            </p>
                          </div>

                          {data.invoice.invoice_tva === 0 && (
                            <div className="inline-flex justify-end w-full items-center gap-[80px] px-4">
                              <p className="text-base font-medium text-right text-gray-600">TVA 20% :</p>
                              <p className="text-base font-semibold text-right text-gray-700">
                                Ar {formatNumber(data.invoice.invoice_tva)}
                              </p>
                            </div>
                          )}

                          <div className="inline-flex justify-end my-3">
                            <hr className="border w-[240px]" />
                          </div>

                          <div className="inline-flex justify-end w-full items-center gap-[70px] px-4">
                            <p className="text-base font-bold text-right text-gray-800">Total :</p>
                            <p className="text-base font-semibold text-right text-gray-700">
                              Ar {formatNumber(data.invoice.invoice_total_amount)}
                            </p>
                          </div>

                          <div className="inline-flex justify-end my-3">
                            <hr className="border w-[240px]" />
                          </div>
                        </div>
                        <div className="px-8 py-8">
                            <p className="text-base font-semibold text-gray-700">
                              Arrêtée la présente facture à la somme de{" "}
                              <span className="uppercase">{data.invoice.invoice_letter}</span> ARIARY.
                            </p>
                        </div>
                        {/*FIN CONTENT*/}
                        {/*CONTENT MODE DE PAIEMENT */}

                        <div className="flex flex-col gap-3 px-8">
                            <div className="flex flex-col gap-2">
                              <div className="flex flex-col">
                                <p className="text-base font-bold text-gray-700">Notes / Termes</p>
                                <p className="text-base text-gray-700 normal-case">
                                  Paiement par {data.invoice.pm_type_name}
                                </p>
                              </div>

                              {data.invoice.idTypePm === 1 ? (
                                <div className="flex flex-col gap-4">
                                  <p className="text-base text-gray-700">
                                    Veuillez libeller le chèque à l'ordre de "{data.invoice.ba_titulaire}"
                                  </p>
                                  {data.invoice.invoice_condition && (
                                    <p className="text-base text-gray-700">
                                      Condition de paiement : {data.invoice.invoice_condition}
                                    </p>
                                  )}
                                </div>
                              ) : data.invoice.idTypePm === 2 ? (
                                <div className="flex flex-col gap-4">
                                  <div className="flex flex-col">
                                    <p className="text-base font-semibold text-gray-700">RIB</p>
                                    <p className="text-base text-gray-700">
                                      Titulaire du compte {data.invoice.ba_titulaire}
                                    </p>
                                    <p className="text-base text-gray-700">
                                      Banque {data.invoice.ba_name} {data.invoice.ba_quartier},{" "}
                                      {data.invoice.ville_name} {data.invoice.vi_code_postal}
                                    </p>
                                    <p className="text-base text-gray-700">
                                      Compte N° {data.invoice.ba_account_number}
                                    </p>
                                  </div>
                                  {data.invoice.invoice_condition && (
                                    <p className="text-base text-gray-700">
                                      Condition de paiement : {data.invoice.invoice_condition}
                                    </p>
                                  )}
                                </div>
                              ) : (
                                data.invoice.invoice_condition && (
                                  <div>
                                    <p className="mt-4 text-base text-gray-700">
                                      Condition de paiement : {data.invoice.invoice_condition}
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                          {/* FIN CONTENT MODE DE PAIEMENT*/}
                          <div className="flex flex-col gap-2 py-8">
                            <div className="inline-flex justify-center w-full gap-4 px-8 flex-wrap">
                              <div className="inline-flex items-center justify-center gap-2">
                                <p className="text-lg text-gray-400">
                                  {data.invoice.name || "Pas de nom"}
                                </p>
                              </div>
                              <span className="text-lg text-gray-400">|</span>
                              <div className="inline-flex items-center justify-center gap-2">
                                <p className="text-lg text-gray-400">NIF :</p>
                                <p className="text-lg text-gray-400">
                                  {data.invoice.nif || "Pas de numero NIF"}
                                </p>
                              </div>
                              <span className="text-lg text-gray-400">|</span>
                              <div className="inline-flex items-center justify-center gap-2">
                                <p className="text-lg text-gray-400">STAT :</p>
                                <p className="text-lg text-gray-400">
                                  {data.invoice.stat || "Pas de numero STAT"}
                                </p>
                              </div>
                              <span className="text-lg text-gray-400">|</span>
                              <div className="inline-flex items-center justify-center gap-2">
                                <p className="text-lg text-gray-400">RCS :</p>
                                <p className="text-lg text-gray-400">
                                  {data.invoice.rcs || "Pas de numero rcs"}
                                </p>
                              </div>
                            </div>

                            <div className="inline-flex justify-center w-full gap-4 px-8 flex-wrap">
                              <div className="inline-flex items-center justify-center gap-2">
                                <p className="text-lg text-gray-400">MAIL :</p>
                                <p className="text-lg text-gray-400">
                                  {data.invoice.mail || "Pas d'adresse email"}
                                </p>
                              </div>
                              <span className="text-lg text-gray-400">|</span>
                              <div className="inline-flex items-center justify-center gap-2">
                                <p className="text-lg text-gray-400">ADRESSE :</p>
                                <p className="text-lg text-gray-400">
                                  {(data.invoice.customer_addr_lot || data.invoice.customer_addr_quartier || data.invoice.customer_addr_code_postal)
                                    ? `${data.invoice.customer_addr_lot ?? ""} ${data.invoice.customer_addr_quartier ?? ""} ${data.invoice.customer_addr_code_postal ?? ""}`
                                    : "pas d'adresse"}
                                </p>
                              </div>
                              <span className="text-lg text-gray-400">|</span>
                              <div className="inline-flex items-center justify-center gap-2">
                                <p className="text-lg text-gray-400">TELEPHONE :</p>
                                <p className="text-lg text-gray-400">
                                  {data.invoice.phone || "pas de numero téléphone"}
                                </p>
                              </div>
                              <span className="text-lg text-gray-400">|</span>
                              <div className="inline-flex items-center justify-center gap-2">
                                <p className="text-lg text-gray-400">SITE WEB :</p>
                                <p className="text-lg text-gray-400">
                                  {data.invoice.website || "pas de lien site web"}
                                </p>
                              </div>
                            </div>
                          </div>
              </div>
            </div>
        </>
    )
}
