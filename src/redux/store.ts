import { combineReducers, configureStore } from "@reduxjs/toolkit";
import mainSlice from './mainSlice'
import spacetimeSlice from "./spacetimeSlice";

const store = configureStore({
    reducer: combineReducers({
        main: mainSlice.reducer, 
        spacetime: spacetimeSlice.reducer
    })
})

export default store