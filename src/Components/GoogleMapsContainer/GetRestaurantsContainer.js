import PlacesAutocomplete from '../PlacesAutocomplete/PlacesAutocomplete';
import './GetRestaurantsContainer.css';
import LabelMessage from '../UI/LabelMessage/LabelMessage';
import { useSelector,useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useState} from 'react'
import { updateTyping } from '../../store/actions/actionsUI';

const mapState = ({uiR}) =>({
selectedC:uiR.selectedC,

  })



function GetRestaurantsContainer(){ 
  const dispatch = useDispatch();
  const history = useHistory();
  const {selectedC} = useSelector(mapState);
  const [showMessage,setShowMessage] = useState(false);


 const handleFind = ()=>{ 
   if(selectedC){    
    history.push("/restaurants")
   }else{     
    setShowMessage(true);
    dispatch(updateTyping(false)); 
   }
 }

 const changeShowM = (v) =>{
 
   setShowMessage(v);
 }

  

  return(
     <div className="inputAddressContainer">
       <div className="welcomeLetters">
       <h1>SA Meals</h1>  
       <h3>Find every restaurant menu here</h3>
       </div>    
       <PlacesAutocomplete changeSM={(v)=>changeShowM(v)}/>    
       {(showMessage) && <LabelMessage colorF="salmon" message="Please enter a valid address!"/>}
     <button onClick={()=>handleFind()} className="results__button">Find Restaurants</button>
    </div>

  )
      
}

export default GetRestaurantsContainer;