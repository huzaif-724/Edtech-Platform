import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    signupData : null,
    isDashboardOpen: false,
    loading: false,
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
            localStorage.removeItem("user");
        },
        toggleDashboard: (state) => {
            state.isDashboardOpen = !state.isDashboardOpen;
        },
        closeDashboard: (state) => {
            state.isDashboardOpen = false;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
    }
})

export const {setLoading, setSignupData, setToken,  logout, setUser, toggleDashboard, closeDashboard} = authSlice.actions;

export default authSlice.reducer;