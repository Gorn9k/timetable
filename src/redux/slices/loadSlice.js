import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    teacherFio: null,
    groupName: null
}

const counterSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        setTeacherFio: (state, action) => {
            state.teacherFio = action.payload;
        },
        setGroupName: (state, action) => {
            state.groupName = action.payload;
        }
    }
});

export const { setTeacherFio, setGroupName } = counterSlice.actions;

export default counterSlice.reducer;