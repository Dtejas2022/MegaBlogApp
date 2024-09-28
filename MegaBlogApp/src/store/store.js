import { configureStore } from '@reduxjs/toolkit';
import { login } from './authSlice';
const store = configureStore({
    reducer:{
        auth: login,
    }
});


export default store;