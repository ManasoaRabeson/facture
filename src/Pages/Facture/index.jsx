//     // 1 : liste de tous les factures 
//     // 2 : listes des factures non payes
//     // 3 : listes des factures échues
//     // 4 : listes des factures brouillons
//     // 5 : tableau de bord
//     // 6 : details facture
//     // 7 : nouveau facture (formulaire)
//     //8 : proforma
//     //9 : nouveau proforma (formulaire)
//     //10 : edit facture
//     // 11 : edit proforma
import { ListeFacture } from "./list/liste-facture";
export function Index({idInvoice}) {
  return (
      <>
      <ListeFacture idInvoice={idInvoice}/>
      </>
  );
 }
// function Content() {
//   // const { currentPage } = useContext(InvoiceContext);
//   // const renderPage = () => {
//   //   switch (currentPage) {
//   //     case 1:case 2:case 3: case 4:
//   //       return <ListeFacture />;
//   //     case 5:
//   //       return <TableauDeBord />;
//   //     case 6:
//   //       return <VoirDetails />;
//   //     case 7:
//   //       return <NewInvoice />;
//   //     case 8:
//   //       return <ListeProforma />;
//   //     case 9:
//   //       return <NewProforma />;
//   //     case 10 : 
//   //     return <EditInvoice/>
//   //     case 11 : 
//   //     return <EditProforma/>
//   //     case  100 : 
//   //     return <GererProfil/> 
//   //   }
//   // };

//   return (
//     // <div className="flex flex-col min-h-screen bg-white">
//     //   <NavBarFacture />
//     //   <div className="flex-grow pt-20 lg:pt-20">{renderPage()}</div>
//     //   <Footer />
//     // </div>
//     <>

//     </>
//   );
// }
// const { setCurrentPage, setIdInvoice, currentPage } = useContext(InvoiceContext);