import { combineReducers } from "redux";
import pickupReducer from "./pickupReducer";
import dropff1Reducer from "./dropoff1Reducer";
import dropff2Reducer from "./dropoff2Reducer";
import dropff3Reducer from "./dropoff3Reducer";
import dropff4Reducer from "./dropoff4Reducer";
import dropff5Reducer from "./dropoff5Reducer";
import currLocationReducer from "./currLocationReducer";
import locationArr from "./locationArr";

const rootReducer = combineReducers({
    pickup : pickupReducer,
    dropoff1: dropff1Reducer,
    dropoff2: dropff2Reducer,
    dropoff3: dropff3Reducer,
    dropoff4: dropff4Reducer,
    dropoff5: dropff5Reducer,
    locationArr: locationArr,
    currLocation : currLocationReducer
    })

export default rootReducer;