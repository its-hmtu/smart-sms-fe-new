import AppInput from "@/components/AppInput";
import AppTable from "@/components/AppTable";
import AppUpload from "@/components/AppUpload";
import { Button, Col, Flex, Form, Modal, Row } from "antd";
import {
  DownloadIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadIcon,
} from "lucide-react";
import React, { useEffect, useMemo } from "react";
import phoneFrame from "@/assets/images/phone-frame.png";
import useCampaign from "@/features/campaign/useCampaign";
import AddTestListModal from "../components/AddTestListModal";
import DeleteModal from "@/components/Modals/DeleteModal";
import { useMutation } from "@tanstack/react-query";
import CampaignService from "@/features/campaign/campaignService";
import { toast } from "react-toastify";
import { isEmpty } from "lodash";

const AddCampaignStep2 = ({ steps }) => {
  const [form] = Form.useForm();
  const [testNumbers, setTestNumbers] = React.useState([]);
  const [demoText, setDemoText] = React.useState("");
  const [openAddModal, setOpenAddModal] = React.useState({
    open: false,
    record: null,
  });
  const [deleteModal, setDeleteModal] = React.useState({
    open: false,
    record: null,
  });
  const {
    // step1Data,
    campaign,
    currentStep,
    saveStepData,
    updateCurrentStep,
  } = useCampaign();
  const parsedData = useMemo(() => {
    if (isEmpty(campaign?.stepData?.step1)) {
      return {};
    }
    return JSON.parse(campaign?.stepData?.step1?.data);
  }, [campaign]);

  const updateCampaignMutation = useMutation({
    mutationFn: CampaignService.updateCampaign,
  });

  // Initialize form with saved data
  // React.useEffect(() => {
  //   if (initialData) {
  //     form.setFieldsValue(initialData);
  //   }
  // }, [form, initialData]);

  // Save data whenever testNumbers change
  // React.useEffect(() => {
  //   if (saveStepData) {
  //     const formValues = form.getFieldsValue();
  //     saveStepData({
  //       ...formValues,
  //       testNumbers,
  //     });
  //   }
  // }, [testNumbers, saveStepData, form]);

  const handleEdit = (record) => {
    setOpenAddModal({
      open: true,
      record,
    });
  };

  const handleDelete = (record) => {
    setDeleteModal({
      open: true,
      record,
    });
  };

  const handleAddTestNumber = () => {
    setOpenAddModal({
      open: true,
      record: null,
    });
  };

  const columns = useMemo(
    () => [
      {
        title: "Phone number",
        dataIndex: "phone_number",
        key: "phone_number",
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Flex gap={8} align='center' justify='center'>
            <Button
              type='text'
              icon={<PencilIcon size={14} />}
              onClick={() => handleEdit(record)}
            />
            <Button
              type='text'
              icon={<TrashIcon size={14} />}
              danger
              onClick={() => handleDelete(record)}
            />
          </Flex>
        ),
      },
    ],
    []
  );

  const beforeNextStep = async () => {
    const testNumberData = testNumbers.map((item) => item.phone_number) || [];
    const { created_by, step, created_at, updated_at, ...rest } =
      campaign.stepData.step1;
    const payload = {
      id: campaign.id,
      data: parsedData,
      test_numbers: testNumberData,
      user_update: created_by,
      step: 2,
      ...rest,
    };
    await updateCampaignMutation.mutateAsync(payload, {
      onSuccess: (data) => {
        saveStepData(0, payload);
      },
    });
  };

  const nextStep = async () => {
    // const values =

    await beforeNextStep()
      .then(() => {
        updateCurrentStep(2);
      })
      .catch((error) => {
        toast.error("Something went wrong. Please try again.");
      });
  };

  const prevStep = () => {
    updateCurrentStep(0);
  };

  const onOk = (values, isEdit) => {
    if (isEdit) {
      setTestNumbers((prev) =>
        prev.map((item) =>
          item.id === values.id
            ? { ...item, phone_number: values.phone_number }
            : item
        )
      );
    } else {
      const newTestNumber = {
        id: Date.now(),
        phone_number: values.phone_number,
      };
      setTestNumbers((prev) => [...prev, newTestNumber]);
    }
  };

  const onDeleteOk = () => {
    const recordToDelete = deleteModal.record;
    setTestNumbers((prev) =>
      prev.filter((item) => item.id !== recordToDelete.id)
    );
    setDeleteModal({
      open: false,
      record: null,
    });
  };

  useEffect(() => {
    if (campaign.stepData.step1) {
      setDemoText(parsedData.text_1 || "");
    }
  }, [campaign.stepData.step1, parsedData]);

  return (
    <>
      <Form layout='vertical' initialValues={{}} form={form}>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Flex gap={8} align='center'>
              <AppInput
                label='Add my test number'
                name='test_number'
                placeholder='Enter your number'
              />
              <Form.Item label=' '>
                <Button type='primary'>Send Now</Button>
              </Form.Item>
            </Flex>
          </Col>
          <Col span={12}>
            <Flex justify='center'>
              <h1>Demo</h1>
            </Flex>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Flex
              justify='space-between'
              align='center'
              style={{
                marginBottom: 16,
              }}
            >
              <h4>Add test list</h4>
              <Flex gap={8} align='center'>
                <Button>Template</Button>
                <Button icon={<DownloadIcon size={14} />}>Export Excel</Button>
                <Button icon={<UploadIcon size={14} />}>Import File</Button>
                <Button
                  icon={<PlusIcon size={14} />}
                  onClick={handleAddTestNumber}
                >
                  Add
                </Button>
              </Flex>
            </Flex>
            <AppTable
              columns={columns}
              dataSource={testNumbers}
              rowKey='id'
              rowSelection={{
                type: "checkbox",
                onChange: (selectedRowKeys, selectedRows) => {
                  console.log(
                    `selectedRowKeys: ${selectedRowKeys}`,
                    "selectedRows: ",
                    selectedRows
                  );
                },
                getCheckboxProps: (record) => ({
                  disabled: record.name === "Disabled User", // Column configuration not to be checked
                  name: record.name,
                }),
              }}
              pagination={null}
            ></AppTable>
          </Col>

          <Col span={12}>
            <Flex justify='center'>
              <div
                style={{
                  backgroundColor: "#DDBEBE",
                  maxHeight: 597,
                  position: "relative",
                  borderRadius: "12%",
                }}
              >
                <img src={phoneFrame} alt='Phone Frame'></img>
                <div
                  className='message-box'
                  style={{
                    position: "absolute",
                    bottom: 50,
                    left: 10,
                    right: 10,
                    backgroundColor: "#fff",
                    borderRadius: 8,
                    padding: 8,
                    minHeight: 100,
                    maxWidth: "80%",
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Flex
                    justify='end'
                    align='center'
                    vertical
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    gap={24}
                  >
                    <div>{demoText}</div>
                    <Flex vertical gap={8} align="start" style={{
                      width: "100%"
                    }}>
                      {parsedData.items &&
                        parsedData.items.map((item, index) => (
                          <div key={index}>{
                            `${index + 1}. ${item.item_name}`
                          }</div>
                        ))}
                    </Flex>
                    <Flex
                      align='center'
                      justify='space-between'
                      style={{
                        width: "100%",
                      }}
                      gap={16}
                    >
                      <div
                        style={{
                          padding: "8px 16px",
                          borderRadius: 8,
                          color: "#fff",
                          fontWeight: "500",
                          backgroundColor: "#9A9A9A",
                          boxShadow: "0 4px 4px 0 #47BCFF40",
                          flexBasis: "50%",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          if (demoText === parsedData.text_2) {
                            setDemoText(parsedData.text_1);
                          } else {
                            return;
                          }
                        }}
                      >
                        Cancel
                      </div>
                      <div
                        style={{
                          padding: "8px 16px",
                          borderRadius: 8,
                          color: "#fff",
                          fontWeight: "500",
                          backgroundColor: "#00A3FF",
                          boxShadow: "0 4px 4px 0 #47BCFF40",
                          flexBasis: "50%",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setDemoText(parsedData.text_2 || "");
                        }}
                      >
                        Accept
                      </div>
                    </Flex>
                  </Flex>
                </div>
              </div>
            </Flex>
          </Col>
        </Row>
      </Form>

      <Flex
        justify='space-between'
        align='center'
        style={{
          marginTop: 24,
        }}
      >
        <div>
          {currentStep > 0 && <Button onClick={prevStep}>Previous</Button>}
        </div>

        <Flex gap={8}>
          <Button onClick={nextStep} type='primary'>
            {currentStep === steps.length - 1 ? "Complete Campaign" : "Next"}
          </Button>
        </Flex>
      </Flex>

      <AddTestListModal
        open={openAddModal}
        setOpen={setOpenAddModal}
        onOk={onOk}
      />
      <DeleteModal
        open={deleteModal.open}
        setOpen={setDeleteModal}
        onOk={onDeleteOk}
        title={`Delete test number ${deleteModal.record?.phone_number}`}
        content={"Are you sure you want to delete this test number?"}
      />
    </>
  );
};

export default AddCampaignStep2;
