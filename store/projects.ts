import { StoryData } from '@storyblok/react';
import { createReducer, createAction, PayloadAction } from '@reduxjs/toolkit';

const initialState: { [key: string]: StoryData[] } = {
    value: [],
};

export const setterProjects = createAction<StoryData[]>('setterProjects');

export const projectsSlice = createReducer(initialState, (builder) => {
    builder.addCase(setterProjects, (state, action: PayloadAction<StoryData[]>) => {
        state.value = action.payload;
    });
});
