import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookie from 'js-cookie'

export const fetchLoginUser = createAsyncThunk(
    'fetchUser/login',
    async (data: any, {rejectWithValue} ) => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', data)
            Cookie.set('token', response.data.token)
            return response.data
        } catch (error: any) {
            rejectWithValue({error: error.message})
        }
    }
)