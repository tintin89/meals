import './NavBar.css';
import {useHistory} from 'react-router-dom';
import HeaderBar from '../HeaderBar/HeaderBar';

function NavBar({title}){
    const history = useHistory();
    return (
        <div className="containerNav">
            <nav className="navbar">
            <div onClick={()=>history.push('/')} className="logoSAmeals">
                SA Meals
            </div>
            </nav>
           {title && <HeaderBar title={title}/>} 
        </div>
        
    )
}

export default NavBar;