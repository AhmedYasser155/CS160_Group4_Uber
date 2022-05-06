<<<<<<< HEAD
const pickupReducer = (state = "", action) => {
=======
const pickupReducer = (state ='', action) => {
>>>>>>> c616523f... Empty current location bug fixed
  
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