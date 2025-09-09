import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: ITransfer = {
  transferResponse: null,
  transferDetails: null,
};

const transferSlice = createSlice({
  name: 'transfer',
  initialState,
  reducers: {
    setTransferResponse: (state, action: PayloadAction<ITransferResponse>) => {
      state.transferResponse = action.payload;
    },
    setTransferDetails: (state, action: PayloadAction<ITransferDetails>) => {
      state.transferDetails = action.payload;
    },
  },
});

export const {setTransferResponse, setTransferDetails} = transferSlice.actions;

export default transferSlice;
