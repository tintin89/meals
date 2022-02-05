import './HeaderBar.css';
import {useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';

function HeaderBar({title}){
  const history = useHistory();
  const [show, handleshow] = useState(false);
  const x = () => {
    if (window.scrollY > 100) {
      handleshow(true)
    } else handleshow(false);
  }

  useEffect(() => {
    
    window.addEventListener("scroll", x);
    return () => (
      window.removeEventListener("scroll",x)
  )
  },[]);

    return (
        <div
         style={{display:(show || history.location.pathname === "/restaurants") && 'none'}}
          className="headerBar">
          {title}
        </div>
    )
}

export default HeaderBar;