const dropff1Reducer = (state = '', action) => {
  
    switch (action.type) {
        case 'ADD_Dropoff1':
            return action.payload;
        case 'DELETE_Dropoff1':
            return '';
        default:
            return state;
    }    
}
export default dropff1Reducer;