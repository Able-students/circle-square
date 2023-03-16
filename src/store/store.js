import { configureStore } from '@reduxjs/toolkit';
import state from './reducers/';
import reduxThunk from 'redux-thunk';

const store = configureStore({
    reducer: state, middleware: [reduxThunk]
})


export default store;