
import * as actionTypes from '../actions/actionTypes';


const initialState = {
    coords:{lat:29.418953321397073,lng:-98.4814867426235},
    restaurants:[],  
    favorites:[],
    loadingF:true,
    selectedR:"",
    choosenFoods:[]
    };
  
  const restaurantsReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.UPDATE_FAVORITES:
        return {
          ...state,
          favorites:action.payloadRF,
          loadingF:action.payloadLF
        }

      case actionTypes.UPDATE_RESTAURANTS:
        return {
          ...state,
          restaurants:action.payload
        }        

        case actionTypes.UPDATE_COORDS:
        return {
          ...state,
          coords:action.payload
        }       
        
        case actionTypes.UPDATE_SELECTEDR:
          return {
            ...state,
            selectedR:action.payload
          }

        case actionTypes.UPDATE_CHOOSENFOODS:
          return {
            ...state,
            choosenFoods:action.payload
          }  
               
      default:
        return state;
    }
    
  };
  
  export default restaurantsReducer;