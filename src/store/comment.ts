import axios from '../axios.ts'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { authDataProps } from './interfaces.tsx';

export const fetchComment = createAsyncThunk('/comments', async(params) => {
    const {data} = await axios.post('/comments', params);
    return data
})

export const fetchGetComments = createAsyncThunk('/comments/:postId', async(postId) => {
    const {data} = await axios.get(`/comments/${postId}`);
    return data
})


// export interface authProps {
//     data: authDataProps | null
//     status: string
// }

const initialState = {
    comments: {
        items: [],
        status: "loading"
    }
}

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder
        //comment
            .addCase(fetchComment.pending, (state) =>{
                state.comments.status = "loading"
            })
            .addCase(fetchComment.fulfilled, (state, action) =>{
                state.comments.status = "loaded",
                state.comments.items = action.payload
            })

            .addCase(fetchGetComments.pending, (state) =>{
                state.comments.status = "loading"
            })
            .addCase(fetchGetComments.fulfilled, (state, action) =>{
                state.comments.status = "loaded",
                state.comments.items = action.payload
            })
    }
})

// export const selectIsAuth = (state: any) => Boolean(state.auth.data);


export default commentsSlice.reducer
