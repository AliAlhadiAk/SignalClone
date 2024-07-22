import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './usersSlice'


const store = configureStore({
    reducer:{
      user:UserReducer
    }
})
export default store;