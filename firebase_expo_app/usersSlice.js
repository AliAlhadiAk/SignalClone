import { createSlice } from "@reduxjs/toolkit";
import { stateCache } from "expo-router/build/getLinkingConfig";

const initialState = {
    users:[],
    isLoggedIn :undefined
}

const UserSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser : (state,action) => {
           state.users = action.payload
        },
        setLoggeddIn : (state,action) => {
            state.isLoggedIn = action.payload
        }
    }
})
export default UserSlice.reducer
export const {setUser,setLoggeddIn} = UserSlice.actions