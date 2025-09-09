import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface App {
  appState: IAppState | null;
  toastRequests: IToastItem[];
}

const initialState: App = {
  appState: null,
  toastRequests: [],
};
export const createToastRequest = createAsyncThunk(
  'app/createToastRequest',
  async (payload: IToastItem, {dispatch}) => {
    dispatch(AppSlice.actions.addToastRequest(payload));

    setTimeout(() => {
      dispatch(AppSlice.actions.removeToastRequest());
    }, payload.duration + 200);
  },
);

const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateAppstate: (
      state,
      action: PayloadAction<Partial<IAppState> | null>,
    ) => {
      state.appState = action.payload;
    },
    addToastRequest: (state, action: PayloadAction<IToastItem>) => {
      state.toastRequests.push(action.payload);
    },
    removeToastRequest: state => {
      state.toastRequests.shift();
    },
  },
});

export const {updateAppstate} = AppSlice.actions;

export default AppSlice;
