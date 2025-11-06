import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 1,
  stepData: {
    step1: {},
    step2: {},
    step3: {},
  },
  isComplete: false,
};

const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    setStepData: (state, action) => {
      const { step, data } = action.payload;

      state.stepData[`step${step + 1}`] = {
        ...state.stepData[`step${step + 1}`],
        ...data,
      };
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    resetCampaign: (state) => {
      return initialState;
    },
    setComplete: (state, action) => {
      state.isComplete = action.payload;
    },
  },
});

export const { setStepData, setCurrentStep, resetCampaign, setComplete } =
  campaignSlice.actions;

// Selectors
export const selectCampaign = (state) => state.campaign;
export const selectCurrentStep = (state) => state.campaign.currentStep;
export const selectStepData = (step) => (state) =>
  state.campaign.stepData[`step${step + 1}`];
export const selectAllStepData = (state) => state.campaign.stepData;
export const selectIsComplete = (state) => state.campaign.isComplete;

export default campaignSlice.reducer;
