import * as actionTypes from '../actions/actionTypes';



const initialState = {
    userA:localStorage.getItem('userA') ? JSON.parse(localStorage.getItem('userA')) : null,
   
}

const authReducer = (state=initialState,action)=>{
    switch (action.type) {  
      case actionTypes.UPDATE_USERA:
          return {
              ...state,
              userA:action.payload
          }       
        default:
            return state
    }
}

export default authReducer;