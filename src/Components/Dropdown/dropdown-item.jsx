import React, { useContext } from 'react';
import axios from 'axios';
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { ExportPdf } from '../../Services/export-pdf';
import { InvoiceContext } from '../../Contexts/invoice';
dayjs.locale("fr");

const DropdownItem = ({
  type = '',
  titre = '',
  action = '',
  nature = '',
  onClick = () => {},
  idInvoice,
  drawerClick,
  data,
  setData
})=> {
  // const formatDate = (date) => dayjs(date).format("D MMMM YYYY");
  const { setCurrentPage,setIdInvoice } = useContext(InvoiceContext);
  const handleClick = async () => {
    if (titre === "Exporter en PDF") {
      ExportPdf(idInvoice);
    } else if (titre === "Supprimer") {
      try {
        await axios.get(`http://127.0.0.1:8000/api/cfp/factures/${idInvoice}/destroy`,{
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
          });
        const filtrer = data.invoices.data.filter(invoice => invoice.idInvoice !== idInvoice);
        setData(prevData => ({
          ...prevData,
          invoices: {
            ...prevData.invoices,
            data: filtrer
          }
        }));
      } catch (error) {
        alert(error);
      }
    }else if(nature ==="EditerInvoice"){
      setCurrentPage(10);
      setIdInvoice(idInvoice);
    } else if(nature ==="EditerProforma")
    {
      setCurrentPage(11);
      setIdInvoice(idInvoice);
    }else {
      setCurrentPage(6);
      setIdInvoice(idInvoice);
    }
  };

  const renderByType = () => {
    switch (type) {
      case 'lien':
        return (
          <li>
            <a onClick={handleClick} className="dropdown-item hover:bg-gray-50 text-base text-gray-600">
              {titre}
            </a>
          </li>
        );
      case 'buttonDelete':
        return (
          <li className="z-50">
            <form action={action} method="post">
              <button type="submit" className="dropdown-item hover:bg-gray-50 text-base text-gray-600">
                {titre}
              </button>
            </form>
          </li>
        );
      case 'customBtn':
        return (
          <li>
            <button onClick={onClick} type="button" className="dropdown-item hover:bg-gray-50 text-base text-gray-600">
              {titre}
            </button>
          </li>
        );
      case 'drawer':
        return (
          <li>
            <a onClick={drawerClick} className="dropdown-item hover:bg-gray-50 text-base text-gray-600">
              {titre}
            </a>
          </li>
        );
      default:
        return null;
    }
  };

  return renderByType();
};

export default React.memo(DropdownItem);
