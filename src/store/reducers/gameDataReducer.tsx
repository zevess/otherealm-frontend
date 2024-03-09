import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { currentGameItemProps, gameResultProps } from "../interfaces";
import { gameFetch, gameItemFetch } from "../fetches/gameFetch";


interface initialStateProps {
    rawgToken: string,
    gameResult?: gameResultProps,
    currentGameItem?: currentGameItemProps,
    gamesLoadingStatus?: string
}

const initialState: initialStateProps = {
    rawgToken: '436f7a5b62a84ceba29a4f7ec2c1f719',
    gameResult: undefined,
    currentGameItem: undefined,
};


export const gameDataSlice = createSlice({
    name: 'gameData',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(gameFetch.pending, (state) => {
                state.gamesLoadingStatus = 'loading'
            })
            .addCase(gameFetch.fulfilled, (state, action: PayloadAction<gameResultProps>) => {
                console.log("Successfully");
                state.gamesLoadingStatus = 'done'
                state.gameResult = action.payload
            })
            .addCase(gameFetch.rejected, (state) => {
                state.gamesLoadingStatus = 'rejected'
                console.log('Rejected')
            })
            .addCase(gameItemFetch.fulfilled, (state, action: PayloadAction<currentGameItemProps>) => {
                console.log("Successfully");
                state.currentGameItem = action.payload
            })
            .addCase(gameItemFetch.rejected, () => {
                console.log('Rejected')
            })
    }
})

export default gameDataSlice.reducer;