import NavBar from "../Components/NavBar/NavBar";
import '../App.css'
import InfoWallPrivacy from "../Components/InfoWalls/InfoWallPrivacy";



function Privacy(){
    return (
        <>
        <NavBar title="Privacy Policy"/>            
        <main className="mainFooterPages">   
        <InfoWallPrivacy/>
        </main>
        </>
    )
}


export default Privacy;