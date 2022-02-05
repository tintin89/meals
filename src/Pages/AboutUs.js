
import NavBar from "../Components/NavBar/NavBar";
import InfoWallAbout from "../Components/InfoWalls/InfoWallAbout";
import '../App.css'



function AboutUs(){
    return (
        <>
        <NavBar title="AboutUs"/>            
        <main className="mainFooterPages">   
        <InfoWallAbout/>
        </main>
        </>
    )
}


export default AboutUs;