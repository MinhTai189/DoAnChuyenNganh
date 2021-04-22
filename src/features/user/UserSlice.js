import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        getUser: (state, action) => {
            state.user = { ...action.payload }
        },
        removeUser: state => {
            state.user = null
        },
        addDataUser: (state, action) => {
            state.user = { ...state.user, data: { ...action.payload } }
        },
        addTopicsList: (state, action) => {
            state.user = { ...state.user, topicsList: action.payload }
        }
    },
});

export const { getUser, removeUser, addDataUser, addTopicsList } = userSlice.actions;

export const selectUser = state => state.user.user;

export default userSlice.reducer;