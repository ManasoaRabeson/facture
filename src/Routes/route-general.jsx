import { Route, Routes } from 'react-router-dom';
import { WelcomeContent } from '../Pages/welcome-content';
import { Index } from '../Pages/Facture';
import PrivateRoute from './private-route';
import { LoginHome } from '../Pages/Auth/login-form';
import { TableauDeBord } from '../Pages/Facture/tableau-de-bord';
import { ProformaList } from '../Pages/Proforma/proforma-list';
import { VoirDetails } from '../Pages/Facture/Details/voir-details';
import { InvoiceProvider } from '../Contexts/invoice';
import { InvoiceContent } from '../Components/content/invoice-content';
import { NewInvoice } from '../Pages/Facture/Formulaire/new-invoice';
import { NewProforma } from '../Pages/Proforma/formulaire/new-proforma';
import { EditProforma } from '../Pages/Proforma/formulaire/edit-proforma';
import { EditInvoice } from '../Pages/Facture/Formulaire/edit-invoice';
import { Register } from '../Pages/Auth/register';

export function GenRoute() {
  const INVOICE_TYPES = {
    ALL: 1,
    UNPAID: 2,
    OVERDUE: 3,
    DRAFTS: 4
  };

  return (
    <InvoiceProvider>
      <Routes>
        <Route path="/" element={<WelcomeContent />} />
        <Route path="/login" element={<LoginHome />} />
        <Route path="/register" element={<Register />} />

        {/* Route facture */}
        <Route path="/*" element={<InvoiceContent />}>
          <Route path="liste" element={<PrivateRoute element={<Index idInvoice={INVOICE_TYPES.ALL} />} />} />
          <Route path="non-paye" element={<PrivateRoute element={<Index idInvoice={INVOICE_TYPES.UNPAID} />} />} />
          <Route path="echue" element={<PrivateRoute element={<Index idInvoice={INVOICE_TYPES.OVERDUE} />} />} />
          <Route path="brouillons" element={<PrivateRoute element={<Index idInvoice={INVOICE_TYPES.DRAFTS} />} />} />
          <Route path="tableau-de-bord" element={<PrivateRoute element={<TableauDeBord />} />} />
          <Route path="details" element={<PrivateRoute element={<VoirDetails />} />} />
          <Route path="new-invoice" element={<PrivateRoute element={<NewInvoice />} />} />
          <Route path="edit-invoice" element={<PrivateRoute element={<EditInvoice />} />} />
            {/* Route proforma */}
          <Route path="proforma" element={<PrivateRoute element={<ProformaList />} />} />
          <Route path="new-proforma" element={<PrivateRoute element={<NewProforma />} />} />
          <Route path="edit-proforma" element={<PrivateRoute element={<EditProforma />} />} />
        </Route>
      </Routes>
    </InvoiceProvider>
  );
}
