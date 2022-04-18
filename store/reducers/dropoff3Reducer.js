const dropff3Reducer = (state = '', action) => {
    switch (action.type) {
        case 'ADD_Dropoff3':
            return action.payload;
        case 'DELETE_Dropoff3':
            return '';
        default:
            return state;
    }
}
export default dropff3Reducer;