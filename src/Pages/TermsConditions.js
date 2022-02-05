import NavBar from "../Components/NavBar/NavBar";
import '../App.css'
import InfoWallTerms from "../Components/InfoWalls/InfoWallTerms";


function TermsConditions(){
    return (
        <>
        <NavBar title="Terms and Conditions"/>            
        <main className="mainFooterPages">   
        <InfoWallTerms/>
        </main>
        </>
    )
}


export default TermsConditions;