const  locationArr = (state ='', action) => {
  
    switch (action.type) {
        case 'APPEND_LOCATION':
            return [...state, action.payload];
        default:
            return state;
    }    
}
export default locationArr;