import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {BrowserRouter} from "react-router-dom"
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import authReducer from "./slices/authSlice";
import courseReducer from "./slices/courseSlice"
import { Toaster } from "react-hot-toast";

const store = configureStore({
  reducer: {
    auth: authReducer,
    course : courseReducer
  },
});


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 
    <Provider store={store}>
    <BrowserRouter>
          <App /> 
          <Toaster/>
      </BrowserRouter>
    </Provider>
);  
