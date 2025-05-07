export function NavBarAccueil() {
    return (
        <>
                <div className="w-full du-navbar">
                    <div className="du-navbar-start">
                        <div className="flex items-center gap-2 ml-4">
                            <i className="text-2xl fa-duotone fa-solid fa-sack-dollar" style={{ "--fa-primary-color": "#374151", "--fa-secondary-color": "#eb8c08" }}></i>
                            <p className="text-2xl font-semibold text-gray-700">Facture</p>
                        </div>
                    </div>
                    <div className="hidden du-navbar-center lg:flex">
                        <div className="hidden navbar-center lg:flex">
                            <ul className="flex items-center gap-2 px-1"></ul>
                        </div>
                    </div>

                    <div className="du-navbar-end">
                        <div className="flex items-center gap-3">
                            <div className="dropdown dropdown-end">
                            <div tabIndex="0" role="button" className="btn btn-ghost btn-circle">
                                            <button className="btn btn-circle btn-ghost">
                                                <i className="text-2xl fa-solid fa-grid"></i>
                                            </button>
                                        </div>
                                <div tabIndex="0" className="z-30 mt-3 bg-white shadow dropdown-content w-96">
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
                                          <span classn="mb-1 text-2xl">📚</span>
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
                    </div>
                </div>
    
        </>
    );
}
