import { Route, Routes } from 'react-router-dom';
import { ContenuAccueil } from '../Pages/ContenuAccueil';
import { Index } from '../Pages/Facture';
import EtudiantList from '../Pages/test';
import PrivateRoute from './private-route';

export function GenRoute() {
  return (
    <Routes>
      <Route path="/" element={<ContenuAccueil />} />
      <Route
        path="/facture"
        element={<PrivateRoute element={<Index />} />}
      />
      <Route path="/etu" element={<EtudiantList />} />
    </Routes>
  );
}
