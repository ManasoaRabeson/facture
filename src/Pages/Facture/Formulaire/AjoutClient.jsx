import { FaCircleInfo } from "react-icons/fa6";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export function AjoutClient({idEtp,setIdEtp,isEdit,data}){
    const [showSearch, setShowSearch] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [clients, setClients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredClients, setFilteredClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const clientResultsRef = useRef(null);
   

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/cfp/factures/allEtps',{
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
      })
      .then((res) => {
        setClients(res.data.clients || []);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des clients :", error);
      });
      if (isEdit) {
        setShowSearch(true);
        setShowDetails(true);
        setSelectedClient(data.entreprise || []);
        setIdEtp(data.entreprise.idEtp);
        //console.log(data);
      }
  }, [isEdit,data]);
  
  useEffect(() => {
    const filtered = clients.filter(client =>
      client.etp_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClients(filtered);
  }, [searchTerm, clients]);

  const handleClientSelect = (client) => {
    setShowDetails(true);
    setSelectedClient(client);
    setShowSearchBar(false);
    setIdEtp(client.idEtp);
  };

  const handleClickOutside = (event) => {
    if (clientResultsRef.current && !clientResultsRef.current.contains(event.target)) {
      setFilteredClients([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

    const handleAddClient = () => {
      setShowSearchBar(true);
      setShowSearch(true);
    };
  
    const handleChooseAnother = () => {
      setShowDetails(false);
      setShowSearchBar(true);
      setSearchTerm('');
    };
   
    
    return(
        <div className="w-full">
                        {!showSearch && (
                          <button type="button"  onClick={handleAddClient}  className="inline-flex items-center gap-4 p-20 border rounded">
                          <i className="text-4xl text-gray-600 fa-solid fa-user-plus" aria-hidden="true"></i>
                          <h1 className="text-xl font-semibold text-gray-600">Ajouter un client</h1>
                          </button>
                        )}
                        {showSearchBar && (
                            <div id="client-search-container">
                            <div className="relative flex items-center gap-4">
                                <div className="relative">
                                <input
                                    type="search"
                                    id="client-search"
                                    className="p-3 pl-10 w-[40vh] text-base text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-purple-500 focus:ring-1"
                                    placeholder="Rechercher un client"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <div className="absolute px-4 py-2 text-sm font-normal text-white bg-gray-700 rounded-lg cursor-pointer right-2 bottom-3 hover:bg-gray-700/90">
                                    Chercher
                                </div>
                                <ul className={`absolute left-0 z-50 w-full p-2 bg-white border rounded cursor-pointer hover:bg-gray-50 ${
                                searchTerm === '' ? 'hidden' : ''
                                        }`}
                                        ref={clientResultsRef}>
                                {filteredClients.length === 0 ? (
                                    <li
                                    className="p-2 font-semibold text-gray-100 bg-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                                    onClick={() => {}}
                                    >
                                    Aucun client ne correspond à ce nom. Cliquez ici pour en ajouter un nouveau.
                                    </li>
                                ) : (
                                    filteredClients.map(client => (
                                    <li
                                        key={client.idEtp}
                                        className="p-2 hover:bg-gray-200 cursor-pointer"
                                        onClick={() => handleClientSelect(client)}
                                    >
                                        {client.etp_name}
                                    </li>
                                    ))
                                )}
                                </ul>
                                </div>
                                <div className="relative group">
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center gap-2 text-gray-500 bg-transparent text-md"
                                >
                                <FaCircleInfo className="text-lg text-gray-700" />
                                </button>
                                <div className="flex-col gap-1 list-group p-2 bg-white border rounded-lg shadow-md transform scale-0 group-hover:scale-100 absolute z-[999] transition duration-300 ease-in-out origin-top w-96">
                                    <p className="text-base font-semibold text-gray-700">Information</p>
                                    <p className="text-sm text-justify text-gray-400">
                                    Pour ajouter un nouveau client, veuillez effectuer une recherche dans le champ dédié...
                                    </p>
                                </div>
                                </div>
                            </div>
                            </div>
                        )}
                        {showDetails && (
                            <div id="client-details">
                            <h2 className="text-base font-semibold text-gray-500">Facture à </h2>
                            {!isEdit && <p className="text-base font-semibold capitalize">{selectedClient.etp_name}</p> }
                            <div className="font-medium">
                                <div className="flex items-center gap-2">
                                <p className="text-base"> {selectedClient.etp_addr_lot || 'Adresse inconnue'}{" "} {selectedClient.etp_addr_quartier || 'quartier inconnu'}</p>
                                </div>
                                {/* <div className="flex items-center gap-2">
                                <p className="text-base"> </p>
                                </div> */}
                                <div className="flex items-center gap-2">
                                <p className="text-base">{selectedClient.etp_addr_code_postal || 'code postal inconnu'} {" "} {selectedClient.etp_ville || 'ville inconnu'}</p>
                                </div>
                                <br />
                                <div className="flex items-center gap-2">
                                <p className="text-base">NIF : {selectedClient.etp_nif || 'NIF inconnu'}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                <p className="text-base">STAT : {selectedClient.etp_stat || 'STAT inconnu'} </p>
                                </div>
                            </div>
                            <div className="inline-flex items-center gap-2 cursor-pointer">
                                <div
                                onClick={handleChooseAnother}
                                className="text-lg font-medium text-purple-500 hover:text-purple-600"
                                >
                                Choisissez un autre client
                                </div>
                                <p>|</p>
                                <div className="text-lg font-medium text-purple-500 cursor-pointer hover:text-purple-600">
                                Modifier le client
                                </div>
                            </div>
                            <input type="hidden" id="idEtp" name="idEntreprise" value={idEtp} readOnly/>
                            </div>
                        )}
                        </div>
    )
}