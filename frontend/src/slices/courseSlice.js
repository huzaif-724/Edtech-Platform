import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    course: null,
    sections: [],
};

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        setCourse: (state, action) => {
            state.course = { ...state.course, ...action.payload };
        },
        setSections: (state, action) => {
            state.sections = action.payload
        },
        updateSection: (state, action) => {
            const index = state.sections.findIndex(sec => sec._id === action.payload._id);
            if (index !== -1) {
                state.sections[index] = { ...state.sections[index], ...action.payload };
            }
        },
        removeSection: (state, action) => {
            state.sections = state.sections.filter(sec => sec._id !== action.payload);
        },
        resetCourseState: () => initialState,  
    },
});

export const { setCourse, setSections, updateSection, removeSection, resetCourseState } = courseSlice.actions;
export default courseSlice.reducer;
