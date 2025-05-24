import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { IPost } from "../PostSlice";

export const fetchCreatePost = createAsyncThunk(
    'fetchPost/create',
    async (data: IPost, {rejectWithValue} ) => {
        try {
            // 1. получить токен из куков
            // 2. подтянуть его перед датой через мидлвар
            const response = await axios.post('http://localhost:3000/api/user/addPost', data)
            return response.data
        } catch (error: any) {
            rejectWithValue({error: error.message})
        }
    }
)