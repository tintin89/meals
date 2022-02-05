import './Footer.css';
import {NavLink} from 'react-router-dom';


function Footer(){
    return (
        <footer className="footer">
            <div className="links">
            <NavLink to="/aboutUs">About Us</NavLink>
            <NavLink to="/faqs">FAQs</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
            <NavLink to="/terms">Terms & Conditions</NavLink>
            <NavLink to="/policy">Privacy Policy</NavLink>
            <NavLink to="/privacy">CA Privacy Notice</NavLink>
            </div>
            <h6>©2021 SA Meals, Inc. All rights reserved.</h6>                        
        </footer>
    )
}

export default Footer;