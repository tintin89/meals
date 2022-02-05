import * as actionTypes from './actionTypes';


export const updateLoading = (isloading)=>{   
    return {
        type:actionTypes.UPDATE_LOADING,
        payload:isloading
    }
}

export const updateLoadingR = (loadingR)=>{
    return {
        type:actionTypes.UPDATE_LOADINGR,
        payload:loadingR
    }
}



export const updateSelectedC = (s)=>{   
    return {
        type:actionTypes.UPDATE_SELECTEDC,
        payload:s
    }
}

export const updateTyping = (t)=>{   
    return {
        type:actionTypes.UPDATE_TYPING,
        payload:t
    }
}

export const updateBackdrop= (show) =>{
    return {
        type:actionTypes.UPDATE_SHOW_BACKDROP,
        payload:show
    }
}