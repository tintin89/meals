import '../App.css'
import InfoWallFaqs from "../Components/InfoWalls/InfoWallFaqs";
import NavBar from "../Components/NavBar/NavBar";



function Faqs(){
    return (
        <>
        <NavBar title="Frequently Asked Questions"/>       
        <main className="mainFooterPages">   
        <InfoWallFaqs/>
        </main>
        </>
    )
}

export default Faqs;