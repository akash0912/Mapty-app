import React from "react";
import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxThunk from 'redux-thunk';
import {} from 'react-redux';
import placesReducer from "./reducer/places-reducer";

const rootReducer = combineReducers({
    place: placesReducer
})
const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default store;