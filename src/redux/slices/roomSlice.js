import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    frame: 'FIRST',
    modal: {
        isOpen: false
    },
    lessons: []
}

const roomSlice = createSlice({
    name: "roomSlice",
    initialState,
    reducers: {
        setFrame(state, action) {
            state.frame = action.payload
        },
        setModalIsOpen(state, action) {
            state.modal.isOpen = action.payload
        },
        setLessons: (state, action) => {
            state.groupSchedule = action.payload
        },
        addLesson: (state, action) => {
            state.groupSchedule.push(action.payload)
        },
        editLesson: (state, action) => {
            Object.assign(state.groupSchedule.find(value => value.id === action.payload.id), action.payload)
        },
        removeLesson: (state, action) => {
            state.groupSchedule = state.groupSchedule.filter(value => value.id !== action.payload)
        }
    }
})

export const {
    setFrame,
    setModalIsOpen,
    addLesson,
    editLesson,
    removeLesson,
    setLessons
} = roomSlice.actions;

export default roomSlice.reducer;