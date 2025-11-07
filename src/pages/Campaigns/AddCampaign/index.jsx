import UploadSubscriberListModal from "@/components/Modals/UploadSubscriberListModal";
import { Button, Divider, Flex, Form, Space, Steps } from "antd";
import React, { useCallback, useState, useEffect } from "react";
import AddCampaignStep1 from "./AddCampaignStep1";
import AddCampaignStep2 from "./AddCampaignStep2";
import AddCampaignStep3 from "./AddCampaignStep3";
import useCampaign from "@/features/campaign/useCampaign";
import { useQuery } from "@tanstack/react-query";
import CampaignService from "@/features/campaign/campaignService";

const steps = [
  {
    title: "Campaign",
    content: "Campaign Info",
  },
  {
    title: "Review and add test number",
    content: "Review and add test number",
  },
  {
    title: "Confirm",
    content: "Confirm",
  },
];

const AddCampaign = () => {
  const [formStep1] = Form.useForm();
  const [formStep2] = Form.useForm();
  const [formStep3] = Form.useForm();
  
  const { 
    currentStep, 
    saveStepData, 
    updateCurrentStep, 
    getStepData, 
    isComplete,
    markComplete,
    reset 
  } = useCampaign();
  
  // Initialize forms with saved data when component mounts
  useEffect(() => {
    const step1Data = getStepData(0);
    const step2Data = getStepData(1);
    const step3Data = getStepData(2);
    
    if (step1Data && Object.keys(step1Data).length > 0) {
      formStep1.setFieldsValue(step1Data);
    }
    if (step2Data && Object.keys(step2Data).length > 0) {
      formStep2.setFieldsValue(step2Data);
    }
    if (step3Data && Object.keys(step3Data).length > 0) {
      formStep3.setFieldsValue(step3Data);
    }
  }, []);

  const validateCurrentStep = async () => {
    try {
      switch (currentStep) {
        case 0:
          await formStep1.validateFields();
          return true;
        case 1:
          await formStep2.validateFields();
          return true;
        case 2:
          await formStep3.validateFields();
          return true;
        default:
          return true;
      }
    } catch (error) {
      console.error('Validation failed:', error);
      return false;
    }
  };

  const saveCurrentStepData = () => {
    switch (currentStep) {
      case 0:
        const step1Values = formStep1.getFieldsValue();
        saveStepData(0, step1Values);
        break;
      case 1:
        const step2Values = formStep2.getFieldsValue();
        saveStepData(1, step2Values);
        break;
      case 2:
        const step3Values = formStep3.getFieldsValue();
        saveStepData(2, step3Values);
        break;
    }
  };

  const nextStep = async () => {
    // Validate current step before proceeding
    const isValid = await validateCurrentStep();
    if (!isValid) return;

    // Save current step data
    saveCurrentStepData();

    // Check if this is the last step
    if (currentStep === steps.length - 1) {
      markComplete(true);
      console.log('Campaign completed!');
      return;
    }

    // Move to next step
    updateCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep === 0) return;
    
    // Save current step data before going back
    saveCurrentStepData();
    
    // Move to previous step
    updateCurrentStep(currentStep - 1);
  };

  const stepItems = steps.map((step) => ({
    key: step.title,
    title: step.title,
  }));

  const renderStepContent = useCallback(() => {
    switch (currentStep) {
      case 0:
        return (
          <AddCampaignStep1
            steps={steps}
          />
        );
      case 1:
        return (
          <AddCampaignStep2 
            steps={steps}
          />
        );
      case 2:
        return (
          <AddCampaignStep3 
            steps={steps}
          />
        );
      default:
        return null;
    }
  }, [currentStep, formStep1, formStep2, formStep3]);

  return (
    <Space
      direction='vertical'
      style={{
        width: "100%",
      }}
    >
      <Steps
        current={currentStep}
        items={stepItems}
        labelPlacement='vertical'
      />
      <Divider />

      {renderStepContent()}
    </Space>
  );
};

export default AddCampaign;
