import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData, addData, updateData, deleteData } from '../../services/api';

export const fetchCourses = createAsyncThunk(
    'courses/fetchCourses',
    async (_, { rejectWithValue }) => {
        try {
            const data = await getData();
            return data.sort((a, b) => b.id - a.id);
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createCourse = createAsyncThunk(
    'courses/createCourse',
    async (courseData, { rejectWithValue }) => {
        try {
            const data = await addData(courseData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const editCourse = createAsyncThunk(
    'courses/editCourse',
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const data = await updateData(id, updatedData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const removeCourse = createAsyncThunk(
    'courses/removeCourse',
    async (id, { rejectWithValue }) => {
        try {
            await deleteData(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const courseSlice = createSlice({
    name: 'courses',
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchCourses.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(createCourse.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createCourse.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data.unshift(action.payload); 
            })
            .addCase(createCourse.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(editCourse.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(editCourse.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.data.findIndex(c => c.id == action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
            })
            .addCase(editCourse.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(removeCourse.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(removeCourse.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = state.data.filter(c => c.id != action.payload);
            })
            .addCase(removeCourse.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export default courseSlice.reducer;
