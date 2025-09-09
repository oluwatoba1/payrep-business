import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IProfileCompletion = {
  country: '',
  business: {
    businessName: '',
    rcNumber: '',
    incorporationDate: new Date()
  },
  kycType: {
    type: 'bin',
    nin: '',
    bvn: ''
  },
  pepStatus: '',
  income: {
    occupation: '',
    additionalSourceOfIncome: '',
    annualIncome: '',
  },
  address: {
    houseNumber: '',
    streetNumber: '',
    city: '',
    state: '',
    lga: ''
  }
};


const profileCompletionSlice = createSlice({
  name: 'profileCompletion',
  initialState,
  reducers: {
    setProfileField: <T extends keyof IProfileCompletion>(state:IProfileCompletion, action: PayloadAction<{ key: T, value: IProfileCompletion[T] }>) => {
      state[action.payload.key] = action.payload.value;
    },
    setAddressField: <T extends keyof Address>(state:IProfileCompletion, action: PayloadAction<{ key: T, value: Address[T] }>) => {
      state.address[action.payload.key] = action.payload.value;
    },
    setKycTypeField: <T extends keyof KycType>(state:IProfileCompletion, action: PayloadAction<{ key: T, value: KycType[T] }>) => {
      state.kycType[action.payload.key] = action.payload.value;
    },
    setIncomeField: <T extends keyof Income>(state:IProfileCompletion, action: PayloadAction<{ key: T, value: Income[T] }>) => {
      state.income[action.payload.key] = action.payload.value;
    },
    setBusinessField: <T extends keyof Business>(state:IProfileCompletion, action: PayloadAction<{ key: T, value: Business[T] }>) => {
      state.business[action.payload.key] = action.payload.value;
    },
  }
});

export const { setProfileField, setBusinessField, setKycTypeField, setIncomeField, setAddressField } = profileCompletionSlice.actions;


export default profileCompletionSlice.reducer;