import { useDispatch, useSelector } from "react-redux"
import { 
  selectCampaign, 
  selectCurrentStep, 
  selectStepData, 
  selectAllStepData,
  selectIsComplete,
  setStepData, 
  setCurrentStep, 
  resetCampaign, 
  setComplete 
} from "./campaignSlice";

function useCampaign() {
  const dispatch = useDispatch();
  const campaign = useSelector(selectCampaign);
  const currentStep = useSelector(selectCurrentStep);
  const allStepData = useSelector(selectAllStepData);
  const isComplete = useSelector(selectIsComplete);

  // Get individual step data
  const step1Data = useSelector(selectStepData(0));
  const step2Data = useSelector(selectStepData(1));
  const step3Data = useSelector(selectStepData(2));

  const saveStepData = (step, data) => dispatch(setStepData({ step, data }));
  const updateCurrentStep = (step) => dispatch(setCurrentStep(step));
  
  const getStepData = (step) => {
    switch (step) {
      case 0: return step1Data;
      case 1: return step2Data;
      case 2: return step3Data;
      default: return {};
    }
  };
  
  const reset = () => dispatch(resetCampaign());
  const markComplete = (completed = true) => dispatch(setComplete(completed));

  return {
    campaign,
    currentStep,
    allStepData,
    isComplete,
    step1Data,
    step2Data,
    step3Data,
    saveStepData,
    updateCurrentStep,
    getStepData,
    reset,
    markComplete,
  }
}

export default useCampaign;