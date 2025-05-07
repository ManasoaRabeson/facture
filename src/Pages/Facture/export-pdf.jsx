import { useEffect, useState } from 'react';
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/fr";
dayjs.locale("fr");

export const ExportPdf = ({ id }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const digitalOcean = 'https://formafusionmg.ams3.cdn.digitaloceanspaces.com/formafusionmg';
    const formatDate = (date) => dayjs(date).format("D MMMM YYYY");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://127.0.0.1:8000/api/cfp/factures/export/74`);
                setData(res.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;
    if (!data) return null;

    return (
        <>
            <div className="container body">
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td>
                                <img
                                    src={`${digitalOcean}/img/entreprises/${data.invoice.logo || ''}`}
                                    alt="Logo-Organisme_de_Formation"
                                    className="logo"
                                />
                            </td>
                            <td className="header-exped">
                                <h2>{data.invoice.typeFacture}</h2>
                                <h5 className="title">{data.invoice.customerName ? data.invoice.customerName : 'Pas de nom'}</h5>
                                <h5>Adresse : {data.invoice.customer_addr_lot || data.invoice.customer_addr_quartier
                                    ? `${data.invoice.customer_addr_lot || ''} ${data.invoice.customer_addr_quartier || ''}`.trim()
                                    : "pas d'adresse"}</h5>
                                <h5>NIF : {data.invoice.nif ? data.invoice.nif : 'pas de numero nif'} |
                                    STAT : {data.invoice.stat ? data.invoice.stat : 'pas de numero stat'}</h5>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <hr />

                <table className="w-full">
                    <tbody>
                        <tr>
                            <td className="w-deuxtiers" style={{ lineHeight: '0em' }}>
                                <h4 className="title"> {data.entreprise.etp_name || "pas de nom d'entreprise"}</h4>
                                <h5 className="title">
                                    {data.entreprise.etp_addr_lot || data.entreprise.etp_addr_quartier
                                        ? `${data.entreprise.etp_addr_lot || ""} ${data.entreprise.etp_addr_quartier || ""}`
                                        : "pas d'adresse"}
                                </h5>
                                <h5>Antananarivo {data.entreprise.etp_addr_code_postal}, Madagascar</h5>
                                <h5>NIF : {data.entreprise.etp_nif || ""}</h5>
                                <h5>STAT : {data.entreprise.etp_stat || ""}</h5>
                            </td>
                            <td>
                                <table className="w-full">
                                    <tbody>
                                        <tr>
                                            <td style={{ lineHeight: '0em' }}>
                                                <h5>Numéro de facture :</h5>
                                                {data.invoice.idTypeFacture !== 2 && <h5>Numéro B.C :</h5>}
                                                <h5>Date de facture :</h5>
                                                {data.invoice.idTypeFacture !== 2 ?('Date de paiement :')
                                                :("Valable jusqu'au :")}
                                                <h5>Montant due (MGA) :</h5>
                                            </td>
                                            <td className="header-about">
                                                <h5>{data.invoice.invoice_number}</h5>
                                                {data.invoice.idTypeFacture !== 2 && <h5>{data.invoice.invoice_bc}</h5>}
                                                <h5>{formatDate(data.invoice.invoice_date)}</h5>
                                                <h5>{formatDate(data.invoice.invoice_date_pm)}</h5>
                                                <h5>   Ar{" "}
                                                    {data.invoice.invoice_total_amount.toLocaleString("fr-FR")}</h5>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table>
                    <thead>
                        <tr>
                            <th>Services</th>
                            <th>Description</th>
                            <th className="qte">Qté</th>
                            <th>Unité</th>
                            <th>P.U</th>
                            <th>Montant</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.invoiceDetails.map((item, idx) => (
                            <tr key={`details-${idx}`} className="normal-row">
                                <td style={{ fontSize: '0.83em' }}>Projet : {item.module_name}</td>
                                <td style={{ fontSize: '0.83em' }}>{item.item_description}</td>
                                <td style={{ fontSize: '0.83em' }} className="text-center qte">
                                    {item.item_qty}
                                </td>
                                <td style={{ fontSize: '0.83em' }} className="text-center">
                                    {item.unit_name}
                                </td>
                                <td style={{ fontSize: '0.83em' }} className="text-center">
                                    Ar {Number(item.item_unit_price).toLocaleString('fr-FR')}
                                </td>
                                <td style={{ fontSize: '0.83em' }} className="text-center">
                                    Ar {Number(item.item_total_price).toLocaleString('fr-FR')}
                                </td>
                            </tr>
                        ))}
                        {data.invoiceDetailsOther.map((item, idx) => (
                            <tr key={`other-${idx}`} className="normal-row">
                                <td style={{ fontSize: '0.83em' }}>{item.Frais}</td>
                                <td style={{ fontSize: '0.83em' }}>{item.item_description}</td>
                                <td style={{ fontSize: '0.83em' }} className="text-center">
                                    {item.item_qty}
                                </td>
                                <td style={{ fontSize: '0.83em' }} className="text-center">
                                    {item.unit_name}
                                </td>
                                <td style={{ fontSize: '0.83em' }} className="text-center">
                                    Ar {Number(item.item_unit_price).toLocaleString('fr-FR')}
                                </td>
                                <td style={{ fontSize: '0.83em' }} className="text-center">
                                    Ar {Number(item.item_total_price).toLocaleString('fr-FR')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <hr />

                <div className="summary">
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td style={{ width: '72%' }}></td>
                                <td>
                                    <table className="w-full">
                                        <tbody>
                                            <tr>
                                                <td style={{ lineHeight: '0em' }}>
                                                    <h5>Sous-total :</h5>
                                                    <h5>Réduction :</h5>
                                                    {!data.invoice.invoice_tva && <h5>TVA 20% :</h5>}
                                                    <hr />
                                                    <h5>Total :</h5>
                                                    <hr />
                                                </td>
                                                <td className="header-about">
                                                    <h5>Ar {Number(data.invoice.invoice_sub_total).toLocaleString('fr-FR')}</h5>
                                                    <h5>Ar {Number(data.invoice.invoice_reduction).toLocaleString('fr-FR')}</h5>
                                                    {!data.invoice.invoice_tva && (
                                                    <h5>Ar {Number(data.invoice.invoice_tva).toLocaleString('fr-FR')}</h5>
                                                    )}
                                                    <hr />
                                                    <h5>Ar {Number(data.invoice.invoice_total_amount).toLocaleString('fr-FR')}</h5>
                                                    <hr />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div>
                    <h5>
                        Arrêtée la présente facture à la somme de{' '}
                        <span className="uppercase">{data.invoice.invoice_letter}</span> ARIARY.
                    </h5>
                </div>
                <hr />

                <div className="notes">
                    <h5 className="notes-title">Notes / Termes</h5>
                    <h6>Paiement par {data.invoice.pm_type_name}</h6>

                    {data.invoice.idTypePm === 1 && (
                        <>
                            <h6>Veuillez libeller le chèque à l'ordre de "{data.invoice.ba_titulaire}"</h6>
                            {data.invoice.invoice_condition && (
                                <h6 className="condition">Condition de paiement : {data.invoice.invoice_condition}</h6>
                            )}
                        </>
                    )}

                    {data.invoice.idTypePm === 2 && (
                        <>
                            <h6>RIB</h6>
                            <h6>Titulaire du compte {data.invoice.ba_titulaire}</h6>
                            <h6>
                                Banque {data.invoice.ba_name} {data.invoice.ba_quartier}, {data.invoice.ville_name} {data.invoice.vi_code_postal}
                            </h6>
                            <h6>Compte N° {data.invoice.ba_account_number}</h6>
                            {data.invoice.invoice_condition && (
                                <h6 className="condition">Condition de paiement : {data.invoice.invoice_condition}</h6>
                            )}
                        </>
                    )}

                    {!data.invoice.idTypePm || (data.invoice.idTypePm !== 1 && data.invoice.idTypePm !== 2) && data.invoice.invoice_condition && (
                        <h6 className="condition">Condition de paiement : {data.invoice.invoice_condition}</h6>
                    )}
                </div>

                <div className="footer-info">
                    <div>
                        <h6>
                            {data.invoice.customerName || 'Pas de nom'} | NIF : {data.invoice.nif || 'Pas de numero NIF'} | STAT :{' '}
                            {data.invoice.stat || 'Pas de numero STAT'} | RCS : {data.invoice.rcs || 'Pas de numero rcs'}
                        </h6>
                        <h6>
                            MAIL : {data.invoice.customerEmail || 'Pas d’adresse email'} | ADRESSE :{' '}
                            {data.invoice.customer_addr_lot || data.invoice.customer_addr_quartier || data.invoice.customer_addr_code_postal
                            ? `${data.invoice.customer_addr_lot} ${data.invoice.customer_addr_quartier} ${data.invoice.customer_addr_code_postal}`
                            : "pas d'adresse"}{' '}
                            | TELEPHONE : (+261) {data.invoice.customerPhone || 'pas de numero téléphone'}
                        </h6>
                        <h6>SITE WEB : {data.invoice.siteWeb || 'pas de lien site web'}</h6>
                    </div>
                </div>
            </div>
        </>
    );
};
