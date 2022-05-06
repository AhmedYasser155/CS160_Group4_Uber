const  locationArr = (state ='', action) => {
  
    switch (action.type) {
        case 'APPEND_LOCATION':
            return [...state, action.payload];
        case 'RESET_ARR':
            return [];
        default:
            return state;
    }    
}
export default locationArr;