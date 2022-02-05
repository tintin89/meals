import './Restaurant.css';
import {tags} from '../../../utility/utility';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';





const Restaurant = (props) =>{
    
   
   
   
    return (
    
        <div style={{backgroundColor:`${props.bgColor}`}} className="restaurantData"> 
          <div className="restaurantName">                   
            <Box component="fieldset" mb={3} borderColor="transparent">       
               <Rating name="read-only" value={props.rating} readOnly size="small" precision={0.5} />
            </Box>          
            <h4 >{props.name}</h4>
            <p>
                
                {
                 tags.map(t=>props[t.name] && t.name+",")  
                }
                </p>
            </div>       
            <span>{props.address}</span>
            <div className="websiteOrder">Order on Bon Appetit</div>    
        </div>
     )

}




export default Restaurant;