import { useEffect, useState } from "react";
import { AddProject } from "../../../Components/FactureItems/add-project";
import { AddFolder } from "../../../Components/FactureItems/add-folder";
import { AddItems } from "../../../Components/FactureItems/add-items"; 
import { AddCours } from "../../../Components/FactureItems/add-cours";

export function Search({ idEtp, data, setSumFolder, setSumItems, setSumProject, setSumCours, IsProforma, isFacture, isEdit }) {
  const [items, setItems] = useState([]);
  const [itemsCours, setItemsCours] = useState([]);
  const [items2, setItems2] = useState([]);

  const [OpenFolder, setOpenFolder] = useState(false);
  const [OpenProject, setOpenProject] = useState(false);
  const [OpenItem, setOpenItem] = useState(false);
  const [OpenCours, setOpenCours] = useState(false);

  const [itemCount, setItemCount] = useState(100);
  const [itemCountProjet, setItemCountProjet] = useState(0);
  const [itemCountCours, setItemCountCours] = useState(200);
  //edit 
  useEffect(() => {
    if (isEdit === "facture" ) {
      let currentIndex = itemCountProjet; // supposé venir d'un state
      const updatedItems = data.invoiceDetailsProjets.map((details) => {
        return {
          id: currentIndex++, // clé unique pour le formulaire
          idProjet: details.idProjet,
          idItems: 0,
          item_description: details.item_description || "",
          item_qty: details.item_qty,
          idUnite: details.idUnite,
          unit_name: details.unit_name,
          item_unit_price: parseInt(details.item_unit_price),
          item_total_price: parseInt(details.item_total_price),
        };
      });
      
      setItems(updatedItems);
      setItemCountProjet(currentIndex); // n'oublie pas de mettre à jour ton compteur global
      setOpenProject(true);
      let currentIndexFrais = itemCount;
      const updatedFrais = data.invoiceDetails.map((details) => {
          return {
            id: currentIndexFrais++,
            idFrais: details.idItems,
            frais: details.Frais,
            description: details.item_description || "",
            qty: details.item_qty,
            idUnite: details.idUnite,
            unitPrice: parseInt(details.item_unit_price),
            unit_name: details.unit_name,
            item_total_price: parseInt(details.item_total_price),
          };
      });
      setItems2(updatedFrais);
      setItemCount(currentIndexFrais) ;
      setOpenItem(true);
      }if(isEdit ==="proforma"){
      let currentIndexFrais = itemCount;
      const updatedFrais = data.invoiceDetails.map((details) => {
          return {
            id: currentIndexFrais++,
            idFrais: details.idItems,
            frais: details.Frais,
            description: details.item_description || "",
            qty: details.item_qty,
            idUnite: details.idUnite,
            unitPrice: parseInt(details.item_unit_price),
            unit_name: details.unit_name,
            item_total_price: parseInt(details.item_total_price),
          };
      });
      setItems2(updatedFrais);
      setItemCount(currentIndexFrais) ;
      setOpenItem(true);
      let currentIndexCours = itemCountCours;
      const updatedCours = data.invoiceDetailsCours.map((details) => {
          return {
            id: currentIndexCours++,
            idModule: details.idModule,
            idItems: details.idItems,
            item_description: details.item_description || "",
            item_qty: details.item_qty,
            idUnite: details.idUnite,
            item_unit_price: parseInt(details.item_unit_price),
            unit_name: details.unit_name,
            item_total_price: parseInt(details.item_total_price),
          };
      });
      setItemsCours(updatedCours);
      setItemCountCours(currentIndexCours) ;
      setOpenCours(true);
    }
  }, [isEdit, data]);

  const addItem = (type) => {
    if (!idEtp) {
      alert("Veuillez sélectionner un client d'abord");
      return;
    }

    if (type === "addFolder") {
      setOpenFolder(true);
    }

    if (type === "addProject") {
      setItems(prev => [
        ...prev,
        {
          id: itemCountProjet,
          idProjet: "",
          item_description: "",
          item_qty: 0,
          idUnite: "",
          item_unit_price: 0,
          item_total_price: 0
        }
      ]);
      setItemCountProjet(prev => prev + 1);
      setOpenProject(true);
    }
  };

  const handleAddCours = () => {
    setItemsCours(prev => [
      ...prev,
      {
        id: itemCountCours,
        idProjet: "",
        item_description: "",
        item_qty: 0,
        idUnite: "",
        item_unit_price: 0,
        item_total_price: 0,
        unit_name : ""
      }
    ]);
    setItemCountCours(prev => prev + 1);
    setOpenCours(true);
  };

  const handleAddItem = (fraisData) => {
    setItems2(prev => [
      ...prev,
      {
        id: itemCount,
        idProjet : "",
        idFrais: fraisData.idFrais,
        frais: fraisData.frais,
        description: fraisData.description,
        qty: 1,
        idUnite: '',
        unitPrice: '',
        item_total_price: '',
        unit_name : ""
      }
    ]);
    setItemCount(prev => prev + 1);
    setOpenItem(true);
  };
  return (
    <div id="projectInvoicesContainer">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-2 text-base text-center text-gray-500 font-semibold w-[25%]">Services</th>
            <th className="p-2 text-base text-center text-gray-500 font-semibold w-[25%]">Description</th>
            <th className="p-2 text-base text-center text-gray-500 font-semibold w-[6%]">Quantité</th>
            <th className="p-2 text-base text-center text-gray-500 font-semibold w-[6%]">Unité</th>
            <th className="p-2 text-base text-center text-gray-500 font-semibold">Prix unitaire</th>
            <th className="p-2 text-base text-center text-gray-500 font-semibold">Montant</th>
            <th className="p-2 text-base text-right text-gray-500 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="px-8 py-3 font-semibold text-gray-700">
              <div className="btn-group">
                <button type="button" className="pl-4 text-purple-500" data-bs-toggle="dropdown">
                  <i className="bi bi-plus-circle text-lg text-purple-500"></i>
                  Ajouter un service <span className="text-red-500 text-lg">*</span>
                </button>
                <ul className="dropdown-menu shadow-sm">
                  {isFacture && (
                    <>
                      <li className="py-1">
                        <div id="addDossier" onClick={() => addItem("addFolder")} className="dropdown-item cursor-pointer">
                          <span className="font-semibold">Dossier</span><br/>
                          <span className="text-sm">Projet / Entreprise</span>
                        </div>
                      </li>
                      <li className="py-1">
                        <div id="addProjet" onClick={() => addItem("addProject")} className="dropdown-item cursor-pointer">
                          <span className="font-semibold">Projet</span><br/>
                          <span className="text-sm">Cours / Formation</span>
                        </div>
                      </li>
                    </>
                  )}
                  {(IsProforma || isEdit ==="proforma") && (
                    <li className="py-1">
                      <div id="addCours" onClick={handleAddCours} className="dropdown-item cursor-pointer">
                        <span className="font-semibold">Cours</span><br/>
                        <span className="text-sm">Catalogue / Formation</span>
                      </div>
                    </li>
                  )}
                  {data.fv.map((fraisv) => (
                    <li key={fraisv.idFrais} className="py-1 cursor-pointer" onClick={() => handleAddItem({
                      frais: fraisv.Frais,
                      description: fraisv.exemple,
                      idFrais: fraisv.idFrais
                    })}>
                      <div className="dropdown-item inline-flex justify-between gap-14">
                        <div className="flex flex-col">
                          <span className="font-semibold uppercase">{fraisv.Frais}</span>
                          <span className="text-sm">{fraisv.exemple}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </td>
          </tr>

          {OpenFolder && <AddFolder clientId={idEtp} unites={data.unites} setSumFolder={setSumFolder} />}
          {OpenProject && <AddProject items={items} setItems={setItems} unites={data.unites} clientId={idEtp} setSumProject={setSumProject}  isEdit={isEdit}/>}
          {OpenItem && <AddItems items2={items2} setItems2={setItems2} unites={data.unites} setSumItems={setSumItems} IsProforma={IsProforma} isEdit={isEdit} />}
          {OpenCours && <AddCours items={itemsCours} setItems={setItemsCours} data={data} setSumCours={setSumCours} isEdit={isEdit}/>}
        </tbody>
      </table>
    </div>
  );
}
