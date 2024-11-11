import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    departmentName: null,
    educationForm: null,
    semesterName: null,
    learnYear: null,
    teacherFio: null,
    groupName: null
}

const counterSlice = createSlice({
    name: 'loadSlice',
    initialState: initialState,
    reducers: {
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
            state.teacherFio = action.payload;
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
    setGroupName
} = counterSlice.actions;

export default counterSlice.reducer;