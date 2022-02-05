import '../App.css';
import NavBar from "../Components/NavBar/NavBar";
import Dashboard from '../Components/Dashboard/Dashboard';
import Backdrop from '../Components/UI/Backdrop/Backdrop';
import {useSelector} from 'react-redux';
import AddRestaurant from '../Components/Dashboard/AddRestaurant/AddRestaurant';

const mapState = ({uiR})=>({
    show:uiR.showBackdrop
}
)

function AdminDashboard(){
    const {show} = useSelector(mapState);
    return(
        <>
        <Backdrop show={show}>
        <AddRestaurant/>
        </Backdrop>
        <NavBar/>
        <main className="mainResults">
         <Dashboard/>        
        </main>
        
        </>
           )
     
}

export default AdminDashboard;