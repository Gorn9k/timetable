import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    frame: 'FIRST'
}

const roomSlice = createSlice({
    name: "roomSlice",
    initialState,
    reducers: {
        setFrame(state, action) {
            state.frame = action.payload
        }
    }
})

export const {
    setFrame
} = roomSlice.actions;

export default roomSlice.reducer;