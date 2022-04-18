const dropff2Reducer = (state = '', action) => {
    switch (action.type) {
        case 'ADD_Dropoff2':
            return action.payload;
        case 'DELETE_Dropoff2':
            return '';
        default:
            return state;
    }
}
export default dropff2Reducer;