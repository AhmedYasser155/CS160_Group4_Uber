const pickupReducer = (state = "", action) => {
  
    switch (action.type) {
        case 'ADD_PICKUP':
            return action.payload;
        case 'DELETE_PICKUP':
            return '';
        default:
            return state;
    }    
}
export default pickupReducer;