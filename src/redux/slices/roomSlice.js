import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    frame: 'FIRST',
    lessonsModal: {
        isOpen: false
    },
    lessonModal: {
        isOpen: false
    },
    lessons: [],
    selectedLesson: null
}

const roomSlice = createSlice({
    name: "roomSlice",
    initialState,
    reducers: {
        setFrame(state, action) {
            state.frame = action.payload
        },
        setSelectedLesson(state, action) {
            state.selectedLesson = action.payload
        },
        setLessonsModalIsOpen(state, action) {
            state.lessonsModal.isOpen = action.payload
        },
        setLessonModalIsOpen(state, action) {
            state.lessonModal.isOpen = action.payload
        },
        setLessons: (state, action) => {
            state.lessons = action.payload
        },
        addLesson: (state, action) => {
            state.lessons.push(action.payload)
        },
        editLesson: (state, action) => {
            Object.assign(state.lessons.find(value => value.id === action.payload.id), action.payload)
        },
        removeLesson: (state, action) => {
            state.lessons = state.lessons.filter(value => value.id !== action.payload)
        }
    }
})

export const {
    setFrame,
    setLessonsModalIsOpen,
    setLessonModalIsOpen,
    setSelectedLesson,
    addLesson,
    editLesson,
    removeLesson,
    setLessons
} = roomSlice.actions;

export default roomSlice.reducer;