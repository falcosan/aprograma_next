import { postsSlice } from './posts';
import { projectsSlice } from './projects';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

const store = configureStore({
    reducer: {
        postsSlice,
        projectsSlice,
    },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
export default store;
