import axios from '../axios.ts'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { authDataProps } from './interfaces.tsx';

export const fetchAuth = createAsyncThunk('/auth/fetchAuth', async(params) => {
    const {data} = await axios.post('/auth/login', params);
    return data
})

export const fetchRegister = createAsyncThunk('/auth/fetchRegister', async(params) => {
    const {data} = await axios.post('/auth/register', params);
    return data
})

export const fetchAuthMe = createAsyncThunk('/auth/fetchAuthMe', async() => {
    const {data} = await axios.get('/auth/me');
    return data
})


export interface authProps {
    data: authDataProps | null
    status: string
}

const initialState: authProps = {
    data: null,
    status: "loading",
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        logout: (state) =>{
            state.data = null
        }
    },
    extraReducers: (builder) =>{
        builder
        //login
            .addCase(fetchAuth.pending, (state) =>{
                state.status = "loading",
                state.data = null
            })
            .addCase(fetchAuth.fulfilled, (state, action) =>{
                state.status = "loaded",
                state.data = action.payload
            })
            .addCase(fetchAuth.rejected, (state) =>{
                state.status = "error",
                state.data = null
            })

            //register
            .addCase(fetchRegister.pending, (state) =>{
                state.status = "loading",
                state.data = null
            })
            .addCase(fetchRegister.fulfilled, (state, action) =>{
                state.status = "loaded",
                state.data = action.payload
            })
            .addCase(fetchRegister.rejected, (state) =>{
                state.status = "error",
                state.data = null
            })

            //me
            .addCase(fetchAuthMe.pending, (state) =>{
                state.status = "loading",
                state.data = null
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) =>{
                state.status = "loaded",
                state.data = action.payload
            })
            .addCase(fetchAuthMe.rejected, (state) =>{
                state.status = "error",
                state.data = null
            })
    }
})

// export const selectIsAuth = (state: any) => Boolean(state.auth.data);

export const { logout } = authSlice.actions

export default authSlice.reducer
