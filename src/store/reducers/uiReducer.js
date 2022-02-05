
import * as actionTypes from '../actions/actionTypes';


const initialState = {
     loading:true,
     loadingR:true,
     typing:false,
     selectedC:false,
     showBackdrop:false,
    };
  
  const restaurantsReducer = (state = initialState, action) => {
    switch (action.type) {
        
      case actionTypes.UPDATE_LOADING:
          return {
              ...state,
              loading:action.payload
          }
      case actionTypes.UPDATE_LOADINGR:
        return {
          ...state,
          loadingR:action.payload
        }    
       
      case actionTypes.UPDATE_SELECTEDC:
        return {
          ...state,
          selectedC:action.payload
        }    

      case actionTypes.UPDATE_TYPING:
        return {
          ...state,
          typing:action.payload

        }  

     case actionTypes.UPDATE_SHOW_BACKDROP:
       return {
         ...state,
         showBackdrop:action.payload
       }   
        
      default:
        return state;
    }
    
  };
  
  export default restaurantsReducer;