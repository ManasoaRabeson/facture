import { useState } from "react";
import { NavBarAccueil } from "./NavBar/nav-bar-accueil";

import { Welcome as ImportWelcome } from "./Welcome";
import { FormLogin } from "./Login/FormLogin";

export function ContenuAccueil(){
    //1 accueil 
    //2 formulaire login
    const [currentPage , setCurrentPage] = useState(1);
    const renderPage = () => {
        switch(currentPage) {
            case 1 : 
            return <ImportWelcome setCurrentPage={setCurrentPage}/>
            case 2 :
            return <FormLogin/>
            }
    };
    return (
        <>
        <div className="flex flex-col w-screen h-screen overflow-hidden bg-white">
            <div className="fixed top-0 z-50 w-full bg-white/90 text-slate-600 backdrop-blur-lg backdrop-saturate-150">
                <NavBarAccueil/>
            </div>
            <div className="flex items-center justify-center w-full h-full overflow-hidden bg-gray-100">
                {renderPage()}
            </div>
        </div>
        </>
    )
}