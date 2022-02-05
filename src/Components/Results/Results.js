import './Results.css';
import {useSelector,useDispatch} from 'react-redux';
import Restaurant from './Restaurant/Restaurant';
import Loader from '../UI/Loader/Loader';
import { useEffect } from 'react';
import { updateSelectedC,updateTyping } from '../../store/actions/actionsUI';
import { updateChoosenFoods } from '../../store/actions/actionsRestaurants';
import {Redirect} from 'react-router-dom';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import LocationOffIcon from '@material-ui/icons/LocationOff';
import {filterbyTags} from '../../utility/utility';

const mapState = ({restaurantsR,uiR}) =>({
    restaurantsS:restaurantsR.restaurants,
    loading:uiR.loadingR,
    selectedS:uiR.selectedC,
    choosenFoods:restaurantsR.choosenFoods
    })

function Results(){
  
   const dispatch = useDispatch();
   const {restaurantsS,loading,selectedS,choosenFoods} = useSelector(mapState); 
   const restaurants = choosenFoods.length > 0 ? restaurantsS.filter(e=>filterbyTags(e,choosenFoods)) : restaurantsS;

   useEffect(()=>{  
       return ()=>{     
        dispatch(updateTyping(false));
        dispatch(updateSelectedC(false));   
        dispatch(updateChoosenFoods([]));    
       }  
     
   },[dispatch])

   let protectedR = selectedS ?  <div className="restaurantsList">
        {restaurants.length > 0 ? <h1><RestaurantIcon/> Restaurants closer to you! <RestaurantMenuIcon/></h1> :
        <div className="noRestaurants">        
        <h1>There are not any Restaurants to show you in this location!</h1>
        <LocationOffIcon/>
        </div> 
        }
   {
      
       restaurants.map((r,index)=>(                        
           <Restaurant key={index} bgColor={index===0 || index%2===0 ? "whitesmoke" : "lightgray"} {...r}/>                     
       ))
   }
   
</div>  : <Redirect to="/"/>

    return (   
            loading ? <Loader/> :  protectedR   
              
    )

}


export default Results;