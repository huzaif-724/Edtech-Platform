import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    signupData : null,
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null, 
}

const authSlice = createSlice({
    name : "auth",
    initialState : initialState,
    reducers : {
        setSignupData(state, value) {
            state.signupData = value.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("token", action.payload); // Store token in localStorage
        },
        setUser: (state, action) => {  
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem("token"); 
        },
    }
})

export const {setLoading, setSignupData, setToken, logout, setUser } = authSlice.actions;

export default authSlice.reducer;