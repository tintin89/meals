import '../App.css';
import Results from "../Components/Results/Results";
import NavBar from "../Components/NavBar/NavBar";

function Restaurants(){
    return(
        <>
        <NavBar/>
        <main className="mainResults">
        <Results/>
        </main>
        
        </>
           )
     
}

export default Restaurants;