import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import filmDataReducer from "./reducers/filmDataReducer";
import bookDataReducer from "./reducers/bookDataReducer";
import stateReducer from "./reducers/stateReducer";
import gameDataReducer from "./reducers/gameDataReducer";
import authReducer from './auth'
import commentsReducer from './comment'

export const store = configureStore({
    reducer:{
        state: stateReducer,
        filmData: filmDataReducer,
        bookData: bookDataReducer,
        gameData: gameDataReducer,
        authData: authReducer,
        commentsData: commentsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector