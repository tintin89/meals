import '../App.css';
import NavBar from "../Components/NavBar/NavBar";
import Auth from '../Components/Auth/Auth';
function Login(){
    return(
        <>
        <NavBar/>
        <main className="mainResults">
         <Auth/>
        </main>
        
        </>
           )
     
}

export default Login;