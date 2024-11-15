import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    departmentName: null,
    educationForm: null,
    semesterName: null,
    learnYear: null,
    isCloseTimetable: false,
    lectureHours: {
        id: null,
        hours: null
    },
    practiceHours: {
        id: null,
        hours: null
    },
    laboratoryHours: {
        id: null,
        hours: null
    },
    teacherFio: null,
    groupName: null,
    disciplineName: null
}

const loadSlice = createSlice({
    name: 'loadSlice',
    initialState: initialState,
    reducers: {
        setLectureHours(state, action) {
            state.lectureHours = {
                id: action.payload?.id,
                hours: action.payload?.hours
            }
            state.disciplineName = action.payload?.disciplineName
            state.teacherFio = action.payload?.teacherFio
            state.groupName = action.payload?.groupName
            state.practiceHours = null
            state.laboratoryHours = null
        },
        setPracticeHours(state, action) {
            state.practiceHours = {
                id: action.payload?.id,
                hours: action.payload?.hours
            }
            state.disciplineName = action.payload?.disciplineName
            state.teacherFio = action.payload?.teacherFio
            state.groupName = action.payload?.groupName
            state.lectureHours = null
            state.laboratoryHours = null
        },
        setLaboratoryHours(state, action) {
            state.laboratoryHours = {
                id: action.payload?.id,
                hours: action.payload?.hours
            }
            state.disciplineName = action.payload?.disciplineName
            state.teacherFio = action.payload?.teacherFio
            state.groupName = action.payload?.groupName
            state.lectureHours = null
            state.practiceHours = null
        },
        setIsCloseTimetable: (state, action) => {
            state.isCloseTimetable = action.payload
        },
        setDepartmentName: (state, action) => {
            state.departmentName = action.payload
        },
        setEducationForm: (state, action) => {
            state.educationForm = action.payload
        },
        setSemesterName: (state, action) => {
            state.semesterName = action.payload
        },
        setLearnYear: (state, action) => {
            state.learnYear = action.payload
        }
    }
});

export const {
    setDepartmentName,
    setEducationForm,
    setLearnYear,
    setSemesterName,
    setIsCloseTimetable,
    setLaboratoryHours,
    setLectureHours,
    setPracticeHours
} = loadSlice.actions;

export default loadSlice.reducer;