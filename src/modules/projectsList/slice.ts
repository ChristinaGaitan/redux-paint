import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../utils/types";
import { fetchProjectsList } from "./api";

const initialState: RootState["projectList"] = {
  error: undefined,
  pending: false,
  projects: [],
};

const slice = createSlice({
  name: "projectsList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjectsList.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(getProjectsList.fulfilled, (state, action) => {
      state.pending = false;
      state.projects = action.payload;
      state.error = undefined;
    });
    builder.addCase(getProjectsList.rejected, (state) => {
      state.pending = false;
      state.error = "Something went wrong";
    });
  },
});

export const projectList = slice.reducer;

export const projectListSelector = (state: RootState) =>
  state.projectList.projects;

export const projectsListPendingSelector = (state: RootState) =>
  state.projectList.pending;

export const projectsListErrorSelector = (state: RootState) =>
  state.projectList.error;

export const getProjectsList = createAsyncThunk(
  "GET_PROJECTS_LIST",
  async () => {
    return fetchProjectsList();
  },
);
