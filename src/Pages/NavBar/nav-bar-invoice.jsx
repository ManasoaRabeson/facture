import { useContext, useEffect, useState } from "react";
import { InvoiceContext } from "../../Contexts/invoice";
//import useApi from "../../Hooks/Api";
import axios from "axios";
import React from 'react';
import { useNavigate } from "react-router-dom";
export function NavBarFacture()
{
    const { currentPage,setCurrentPage } = useContext(InvoiceContext);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const handleClick = (currentPage) =>{
        setCurrentPage(currentPage);
    }
    const [data,setData] = useState([]);
    //const {data,loading,error,callApi} = useApi();
    useEffect(()=>{
       const fetchData = async () =>{
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/cfp/profils/${JSON.parse(sessionStorage.getItem("user")).id}/index`,
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
              }
        }
        );
        setData(response.data);    
        } catch (error) {
                console.log(error);
            }
       };
       fetchData();
       // callApi(`cfp/profils/${JSON.parse(sessionStorage.getItem("user")).id}/index`);
    },[]);
    if(!data) return ;
    // console.log(data);

    const handleLogout = async () => {
        try {
          const token = sessionStorage.getItem('token');
    
          const response = await axios.get(
            'http://127.0.0.1:8000/api/logout',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          if (response.data.status === 200) {
            sessionStorage.removeItem('token');
            navigate('/');
          } else {
            alert(response.data.message || 'Erreur inconnue');
          }
        } catch (error) {
          console.error('Erreur lors de la déconnexion :', error);
          alert("Une erreur est survenue lors de la déconnexion.");
        }
      };
    return (
        <>
        <div className="fixed top-0 z-50 w-full bg-white/90 text-slate-600 backdrop-blur-lg backdrop-saturate-150">
                <div className="w-full du-navbar">
                    <div className="du-navbar-start">
                    <div className="dropdown">
                        <div tabIndex="0" role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16"></path>
                            </svg>
                        </div>
                        <ul tabIndex="0" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <a  className="text-slate-600 hover:text-slate-500 "onClick={() => handleClick(5)}  >
                                    Dashboard
                                </a>
                            </li>
                            <li>
                                <a 
                                    onClick={() => handleClick(1)} 
                                    className=" hover:text-slate-500 bg-[#87388C] text-white-slate-600"
                                >
                                Toutes les factures
                                </a>
                            </li>

                            <li>
                                <a className="text-slate-600 hover:text-slate-500 "  onClick={() => handleClick(2)} >
                                    Non payées
                                </a>
                            </li>
                            <li>
                                <a className="text-slate-600 hover:text-slate-500" onClick={() => handleClick(3)} >
                                    Échues
                                </a>
                            </li>
                            <li>
                                <a className="text-slate-600 hover:text-slate-500" onClick={() => handleClick(4)} >
                                    Brouillons
                                </a>
                            </li>
                            <li>
                                <a className="text-slate-600 hover:text-slate-500" onClick={() => handleClick(8)} >
                                    Proforma
                                </a>
                            </li>
                        </ul>
                    </div>
                        <div className="flex items-center gap-2 ml-4">
                        {/* <span className="mb-1 text-2xl">💰</span> */}
                            <i className="text-2xl fa-duotone fa-solid fa-sack-dollar"style={{ '--fa-primary-color': '#374151', '--fa-secondary-color': '#eb8c08' }}></i>
                            <p className="text-2xl font-semibold text-gray-700">Facture</p>
                        </div>
                    </div>
                    <div className="hidden du-navbar-center lg:flex">

                    <div className="hidden navbar-center lg:flex">
                        <ul className="flex items-center gap-2 px-1">
                                    <li>
                                    <a 
                                        className={`capitalize text-slate-600 hover:text-slate-500 px-3 py-2 rounded-t-md ${currentPage === 5 ? 'bg-[#87388C]/5 border-b-2 border-[#87388C]' : ''} cursor-pointer`} 
                                        onClick={() => handleClick(5)} 
                                    >
                                    Dashboard
                                    </a>
                                    </li>
                                    <li>
                                        <a 
                                            className={`capitalize text-slate-600 hover:text-slate-500 px-3 py-2 rounded-t-md ${currentPage === 1 ? 'bg-[#87388C]/5 border-b-2 border-[#87388C]' : ''} cursor-pointer`} 
                                            onClick={() => handleClick(1)} 
                                        >
                                        Toutes les factures
                                        </a>

                                    </li>
                                    <li>
                                        <a 
                                            className={`capitalize text-slate-600 hover:text-slate-500 px-3 py-2 rounded-t-md ${currentPage === 2 ? 'bg-[#87388C]/5 border-b-2 border-[#87388C]' : ''} cursor-pointer`} 
                                            onClick={() => handleClick(2)} 
                                        >
                                            non payés
                                        </a>
                                    </li>
                                    <li>
                                        <a 
                                            className={`capitalize text-slate-600 hover:text-slate-500 px-3 py-2 rounded-t-md ${currentPage === 3 ? 'bg-[#87388C]/5 border-b-2 border-[#87388C]' : ''} cursor-pointer`} 
                                            onClick={() => handleClick(3)} 
                                        >
                                           échues
                                        </a>
                                    </li>
                                    <li>
                                        <a 
                                            className={`capitalize text-slate-600 hover:text-slate-500 px-3 py-2 rounded-t-md ${currentPage === 4 ? 'bg-[#87388C]/5 border-b-2 border-[#87388C]' : ''} cursor-pointer`} 
                                            onClick={() => handleClick(4)} 
                                        >
                                            brouillons
                                        </a>
                                    </li>
                                     <li>
                                     <a 
                                            className={`capitalize text-slate-600 hover:text-slate-500 px-3 py-2 rounded-t-md ${currentPage === 8 ? 'bg-[#87388C]/5 border-b-2 border-[#87388C]' : ''} cursor-pointer`} 
                                            onClick={() => handleClick(8)} 
                                        >
                                            proforma
                                        </a>
                                    </li>
                         </ul>
                    </div>
                    </div>

                    <div className="du-navbar-end">
                                        <span className="inline-flex items-center">
                                
                                <div className="inline-flex items-center gap-2">
                                    <div className="dropdown dropdown-bottom md:dropdown-end">
                                        <button tabIndex="0" role="button" className="btn md:w-full md:px-6 btn-outline">
                                            <i className="duration-150 cursor-pointer fa-solid fa-plus"></i>
                                            <p className="hidden md:block">Nouveau</p>
                                        </button>
                                        <ul tabIndex="0" className="dropdown-content menu bg-base-100 rounded-box z-[1] w-[220px] p-2 shadow">
                                            <li>
                                                <a  onClick={() => handleClick(7)} className="capitalize text-slate-600 hover:text-slate-600 cursor-pointer">
                                                    <div className="w-[16px]">
                                                        <i className="fa-solid fa-file-invoice"></i>
                                                    </div>
                                                    facture
                                                </a>
                                            </li>
                                            <li>
                                                {/*href="https://factures.forma-fusion.com/cfp/factureProfo/create"*/}
                                                <a  onClick={() => handleClick(9)}  className="capitalize text-slate-600 hover:text-slate-600 cursor-pointer">
                                                    <div className="w-[16px]">
                                                        <i className="fa-solid fa-file-invoice"></i>
                                                    </div>
                                                    facture proforma
                                                </a>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="dropdown dropdown-end">
                                        <div tabIndex="0" role="button" className="btn btn-ghost btn-circle">
                                            <button className="btn btn-circle btn-ghost">
                                                <i className="text-2xl fa-solid fa-grid"></i>
                                            </button>
                                        </div>
                                        <div tabIndex="0" className="z-30 mt-3 bg-white shadow dropdown-content w-96">
                                            <div className="">
                                                <div className="grid grid-cols-3 gap-2">
                                                        <a href="https://analytics.forma-fusion.com/" target="_blank" className="flex flex-col items-center p-3 transition-colors rounded-lg hover:bg-gray-50">
                                                            <span className="mb-1 text-2xl">📊</span>
                                                            <span className="text-sm text-center text-gray-600">Analytics</span>
                                                        </a>
                                                                                                <a href="https://factures.forma-fusion.com/" target="_blank" className="flex flex-col items-center p-3 transition-colors rounded-lg hover:bg-gray-50">
                                                            <span className="mb-1 text-2xl">💰</span>
                                                            <span className="text-sm text-center text-gray-600">Factures</span>
                                                        </a>
                                                                                                <a href="https://apprenants.forma-fusion.com/" target="_blank" className="flex flex-col items-center p-3 transition-colors rounded-lg hover:bg-gray-50">
                                                            <span className="mb-1 text-2xl">👥</span>
                                                            <span className="text-sm text-center text-gray-600">Apprenants</span>
                                                        </a>
                                                                                                <a href="https://clients.forma-fusion.com/" target="_blank" className="flex flex-col items-center p-3 transition-colors rounded-lg hover:bg-gray-50">
                                                            <span className="mb-1 text-2xl">🏬</span>
                                                            <span className="text-sm text-center text-gray-600">Clients</span>
                                                        </a>
                                                                                                <a href="https://formateurs.forma-fusion.com/cfp/forms" target="_blank" className="flex flex-col items-center p-3 transition-colors rounded-lg hover:bg-gray-50">
                                                            <span className="mb-1 text-2xl">🧑‍🏫</span>
                                                            <span className="text-sm text-center text-gray-600">Formateur</span>
                                                        </a>
                                                                                                <a href="https://tests.forma-fusion.com/" target="_blank" className="flex flex-col items-center p-3 transition-colors rounded-lg hover:bg-gray-50">
                                                            <span className="mb-1 text-2xl">✍️</span>
                                                            <span className="text-sm text-center text-gray-600">Test</span>
                                                        </a>
                                                                                                <a href="https://projets.forma-fusion.com/cfp/projets" target="_blank" className="flex flex-col items-center p-3 transition-colors rounded-lg hover:bg-gray-50">
                                                            <span className="mb-1 text-2xl">📋</span>
                                                            <span className="text-sm text-center text-gray-600">Projets</span>
                                                        </a>
                                                                                                <a href="https://licence.forma-fusion.com/" target="_blank" className="flex flex-col items-center p-3 transition-colors rounded-lg hover:bg-gray-50">
                                                            <span className="mb-1 text-2xl">📜</span>
                                                            <span className="text-sm text-center text-gray-600">Licence</span>
                                                        </a>
                                                                                                <a href="https://admin.forma-fusion.com/" target="_blank" className="flex flex-col items-center p-3 transition-colors rounded-lg hover:bg-gray-50">
                                                            <span className="mb-1 text-2xl">⚙️</span>
                                                            <span className="text-sm text-center text-gray-600">Admin</span>
                                                        </a>
                                                                                                <a href="https://catalogue.forma-fusion.com/" target="_blank" className="flex flex-col items-center p-3 transition-colors rounded-lg hover:bg-gray-50">
                                                            <span className="mb-1 text-2xl">📚</span>
                                                            <span className="text-sm text-center text-gray-600">Catalogues</span>
                                                        </a>
                                                                                                <a href="https://agenda.forma-fusion.com/" target="_blank" className="flex flex-col items-center p-3 transition-colors rounded-lg hover:bg-gray-50">
                                                            <span className="mb-1 text-2xl">📅</span>
                                                            <span className="text-sm text-center text-gray-600">Agenda</span>
                                                        </a>
                                                                                                <a href="https://photo.forma-fusion.com/" target="_blank" className="flex flex-col items-center p-3 transition-colors rounded-lg hover:bg-gray-50">
                                                            <span className="mb-1 text-2xl">📸</span>
                                                            <span className="text-sm text-center text-gray-600">Photo</span>
                                                        </a>
                                                                                                <a href="https://marketplace.forma-fusion.com/" target="_blank" className="flex flex-col items-center p-3 transition-colors rounded-lg hover:bg-gray-50">
                                                            <span className="mb-1 text-2xl">🏪</span>
                                                            <span className="text-sm text-center text-gray-600">Marketplace</span>
                                                        </a>
                                                                                                <a href="https://badge.forma-fusion.com/" target="_blank" className="flex flex-col items-center p-3 transition-colors rounded-lg hover:bg-gray-50">
                                                            <span className="mb-1 text-2xl">🏅</span>
                                                            <span className="text-sm text-center text-gray-600">Badge</span>
                                                        </a>
                                                                                                <a href="https://opportunites.forma-fusion.com/" target="_blank" className="flex flex-col items-center p-3 transition-colors rounded-lg hover:bg-gray-50">
                                                            <span className="mb-1 text-2xl">🎯</span>
                                                            <span className="text-sm text-center text-gray-600">Opportunité</span>
                                                        </a>
                                                                                                <a href="https://evaluations.forma-fusion.com/" target="_blank" className="flex flex-col items-center p-3 transition-colors rounded-lg hover:bg-gray-50">
                                                            <span className="mb-1 text-2xl">📝</span>
                                                            <span className="text-sm text-center text-gray-600">Evaluation</span>
                                                        </a>
                                                                                                <a href="https://presence.forma-fusion.com/" target="_blank" className="flex flex-col items-center p-3 transition-colors rounded-lg hover:bg-gray-50">
                                                            <span className="mb-1 text-2xl">✅</span>
                                                            <span className="text-sm text-center text-gray-600">Présence</span>
                                                        </a>
                                                                                                <a href="https://inscription.forma-fusion.com/" target="_blank" className="flex flex-col items-center p-3 transition-colors rounded-lg hover:bg-gray-50">
                                                            <span className="mb-1 text-2xl">📝</span>
                                                            <span className="text-sm text-center text-gray-600">Inscription</span>
                                                        </a>
                                                                                                <a href="https://dossiers.forma-fusion.com/" target="_blank" className="flex flex-col items-center p-3 transition-colors rounded-lg hover:bg-gray-50">
                                                            <span className="mb-1 text-2xl">📚</span>
                                                            <span className="text-sm text-center text-gray-600">Dossier</span>
                                                        </a>
                                                                                                <a href="https://reporting.forma-fusion.com/" target="_blank" className="flex flex-col items-center p-3 transition-colors rounded-lg hover:bg-gray-50">
                                                            <span className="mb-1 text-2xl">📋</span>
                                                            <span className="text-sm text-center text-gray-600">Reporting</span>
                                                        </a>
                                                                                                <a href="https://reservation.forma-fusion.com/" target="_blank" className="flex flex-col items-center p-3 transition-colors rounded-lg hover:bg-gray-50">
                                                            <span className="mb-1 text-2xl">📋</span>
                                                            <span className="text-sm text-center text-gray-600">Réservation</span>
                                                        </a>
                                                                                        </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="dropdown dropdown-bottom dropdown-end">
                                        <div tabIndex="0" role="button" className="btn btn-ghost">
                                            {JSON.parse(sessionStorage.getItem("user")).photo ? (
                                            <div className="avatar">
                                            <div tabIndex="0" role="button" className="mt-1 avatar">
                                                    <div className="w-10 rounded-full">
                                                        <img alt="Profile" src={`https://formafusionmg.ams3.cdn.digitaloceanspaces.com/formafusionmg/img/referents/${JSON.parse(sessionStorage.getItem("user")).photo}`}/>
                                                    </div>
                                                </div>
                                            </div>
                                            ) :  JSON.parse(sessionStorage.getItem("user")).name ? (
                                                <button
                                                  tabIndex={0}
                                                  id="navbarDropdown"
                                                  className="text-xl font-medium btn bg-slate-200 hover:bg-slate-200/90 text-slate-600 hover:text-slate-600"
                                                  role="button"
                                                >
                                                  {JSON.parse(sessionStorage.getItem("user")).name}
                                                </button>
                                              ) : (
                                            <button tabindex="0" id="navbarDropdown"
                                                className="text-xl font-medium btn bg-slate-200 hover:bg-slate-200/90 text-slate-600 hover:text-slate-600"
                                                role="button">
                                                <i class="text-xl fa-solid fa-user text-slate-700"></i>
                                            </button>
                                            )}
                                            <span className="font-medium text-gray-700">
                                            {data.infoProfilCfp &&
                                                <div className="flex flex-col gap-1">
                                                    <h1 className="text-lg font-medium text-gray-700 capitalize">
                                                        {data.infoProfilCfp.customerName}
                                                    </h1>
                                                </div>
                                            }
                                             </span>
                                        </div>
                                        <ul tabIndex="0" className="dropdown-content dropdown menu bg-base-100 rounded-box z-[1] w-[320px] p-3 shadow" aria-labelledby="navbarDropdown">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex flex-col gap-2 ">
                                                    <div className="inline-flex items-center justify-start gap-3">
                                                        <div className="w-14 h-14 rounded-full text-center cursor-pointer flex justify-center items-center text-[#a462a4] text-xl font-medium bg-[#e1c4e3] transition-all duration-300 shadow-md uppercase">
                                                         <i className="bi bi-buildings text-[#a462a4] text-lg"></i>
                                                        </div>
                                                        {data.infoProfilCfp &&
                                                        <div className="flex flex-col gap-1">
                                                        <h1 className="text-lg font-medium text-gray-700 capitalize">
                                                        {data.infoProfilCfp.customerName}
                                                        </h1>
                                                        </div>
                                                        }
                                                  </div>
                                                </div>

                                                <div className="inline-flex items-center w-full gap-3 mb-4">
                                                    <div className="w-14"></div>
                                                    <div className="flex flex-col w-full gap-1">
                                                        <a onClick={()=>setCurrentPage(100)} className="w-full px-2 py-1 text-base text-gray-500 duration-100 rounded-md hover:bg-gray-100 hover:text-gray-700 cursor-pointer">
                                                            Gérer le profil
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="border-gray-400"/>
                                            <div className="flex flex-col gap-2 mt-2">
                                                <div className="inline-flex items-center justify-start w-full gap-3">
                                                {JSON.parse(sessionStorage.getItem("user")).photo ? (
                                                        <div className="w-14 h-14 rounded-full overflow-hidden text-center cursor-pointer flex justify-center items-center text-[#a462a4] text-xl font-medium bg-[#e1c4e3] transition-all duration-300 shadow-md uppercase">
                                                        <img alt="Profile" src={`https://formafusionmg.ams3.cdn.digitaloceanspaces.com/formafusionmg/img/referents/${JSON.parse(sessionStorage.getItem("user")).photo}`}/>
                                                        </div>
                                                ) :(
                                                    <div
                                                    className="w-14 h-14 rounded-full text-center cursor-pointer flex justify-center items-center text-xl font-medium 
                                                    bg-gray transition-all duration-300 shadow-md uppercase">
                                                    <i class="fa-solid fa-user text-gray-700 text-lg"></i>
                                                    </div>
                                                )}
                                                <UserInfo
                                                user={{
                                                    name: JSON.parse(sessionStorage.getItem("user")).name,
                                                    firstName: JSON.parse(sessionStorage.getItem("user")).firstName,
                                                    email: JSON.parse(sessionStorage.getItem("user")).email
                                                }}
                                                />
                                                </div>
                                                <div className="inline-flex items-center w-full gap-3">
                                                    <div className="w-14"></div>
                                                    <div className="flex flex-col w-full gap-1">
                                                        <span className="w-full px-2 py-1 text-base text-gray-500 duration-100 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700" onClick={() => setShowModal(true)}>
                                                            Se déconnecter
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <form id="logout-form" action="https://factures.forma-fusion.com/logout" method="POST" className="d-none">
                                                <input type="hidden" name="_token" value="uzhePxRA7PJi8EDFkN2rNtmZiRcMTVtDU3vtm9c0" autoComplete="off"/>                               
                                            </form>
                                        </ul>
                                    </div>
                                </div>
                            </span>
                        </div>
                </div>
            </div>
            {showModal && (
            <div className="fixed inset-0  bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
            <h3 className="text-lg font-bold mb-4">Déconnexion</h3>
            <p className="mb-6">Voulez-vous vraiment vous déconnecter ?</p>
            <div className="flex justify-end">
              <button className="btn" onClick={() => setShowModal(false)}>
                Non, annuler
              </button>
              <button
                className="ml-3 btn btn-primary hover:text-white"
                onClick={handleLogout}
              >
                Oui, je confirme
              </button>
            </div>
          </div>
        </div>
      )}
        </>
    )
}



function UserInfo({ user }) {
    // Fonction pour limiter une chaîne de caractères sans ajouter de "..."
    const strLimit = (str, limit) => str?.length > limit ? str.slice(0, limit) : str;
  
    return (
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-medium text-gray-700">
          {strLimit(user.name, 20)} {strLimit(user.firstName, 50)}
        </h1>
        <span className="text-base text-gray-700">
          {strLimit(user.email, 50)}
        </span>
      </div>
    );
  }


