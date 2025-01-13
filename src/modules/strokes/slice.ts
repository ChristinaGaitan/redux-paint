import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../utils/types";
import { endStroke } from "../sharedActions";
import { getProject, newProject } from "./api";

export const strokesSelector = (state: RootState) => state.strokes;
export const strokesLengthSelector = (state: RootState) => state.strokes.length;

const initialState: RootState["strokes"] = [];

const strokes = createSlice({
  name: "strokes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(endStroke, (state, action) => {
      const { historyIndex, stroke } = action.payload;

      if (historyIndex === 0) {
        state.push(stroke);
      } else {
        state.splice(-historyIndex, historyIndex, stroke);
      }
    });
    builder.addCase(loadProject.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default strokes.reducer;

type SaveProjectArg = {
  projectName: string;
  thumbnail: string;
};

export const saveProject = createAsyncThunk(
  "SAVE_PROJECT",
  async ({ projectName, thumbnail }: SaveProjectArg, { getState }) => {
    try {
      const response = await newProject(
        projectName,
        (getState() as RootState)?.strokes,
        thumbnail,
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
);

export const loadProject = createAsyncThunk(
  "LOAD_PROJECT",
  async (projectId: string) => {
    try {
      const { project } = await getProject(projectId);
      return project.strokes;
    } catch (error) {
      console.log(error);
    }
  },
);
