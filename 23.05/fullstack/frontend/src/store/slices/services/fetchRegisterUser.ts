import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


interface IUserData {
    email: string
    password?: string
    posts?: any[]
}

export interface IRegisterData {
    message: string
    user: IUserData
}

export const fetchRegisterUser = createAsyncThunk(
    'fetchUser/register',
    async (data: any, {rejectWithValue} ) => {
        try {
            const response = await axios.post<IRegisterData>('http://localhost:3000/api/auth/register', data)
            return response.data
        } catch (error: any) {
            rejectWithValue({error: error.message})
            
        }
    }
)