
import { BrowserRouter as Router } from "react-router-dom";
import { GenRoute } from "./Routes/GenRoute";
export default function App() {
    return(
        <>
            <Router>
                <GenRoute/>
            </Router>
            
        </>
    )
}
