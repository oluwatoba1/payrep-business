import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const initialState: ICompliance = {
  bvnData: {
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    bvn: '',
    gender: '',
    email: '',
    phoneNumber: '',
  },
  ninData: {
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    nin: '',
    gender: '',
    email: '',
    phoneNumber: '',
  },
};

const ComplianceSlice = createSlice({
  name: 'compliance',
  initialState,
  reducers: {
    updateBvnData: (state, action: PayloadAction<ICompliance['bvnData']>) => {
      state.bvnData = action.payload;
    },
    updateNinData: (state, action: PayloadAction<ICompliance['ninData']>) => {
      state.ninData = action.payload;
    },
  },
});

export const {updateBvnData, updateNinData} = ComplianceSlice.actions;

export default ComplianceSlice;
