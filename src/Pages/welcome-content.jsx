import { MasterContent } from "../Components/content/master-content";
import { Welcome as ImportWelcome } from "./Welcome";
export function WelcomeContent(){
    return (
        <>
        <MasterContent>
            <ImportWelcome/>
        </MasterContent>
        </>
    )
}