const initialState = {
  token: localStorage.getItem('token'),

  
}


export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SCHOOLS_SUCCESS':
      return {
        ...state,
    
      };
      case 'SCHOOLS_UPDATE':
        return {
          ...state,
      
        };
      


    default: return { ...state }
  }
}






