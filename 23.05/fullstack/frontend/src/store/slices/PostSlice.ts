import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchCreatePost } from "./services/fetchCreatePost";

export interface IPost {
    title: string
    description: string,
}

interface IPostSlice {
    posts: null | IPost[]
    loading: boolean
    error: null
}

const initialState: IPostSlice = {
    posts: [],
    loading: false,
    error: null,
}

export const PostSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(fetchCreatePost.pending, (state) => {
            state.error = null
            state.posts = null
            state.loading = true
        })
        builder.addCase(fetchCreatePost.rejected, (state, action) => {
            state.posts = null
            state.loading = false
            // state.error = action.error?.message
        })
        builder.addCase(fetchCreatePost.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false
            state.error = null
            state.posts = action.payload
        })
    },
})


export default PostSlice.reducer