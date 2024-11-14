import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    groupSchedule: []
}

const groupScheduleSlice = createSlice({
    name: "groupScheduleSlice",
    initialState,
    reducers: {
        setGroupSchedule: (state, action) => {
            state.groupSchedule = action.payload
        },
        addGroupSchedule: (state, action) => {
            state.groupSchedule.push(action.payload)
        },
        editGroupSchedule: (state, action) => {
            Object.assign(state.groupSchedule.find(value => value.id === action.payload.id), action.payload)
        },
        removeGroupSchedule: (state, action) => {
            state.groupSchedule = state.groupSchedule.filter(value => value.id !== action.payload)
        }
    }
})

export const {
    setGroupSchedule,
    addGroupSchedule,
    editGroupSchedule,
    removeGroupSchedule
} = groupScheduleSlice.actions;

export default groupScheduleSlice.reducer;