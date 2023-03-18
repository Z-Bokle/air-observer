import { combineReducers, configureStore } from "@reduxjs/toolkit"
import mainSlice from './mainSlice'

const store = configureStore({
  reducer: combineReducers({
    main: mainSlice.reducer
  })
})

export default store