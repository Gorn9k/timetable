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
    teacherFio: {
        id: null,
        fio: null
    },
    groupName: {
        id: null,
        name: null
    }
}

const loadSlice = createSlice({
    name: 'loadSlice',
    initialState: initialState,
    reducers: {
        _validateTeacherAndGroupRowId(state, id) {
            if (state.teacherFio && state.teacherFio.id !== id) {
                state.teacherFio = null
                state.groupName = null
            }
        },
        _validateHoursRowId(state, id) {
            if (state.lectureHours)
                state.lectureHours.id !== id && (state.lectureHours = null)
            else if (state.practiceHours)
                state.practiceHours.id !== id && (state.practiceHours = null)
            else if (state.laboratoryHours)
                state.laboratoryHours.id !== id && (state.laboratoryHours = null)
        },
        setLectureHours(state, action) {
            state.lectureHours = action.payload
            state.practiceHours = null
            state.laboratoryHours = null
            action.payload && loadSlice.caseReducers._validateTeacherAndGroupRowId(state, action.payload.id)
        },
        setPracticeHours(state, action) {
            state.practiceHours = action.payload
            state.lectureHours = null
            state.laboratoryHours = null
            action.payload && loadSlice.caseReducers._validateTeacherAndGroupRowId(state, action.payload.id)
        },
        setLaboratoryHours(state, action) {
            state.laboratoryHours = action.payload
            state.lectureHours = null
            state.practiceHours = null
            action.payload && loadSlice.caseReducers._validateTeacherAndGroupRowId(state, action.payload.id)
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
        },
        setTeacherFio: (state, action) => {
            state.teacherFio = action.payload
            action.payload && loadSlice.caseReducers._validateHoursRowId(state, action.payload.id)
        },
        setGroupName: (state, action) => {
            state.groupName = action.payload;
        }
    }
});

export const {
    setDepartmentName,
    setEducationForm,
    setLearnYear,
    setSemesterName,
    setTeacherFio,
    setGroupName,
    setIsCloseTimetable,
    setLaboratoryHours,
    setLectureHours,
    setPracticeHours
} = loadSlice.actions;

export default loadSlice.reducer;