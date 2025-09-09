import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

const initialState: IService = {
  vasCategory: null,
  vasCategoryService: null,
};

const ServiceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setVasCategory: (state, action: PayloadAction<IVasCategoryResponse>) => {
      state.vasCategory = action.payload;
    },
    setVasCategoryService: (
      state,
      action: PayloadAction<IVasCategoryServiceResponse>,
    ) => {
      state.vasCategoryService = action.payload;
    },
  },
});

export const {setVasCategory, setVasCategoryService} = ServiceSlice.actions;

export default ServiceSlice;
