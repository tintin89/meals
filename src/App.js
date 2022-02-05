import {useEffect} from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import './App.css'
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Homepage from './Pages/Homepage';
import Restaurants from './Pages/Restaurants';
import Footer from './Components/Footer/Footer';
import {useSelector,useDispatch} from 'react-redux';
import {updateRequest,updateFavoritesRequest} from './store/actions/actionsRestaurants';
import { updateLoadingR,updateLoading } from './store/actions/actionsUI';
import ScrollToTop from './Hoc/ScrollToTop/ScrollToTop';
import AboutUs from './Pages/AboutUs';
import Faqs from './Pages/Faqs';
import ConctactUs from './Pages/ContactUs';
import TermsConditions from './Pages/TermsConditions';
import Privacy from './Pages/Privacy';
import CAPrivacy from './Pages/CAPrivacy';
import AdminDashboard from './Pages/AdminDashboard';
import Login from './Pages/Login';
import VerifyAuth from './Hoc/VerifyAuth/VerifyAuth';



const loader = new Loader({
  apiKey: "AIzaSyBJegJe8F7HQGvBTX33jcb-2OOD2MI7QOE",
  version: "weekly",
  libraries: ["places"],
  language: 'en'
});

const mapState = ({restaurantsR}) =>({
  crds:restaurantsR.coords,
  
 
  })

function App(){
 
  const {crds} = useSelector(mapState); 
  const dispatch = useDispatch();


  /*function checkRadiusDistance(place,centerLatLng,radius) {
    return google.maps.geometry.spherical.computeDistanceBetween(place.geometry.location, centerLatLng) < radius;
  });*/


  useEffect(()=>{    
     dispatch(updateFavoritesRequest());
  },[dispatch])

  useEffect(()=>{      
   
    loader
    .load()
    .then((google)=>{     
     let tempResults=[];
      var request = {
        location:  new google.maps.LatLng(crds.lat,crds.lng),
        /*radius: 2*1609,*/
        type: ['restaurant'],
        language:"en",
        rankBy:google.maps.places.RankBy.DISTANCE        
       };

     var service = new google.maps.places.PlacesService(document.createElement('div'));
        
     if(crds.lat===29.418953321397073 && crds.lng===-98.4814867426235){    
      dispatch(updateLoading(false));
      dispatch(updateLoadingR(false));
        
     }else{
      service.nearbySearch(request, (results, status,next_page_token)=>{       
        if (status === google.maps.places.PlacesServiceStatus.OK) {    
        console.log(results)   
        tempResults=tempResults.concat(results);
        if(next_page_token.hasNextPage){
          next_page_token.nextPage();
        }else{          
          dispatch(updateRequest(tempResults));  
        }                 
        }     
       }) 

     }
    
    })
    .catch(error=>{
      console.log(error)
    })
  },[crds,dispatch])
  return (   
    <BrowserRouter>  
    <ScrollToTop>
    <Switch> 
    <Route path="/admin" render={()=>(    
      <VerifyAuth>
        <AdminDashboard/>
      </VerifyAuth>               
      )}/> 

    <Route path="/login" render={()=>(           
      <Login/>        
      )}/>       

    <Route path="/restaurants" render={()=>(           
      <Restaurants/>        
      )}/> 

     <Route path="/contact" render={()=>(           
      <ConctactUs/>    
      )}/> 

      <Route path="/faqs" render={()=>(           
      <Faqs/>    
      )}/> 

      <Route path="/aboutUs" render={()=>(           
      <AboutUs/>      
      )}/> 

       <Route path="/terms" render={()=>(           
      <TermsConditions/>      
      )}/> 

       <Route path="/policy" render={()=>(           
       <Privacy/>    
      )}/> 

    <Route path="/privacy" render={()=>(           
       <CAPrivacy/>    
      )}/> 

    <Route path="/" render={()=>(           
      <Homepage/>          
      )}/>                   
    </Switch>   
    <Footer/>   
     </ScrollToTop>     
    </BrowserRouter>

     
 
    
   
  )
}

export default App;