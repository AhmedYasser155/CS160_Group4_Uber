const dropff5Reducer = (state = '', action) => {
    switch (action.type) {
        case 'ADD_Dropoff5':
            return action.payload;
        case 'DELETE_Dropoff5':
            return '';
        default:
            return state;
    }
}
export default dropff5Reducer;