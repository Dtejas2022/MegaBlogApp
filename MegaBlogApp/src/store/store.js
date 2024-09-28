import { configureStore } from '@reduxjs/toolkit';
import authSlice, { login } from './authSlice';
const store = configureStore({
    reducer:{
        auth: authSlice,
    }
});


export default store;