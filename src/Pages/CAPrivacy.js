import NavBar from "../Components/NavBar/NavBar";
import '../App.css'
import InfoWallCAPrivacy from "../Components/InfoWalls/InfoWallCAPrivacy";




function Privacy(){
    return (
        <>
        <NavBar title="CA Privacy Notice"/>            
        <main className="mainFooterPages">   
         <InfoWallCAPrivacy/>
        </main>
        </>
    )
}


export default Privacy;