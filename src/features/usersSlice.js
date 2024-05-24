import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const showUser = createAsyncThunk('showUser', async (args, { rejectWithValue }) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    try {
        const result = await res.json();
        return result;
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const updateUserData = createAsyncThunk('updateUserData', async ({ userData, id }, { rejectWithValue }) => {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        })
        const result = await res.json();
        return result;
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const deleteUser = createAsyncThunk('deleteUser', async (id, { rejectWithValue }) => {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: "DELETE"
        })
        if (!res.ok) {
            throw new Error('Failed to delete user');
        }
        return id;

    } catch (error) {
        return rejectWithValue(error)
    }
})

export const userData = createSlice({
    name: 'userDetail',
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder.addCase(showUser.pending, (state) => {
            state.loading = true;
        })
            .addCase(showUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(showUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(updateUserData.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.map((user) =>
                    user.id === action.payload.id ? action.payload : user
                );
            })
            .addCase(updateUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                const id = action.payload;
                if (id) {
                    state.users = state.users.filter((user) => user.id !== id)
                }
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default userData.reducer