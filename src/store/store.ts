import {combineReducers} from "redux";
import contactReducer from './reducers/ContactSlice'
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    contact: contactReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']