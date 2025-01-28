import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    signupData : null,
    // loading : false,
    token: localStorage.getItem("token") || null,
}

const authSlice = createSlice({
    name : "auth",
    initialState : initialState,
    reducers : {
        setSignupData(state, value) {
            state.signupData = value.payload;
        },
        // setLoading(state, value) {
        //     state.loading = value.payload;
        // },
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("token", action.payload); // Store token in localStorage
        },
        logout: (state) => {
            state.token = null;
            localStorage.removeItem("token"); // Remove token from localStorage
        },
    }
})

export const {setLoading, setSignupData, setToken, logout } = authSlice.actions;

export default authSlice.reducer;