import { StoryData } from '@storyblok/react';
import { createReducer, createAction, PayloadAction } from '@reduxjs/toolkit';

const initialState: { [key: string]: StoryData[] } = {
    value: [],
};

export const setterPosts = createAction<StoryData[]>('setterPosts');

export const postsSlice = createReducer(initialState, {
    setterPosts: (state, action: PayloadAction<StoryData[]>) => {
        state.value = action.payload;
    },
});
