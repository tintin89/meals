import * as actionTypes from './actionTypes';


export const updateUserA = (ua)=>{   
    return {
        type:actionTypes.UPDATE_USERA,
        payload:ua
    }
}