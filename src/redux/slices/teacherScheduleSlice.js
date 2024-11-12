import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    teacherSchedule: []
}

const teacherScheduleSlice = createSlice({
    name: "teacherSchedule",
    initialState,
    reducers: {
        setTeacherSchedule: (state, action) => {
            state.teacherSchedule = action.payload
        },
        addTeacherSchedule: (state, action) => {
           state.teacherSchedule.push(action.payload)
        },
        editTeacherSchedule: (state, action) => {
            Object.assign(state.teacherSchedule.find(value => value.id === action.payload.id), action.payload)
        },
        removeTeacherSchedule: (state, action) => {
            state.teacherSchedule = state.teacherSchedule.filter(value => value.id !== action.payload)
        }
    }
})

export const {
    setTeacherSchedule,
    addTeacherSchedule,
    editTeacherSchedule,
    removeTeacherSchedule
} = teacherScheduleSlice.actions;

export default teacherScheduleSlice.reducer;