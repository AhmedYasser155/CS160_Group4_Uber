const dropoff4Reducer = (state = '', action) => {
    switch (action.type) {
        case 'ADD_Dropoff4':
            return action.payload;
        case 'DELETE_Dropoff4':
            return '';
        default:
            return state;
    }
}
export default dropoff4Reducer;