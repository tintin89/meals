import './ChooseSection.css';
import {useSelector} from 'react-redux';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import Loader from '../UI/Loader/Loader';
import ChooseFood from '../ChooseFood/ChooseFood';


const mapState = ({restaurantsR,uiR})=>({
   favorites:restaurantsR.favorites,
   loading:restaurantsR.loadingF

})

function ChooseSection(){
   
    const {favorites,loading} = useSelector(mapState);
   

  /*  const getCLoserToNeigh = (n) =>{
     dispatch(updateLoading(true));
     dispatch(updateLoadingR(true));
     const neighborhood = neighborhoods.find(el=>el.name===n);    
     dispatch(updateCoords({lat:neighborhood.crds.lat,lng:neighborhood.crds.lng}));
     dispatch(updateSelectedC(true));
     return history.push('/restaurants');
    }*/
    return (
        loading ? <Loader/> : 
        <section className="chooseSection__container">
       <h1 style={{marginTop:"2rem"}}>If you wish you can select your favorite food</h1>   
          <ChooseFood/>
           
        <h1 style={{marginTop:"4rem"}}><RestaurantIcon/> Make your order from your favorite Restaurants! <RestaurantMenuIcon/></h1>           
           <div className="chooseR__container">            
           {
              
               favorites.map((f,index)=>
               <a key={index} href={f.website} target="_blank" rel="noopener noreferrer">
               <div style={{backgroundImage:`url(${f.pictureUrl})`}}  className="restaurant"><p>{f.name}</p></div>
               </a>               
               )
           }          
    </div>      
        </section>
    )
}



export default ChooseSection;