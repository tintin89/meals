import '../App.css';
import NavBar from "../Components/NavBar/NavBar";
import Contact from '../Components/Contact/Contact';


function ConctactUs(){
    return (
        <>
        <NavBar title="Contact Us"/>
        <main className="mainFooterPages">   
        <Contact/>
        </main>
        </>
    )
}

export default ConctactUs;