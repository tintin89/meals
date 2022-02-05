import * as actionTypes from './actionTypes';
import {updateLoading,updateLoadingR} from './actionsUI';
import {arraySplited,getAddress} from '../../utility/utility';
import database from '../../firebase';



export const updateChoosenFoods = (foods)=>{
    return {
        type:actionTypes.UPDATE_CHOOSENFOODS,
        payload:foods
    }
}

export const updateRestaurants = (datos)=>{
   
    return {
        type:actionTypes.UPDATE_RESTAURANTS,
        payload:datos
    }
}


export const updateCoords = (datos)=>{
    return {
        type:actionTypes.UPDATE_COORDS,
        payload:datos
    }
}

export const updateSelectedR = (restaurant) =>{
    return {
        type:actionTypes.UPDATE_SELECTEDR,
        payload:restaurant
    }
}

export const updateFavorites = (datos,loadingF) =>{
    return {
        type:actionTypes.UPDATE_FAVORITES,
        payloadRF:datos,
        payloadLF:loadingF
    }
}

export const updateFavoritesRequest = ()=>{
    return async dispatch => {
        const temp =[];
    database.collection("restaurants")
        .where("favorite","==","Yes")
        .get()
        .then((querySnapshot)=>{
            querySnapshot.forEach(doc=>{
              temp.push({
                  name:doc.data().name,
                  website:doc.data().website,
                  pictureUrl:doc.data().pictureUrl
              })
               
            })
            dispatch(updateFavorites(temp,false));
            
        })
        .catch(error=>console.log(error));
      
      
      
    }
}

export const updateRequest = (results)=>{
    return async (dispatch) => {             
     const temp = [];      
     const myRestaurants = [];  
     const promises = results.map(async r=>{     
       const ad = await getAddress(r.place_id);
      
       const restData = {
         name:r.name,     
         rating:r.rating,
         address:ad?.slice(0,ad.length-5)  
       } 
       return temp.push(restData);       
       }); 
       await Promise.all(promises);
      
       const arraySTemp = arraySplited(temp,10);
       const promisesR = arraySTemp.map(arr=>(
           database.collection("restaurants")
           .where('address','in',arr.map(a=>a.address))
           .get()
           .then(snapshot=>{
               snapshot.forEach(doc=>{
                  if(arr.map(n=>n.name).includes(doc.data().name)){
                    myRestaurants.push({
                        ...doc.data(),
                         rating:arr.find(r=>r.name===doc.data().name).rating
                         })
                  }
               })
           })
       ))
       await Promise.all(promisesR);  
       
       dispatch(updateRestaurants(
       myRestaurants.sort((a, b) => a.name.localeCompare(b.name))));
       dispatch(updateLoading(false));
       dispatch(updateLoadingR(false));
    }
    
}