import axios from "axios";

export const handleApprouve = async(idInvoice,setData,index) =>{
    try {
      // console.log(sessionStorage.getItem('token'));
      
      const response = await axios.post(`http://127.0.0.1:8000/api/cfp/factures/${idInvoice}/approve`,{}, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      
     //window.location.reload();
     if(response.data){
      setData(prevData => ({
        ...prevData,
        invoices: {
          ...prevData.invoices,
          data: prevData.invoices.data.map((invoice, i) => {
            if (i === index) { 
              return {
                ...invoice,
                invoice_status: 2,
                status_color : "rose-500",
                status : {...invoice.status ,
                  idInvoiceStatus: 2,
                  invoice_status_name : "Non envoyé" 
                  }
              };
            } else {
              return invoice;
            }
          })
        }
      }));
     }

    } catch (error) {
      console.error('Erreur lors de l’approbation :', error);
    }
  }
  export const handleApprouveDraft = async(idInvoice) =>{
    try {
     const response = await axios.post(`http://127.0.0.1:8000/api/cfp/factures/${idInvoice}/approve`,{},{
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
              }
     });
     if(response.data){
      window.location.reload();
     }
   
    //  setData(prevData => ({
    //   ...prevData,
    //   invoicesDraft: {
    //     ...prevData.invoicesDraft,
    //     invoicesDraft: prevData.invoicesDraft.map((invoice, i) => {
    //       if (i === index) { 
    //         return {
    //           ...invoice,
    //           invoice_status: 2,
    //           status : {...invoice.status ,
    //             idInvoiceStatus: 2,
    //             invoice_status_name : "Non envoyé" 
    //             }
    //         };
    //       } else {
    //         return invoice;
    //       }
    //     })
    //   }
    // }));
    // console.log(data);
    
    } catch (error) {
      console.error('Erreur lors de l’approbation :', error);
    }
  }
  export const handleCancel = async(idInvoice,setData,index)=>{
    try {
      const response= await axios.post(`http://127.0.0.1:8000/api/cfp/factures/${idInvoice}/cancel`,{},{
        headers:{
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }});
      if(response.data.message ==="OK"){
        setData(prevData => ({
          ...prevData,
          invoices: {
            ...prevData.invoices,
            data: prevData.invoices.data.map((invoice, i) => {
              if (i === index) { 
                return {
                  ...invoice,
                  invoice_status: 9,
                  status_color : "rose-500",
                  status : {...invoice.status ,
                    idInvoiceStatus: 9,
                    invoice_status_name : "Annulé" 
                    }
                };
              } else {
                return invoice;
              }
            })
          }
        }));
      }
      //window.location.reload();

    } catch (error) {
      console.error('Erreur lors de l\'annulation :', error);
    }
  }
  export const handleSendEmail = async(idInvoice,setData,index) => {
    try {
      // Effectuer un appel POST avec des données dans le body
   const response =  await axios.post(`http://127.0.0.1:8000/api/cfp/factures/send-invoice-email/${idInvoice}`,{},{
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }
    });
    //console.log(response.data.status);
    
      //console.log(response.data.success);
      //window.location.reload();
      if(response.data.status === 200) {
        setData(prevData => ({
          ...prevData,
          invoices: {
            ...prevData.invoices,
            data: prevData.invoices.data.map((invoice, i) => {
              if (i === index) { 
                return {
                  ...invoice,
                  invoice_status: 3,status_color : "[#37718e]",
                  status : {...invoice.status ,
                    idInvoiceStatus: 3,
                    invoice_status_name : "Envoyé" 
                    }
                };
              } else {
                return invoice;
              }
            })
          }
        }));
      }
      
    } catch (err) {
      console.error('Erreur lors de l\'envoi des données:', err);
    }
  }
  