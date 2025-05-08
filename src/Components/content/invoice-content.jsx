import { Outlet } from "react-router-dom";
import {NavBarFacture} from "../../Pages/NavBar/nav-bar-invoice";
import {Footer} from "../../Pages/Footer"
export function InvoiceContent() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBarFacture />
      <div className="flex-grow pt-20 px-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
