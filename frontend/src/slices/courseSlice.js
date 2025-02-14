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
        addSection: (state, action) => {
            state.sections.push(action.payload);
        },
        updateSection: (state, action) => {
            const index = state.sections.findIndex(sec => sec.id === action.payload.id);
            if (index !== -1) {
                state.sections[index] = { ...state.sections[index], ...action.payload };
            }
        },
        deleteSection: (state, action) => {
            state.sections = state.sections.filter(sec => sec.id !== action.payload);
        },
        resetCourseState: () => initialState,  
    },
});

export const { setCourse, addSection, updateSection, deleteSection, resetCourseState } = courseSlice.actions;
export default courseSlice.reducer;
