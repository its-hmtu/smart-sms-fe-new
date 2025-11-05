import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 0,
  stepData: {
    step1: {},
    step2: {
      testNumbers: [],
      testMessage: '',
    },
    step3: {},
  },
  isComplete: false,
}

const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    setStepData: (state, action) => {
      const { step, data } = action.payload;
      
      // Serialize date objects to DD-MM-YYYY format
      const serializedData = Object.keys(data).reduce((acc, key) => {
        const value = data[key];
        
        // Check if value is a Day.js object
        if (value && typeof value === 'object' && value.$d && typeof value.format === 'function') {
          acc[key] = value.format('DD-MM-YYYY');
        } else if (value instanceof Date) {
          // Format native Date objects to DD-MM-YYYY
          const day = String(value.getDate()).padStart(2, '0');
          const month = String(value.getMonth() + 1).padStart(2, '0');
          const year = value.getFullYear();
          acc[key] = `${day}-${month}-${year}`;
        } else {
          acc[key] = value;
        }
        
        return acc;
      }, {});
      
      state.stepData[`step${step + 1}`] = { ...state.stepData[`step${step + 1}`], ...serializedData };
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
  }
});

export const {
  setStepData,
  setCurrentStep,
  resetCampaign,
  setComplete,
} = campaignSlice.actions;

// Selectors
export const selectCampaign = (state) => state.campaign;
export const selectCurrentStep = (state) => state.campaign.currentStep;
export const selectStepData = (step) => (state) => state.campaign.stepData[`step${step + 1}`];
export const selectAllStepData = (state) => state.campaign.stepData;
export const selectIsComplete = (state) => state.campaign.isComplete;

export default campaignSlice.reducer;