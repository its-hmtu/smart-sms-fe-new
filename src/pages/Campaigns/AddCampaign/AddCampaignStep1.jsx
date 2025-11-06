import AppInput from "@/components/AppInput";
import AppSelect from "@/components/AppSelect";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Row,
  Space,
  Flex,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { SectionTitle } from "../components";
import AppDatePicker from "@/components/AppDatePicker";
import AppTextArea from "@/components/AppTextArea";
import { PlusIcon, XIcon, UploadIcon } from "lucide-react";
import { REQUEST_TYPE } from "@/configs/const";
import useCampaign from "@/features/campaign/useCampaign";
import UploadSubscriberListModal from "@/components/Modals/UploadSubscriberListModal";
import dayjs from "dayjs";
import CampaignService from "@/features/campaign/campaignService";
import { useMutation, useQuery } from "@tanstack/react-query";
import useUser from "@/features/user/useUser";
import { toast } from "react-toastify";
const originalMenuRequestTableData = [
  {
    key: 1,
    content: "",
    mo: "",
    prefix: "",
  },
];

const timeSlotOptions = [
  {
    value: "08:00 - 10:00",
    label: "08:00 - 10:00",
  },
  {
    value: "10:00 - 12:00",
    label: "10:00 - 12:00",
  },
  {
    value: "14:00 - 16:00",
    label: "14:00 - 16:00",
  },
  {
    value: "16:00 - 18:00",
    label: "16:00 - 18:00",
  },
  {
    value: "18:00 - 20:00",
    label: "18:00 - 20:00",
  },
  {
    value: "20:00 - 22:00",
    label: "20:00 - 22:00",
  },
];

const AddCampaignStep1 = ({ steps }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [menuRequestTableData, setMenuRequestTableData] = useState(
    originalMenuRequestTableData
  );
  const selectOptions = [
    {
      label: "Select",
      value: null,
    },
    {
      label: "Text Request",
      value: REQUEST_TYPE.text,
    },
    {
      label: "Menu Request",
      value: REQUEST_TYPE.menu,
    },
    {
      label: "URL Request",
      value: REQUEST_TYPE.url,
    },
    {
      label: "Call Request",
      value: REQUEST_TYPE.call,
    },
    {
      label: "USSD Request",
      value: REQUEST_TYPE.ussd,
    },
  ];
  const [subscriberData, setSubscriberData] = useState(null);
  const [form] = Form.useForm();

  const { campaign, currentStep, updateCurrentStep, saveStepData } =
    useCampaign();
  const { user } = useUser();

  const {
    data: subscriberList,
    isLoading: isLoadingSubscriberList,
    refetch: refetchSubscriberList,
  } = useQuery({
    queryKey: ["subscriberList"],
    queryFn: CampaignService.getSubscriberGroup,
  });

  const createCampaignMutation = useMutation({
    mutationFn: CampaignService.createCampaign,
  });

  // console.log("Subscriber List:", subscriberList);

  useEffect(() => {
    if (subscriberData) {
      // Set the select value to just the ID, not an object
      form.setFieldValue("subscriber_list_select", subscriberData.id);
    }
  }, [subscriberData, form]);

  useEffect(() => {
    if (campaign.data && campaign.data.type) {
      setSelectedType(campaign.data.type);
      form.setFieldsValue({
        ...campaign.data,
      });
    }
  }, [campaign.data]);

  const onFinishBasicInfo = () => {
    const type = form.getFieldValue("type");
    const name = form.getFieldValue("campaign_name");
    if (type && name) {
      setSelectedType(type);
    } else {
      form.validateFields({
        fields: ["type", "campaign_name"],
      });
    }
  };

  const handleRemoveMenuRequestItem = (key) => {
    setMenuRequestTableData((prev) => {
      return prev.filter((item) => item.key !== key);
    });
  };

  const renderContentByType = () => {
    switch (selectedType) {
      case REQUEST_TYPE.text:
        return (
          <Space direction='vertical' style={{ width: "100%" }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <AppTextArea
                  label='Text 1'
                  name='text_1'
                  showCount
                  placeholder='Text 1'
                  maxLength={100}
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please enter text 1",
                    },
                  ]}
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <AppTextArea
                  label='Text 2'
                  name='text_2'
                  showCount
                  placeholder='Text 2'
                  maxLength={100}
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please enter text 2",
                    },
                  ]}
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col>
                <AppInput
                  label='MO'
                  name='mo'
                  placeholder='MO'
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please enter MO",
                    },
                  ]}
                />
              </Col>
              <Col>
                <AppInput
                  label='Service Short Code'
                  name='short_code'
                  placeholder='Service Short Code'
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please enter Service Short Code",
                    },
                  ]}
                />
              </Col>
            </Row>
          </Space>
        );
      case REQUEST_TYPE.menu:
        return (
          <Space direction='vertical' style={{ width: "100%" }}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <AppTextArea
                  label='Text 1'
                  name='text_1'
                  showCount
                  placeholder='Text 1'
                  maxLength={100}
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please enter text 1 content",
                    },
                  ]}
                />
              </Col>
              <Col span={24}>
                <AppTextArea
                  label='Text 2'
                  name='text_2'
                  showCount
                  placeholder='Text 2'
                  maxLength={100}
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please enter text 2 content",
                    },
                  ]}
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item
                  style={{
                    marginTop: 16,
                  }}
                  label={
                    <Flex
                      justify='space-between'
                      align='center'
                      style={{
                        width: "100%",
                      }}
                    >
                      <span>Menu Request Items</span>
                      <Button
                        type='primary'
                        icon={<PlusIcon size={14} />}
                        onClick={() => {
                          setMenuRequestTableData((prev) => {
                            const newItem = {
                              key: prev.length + 1,
                              content: "",
                              mo: "",
                              prefix: "",
                            };
                            return [...prev, newItem];
                          });
                        }}
                      >
                        Add more items
                      </Button>
                    </Flex>
                  }
                >
                  <Flex
                    gap={menuRequestTableData.length <= 2 ? 24 : 16}
                    wrap='wrap'
                    align='center'
                    justify={
                      menuRequestTableData.length <= 2
                        ? "start"
                        : "space-between"
                    }
                  >
                    {menuRequestTableData.map((data) => (
                      <Card
                        key={data.key}
                        style={{ width: 520, position: "relative" }}
                      >
                        {data.key !== 1 && (
                          <Button
                            icon={<XIcon size={14} />}
                            type='text'
                            onClick={() =>
                              handleRemoveMenuRequestItem(data.key)
                            }
                            style={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                            }}
                          />
                        )}
                        <Row gutter={[8, 8]}>
                          <Col span={24}>
                            <AppInput
                              label={`Item ${data.key}`}
                              name={`item_content_${data.key}`}
                              required={data.key === 1}
                              placeholder={`Item ${data.key}`}
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter item content",
                                },
                              ]}
                            />
                          </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                          <Col span={12}>
                            <AppInput
                              label='MO'
                              name={`mo_${data.key}`}
                              placeholder='MO'
                              layout='horizontal'
                            />
                          </Col>
                          <Col span={12}>
                            <AppInput
                              label='Prefix'
                              name={`prefix_${data.key}`}
                              placeholder='Prefix'
                              layout='horizontal'
                            />
                          </Col>
                        </Row>
                      </Card>
                    ))}
                  </Flex>
                </Form.Item>
              </Col>
            </Row>
          </Space>
        );
      case REQUEST_TYPE.url:
        return (
          <Space direction='vertical' style={{ width: "100%" }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <AppTextArea
                  label='Text 1'
                  name='text_1'
                  showCount
                  placeholder='Text 1'
                  maxLength={100}
                  required
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <AppTextArea
                  label='Text 2'
                  name='text_2'
                  showCount
                  placeholder='Text 2'
                  maxLength={100}
                  required
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <AppInput
                  label='URL'
                  name='url'
                  placeholder='URL'
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please enter URL",
                    },
                  ]}
                />
              </Col>
            </Row>
          </Space>
        );
      case REQUEST_TYPE.call:
        return (
          <Space direction='vertical' style={{ width: "100%" }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <AppTextArea
                  label='Text 1'
                  name='text_1'
                  showCount
                  placeholder='Text 1'
                  maxLength={100}
                  required
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <AppTextArea
                  label='Text 2'
                  name='text_2'
                  showCount
                  placeholder='Text 2'
                  maxLength={100}
                  required
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <AppInput
                  label='Number'
                  name='number'
                  placeholder='Number'
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please enter number",
                    },
                  ]}
                />
              </Col>
            </Row>
          </Space>
        );
      case REQUEST_TYPE.ussd:
        return (
          <Space direction='vertical' style={{ width: "100%" }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <AppTextArea
                  required
                  label='Text 1'
                  name='text_1'
                  showCount
                  placeholder='Text 1'
                  maxLength={100}
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <AppTextArea
                  label='Text 2'
                  name='text_2'
                  showCount
                  placeholder='Text 2'
                  maxLength={100}
                  required
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <AppInput
                  label='USSD'
                  name='ussd'
                  placeholder='USSD'
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please enter USSD",
                    },
                  ]}
                />
              </Col>
            </Row>
          </Space>
        );
      default:
        return null;
    }
  };

  const beforeNextStep = async () => {
    const allFormValues = form.getFieldsValue();
    const {
      start_date,
      end_date,
      start_with,
      end_with,
      time_slot_start,
      time_slot,
      time_slot_end,
      campaign_name,
      type,
      repeat_display,
      daily_message_limit,
      subscriber_list_select,
      text_1,
      text_2,
      ...rest
    } = allFormValues;

    const startDate = dayjs(start_date).format("YYYY-MM-DD");
    const endDate = dayjs(end_date).format("YYYY-MM-DD");
    const startWith = dayjs(start_with).format("HH:mm");
    const endWith = dayjs(end_with).format("HH:mm");

    // Handle different request types data structure
    let campaignData = {
      text_1,
      text_2,
    };

    if (type === REQUEST_TYPE.menu) {
      // Extract menu items from form values
      const items = menuRequestTableData
        .map((menuItem) => {
          return {
            item_name: allFormValues[`item_content_${menuItem.key}`] || "",
            mo: allFormValues[`mo_${menuItem.key}`] || "",
            short_code: allFormValues[`prefix_${menuItem.key}`] || "",
          };
        })
        .filter((item) => item.item_name); // Filter out empty items

      campaignData.items = items;
    } else if (type === REQUEST_TYPE.text) {
      campaignData.mo = rest.mo;
      campaignData.short_code = rest.short_code;
    } else if (type === REQUEST_TYPE.url) {
      campaignData.url = rest.url;
    } else if (type === REQUEST_TYPE.call) {
      campaignData.number = rest.number;
    } else if (type === REQUEST_TYPE.ussd) {
      campaignData.ussd = rest.ussd;
    }

    const payload = {
      name: campaign_name || "",
      type: type || "",
      data: campaignData,
      start_time: `${startDate} ${startWith}` || "",
      end_time: `${endDate} ${endWith}` || "",
      time_slot: time_slot || "",
      max_show_limit: repeat_display || "",
      daily_message_limit: daily_message_limit || "",
      group_id: subscriber_list_select || "",
      step: 1,
      user_create: user?.userInfo.id || "",
    };
    // Save the step data to Redux store
    await createCampaignMutation.mutateAsync(payload, {
      onSuccess: (data) => {
        saveStepData(0, data);
        updateCurrentStep(1);
      },
    });
  };

  const nextStep = async () => {
    await form
      .validateFields()
      .then(() => beforeNextStep())
      .catch((errorInfo) => {
        toast.error("Please fill all required info fields");
      });
  };

  const handleAddTimeSlot = () => {
    // logic add time slot
    const timeSlotStart = form.getFieldValue("time_slot_start");
    const timeSlotEnd = form.getFieldValue("time_slot_end");
    if (timeSlotStart && timeSlotEnd) {
      const newTimeSlot = `${dayjs(timeSlotStart).format("HH:mm")} - ${dayjs(
        timeSlotEnd
      ).format("HH:mm")}`;
      const existingTimeSlots = form.getFieldValue("time_slot") || [];
      form.setFieldsValue({
        time_slot: [...existingTimeSlots, newTimeSlot],
      });

      // Clear the time slot pickers
      form.resetFields(["time_slot_start", "time_slot_end"]);
    }
  };

  return (
    <>
      <Form
        layout='vertical'
        initialValues={{
          campaign_name: "",
          type: selectedType,
        }}
        component={false}
        form={form}
      >
        <Row gutter={[8, 8]}>
          <Col span={8}>
            <AppInput
              required
              label='Campaign name'
              name='campaign_name'
              placeholder='Campaign name'
              rules={[
                {
                  required: true,
                  message: "Please enter campaign name",
                },
              ]}
            />
          </Col>
          <Col span={6}>
            <AppSelect
              required
              options={selectOptions}
              label='Type'
              name='type'
              placeholder='Select Type'
              rules={[
                {
                  required: true,
                  message: "Please select type",
                },
              ]}
            ></AppSelect>
          </Col>
          <Col span={8}>
            <Form.Item label=' '>
              <Button
                type='primary'
                htmlType='submit'
                onClick={onFinishBasicInfo}
              >
                Confirm
              </Button>
            </Form.Item>
          </Col>
        </Row>

        <Divider />
        {selectedType && (
          <>
            {renderContentByType()}
            <Divider />
          </>
        )}

        {selectedType && (
          <Row gutter={[24, 24]}>
            <Col span={8}>
              <SectionTitle>Subscriber List</SectionTitle>
              <Form.Item>
                <Button
                  icon={<UploadIcon size={14} />}
                  onClick={() => setOpenUploadModal(true)}
                >
                  Import File
                </Button>
              </Form.Item>
              <AppSelect
                label='Subscriber Group'
                name='subscriber_list_select'
                placeholder='Select or search'
                showSearch
                optionFilterProp='label'
                options={
                  subscriberList?.map((list) => ({
                    label: list.group_name,
                    value: list.id,
                  })) || []
                }
                required
                rules={[
                  {
                    required: true,
                    message: "Please select subscriber group",
                  },
                ]}
              />
              {subscriberData && (
                <>
                  <p>
                    Total subscribers: {subscriberData?.total_subscriber || 0}
                  </p>
                  <p>
                    Last updated:{" "}
                    {dayjs(subscriberData?.created_at).format(
                      "DD-MM-YYYY HH:mm"
                    )}
                  </p>
                </>
              )}
              <UploadSubscriberListModal
                open={openUploadModal}
                onCancel={() => setOpenUploadModal(false)}
                setOpen={setOpenUploadModal}
                setSubscriberData={setSubscriberData}
                refetchSubscriberList={refetchSubscriberList}
              />
            </Col>
            <Col span={8}>
              <SectionTitle>Spam settings</SectionTitle>
              <AppInput
                label='Repeat Display (non-interactive)'
                name='repeat_display'
                placeholder='Repeat Display'
              />
              <AppInput
                label='Daily Message Limit per Subscriber'
                name='daily_message_limit'
                placeholder='Daily Message Limit per Subscriber'
              />
            </Col>
            <Col span={8}>
              <SectionTitle>Time settings</SectionTitle>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <AppDatePicker
                    label={"Start Time"}
                    name='start_date'
                    placeholder='Start Date'
                    format='DD-MM-YYYY'
                    layout='horizontal'
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please choose start date",
                      },
                    ]}
                  />
                </Col>
                <Col span={12}>
                  <AppDatePicker
                    showTime={{ format: "HH:mm" }}
                    label={" "}
                    name='start_with'
                    placeholder='Start With'
                    isTimePicker={true}
                    format='HH:mm'
                    rules={[
                      {
                        required: true,
                        message: "Please choose start with time",
                      },
                    ]}
                  />
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <AppDatePicker
                    label='End time'
                    name='end_date'
                    placeholder='End Date'
                    format='DD-MM-YYYY'
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please choose end date",
                      },
                    ]}
                  />
                </Col>
                <Col span={12}>
                  <AppDatePicker
                    showTime={{ format: "HH:mm" }}
                    label={" "}
                    name='end_with'
                    placeholder='End With'
                    isTimePicker={true}
                    format='HH:mm'
                    rules={[
                      {
                        required: true,
                        message: "Please choose end with time",
                      },
                    ]}
                  />
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <AppSelect
                    showSearch
                    label={"Time Slot"}
                    options={timeSlotOptions}
                    multiple
                    name='time_slot'
                    placeholder='Select time slots'
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please choose time slots",
                      },
                    ]}
                  />
                </Col>
                <Row gutter={8}>
                  <Col span={8}>
                    <AppDatePicker
                      showTime={{ format: "HH:mm" }}
                      // label={null}
                      noStyle
                      name='time_slot_start'
                      placeholder='Select time'
                      isTimePicker={true}
                      format='HH:mm'
                    />
                  </Col>
                  <Col span={8}>
                    <AppDatePicker
                      showTime={{ format: "HH:mm" }}
                      noStyle
                      name='time_slot_end'
                      placeholder='Select time'
                      isTimePicker={true}
                      format='HH:mm'
                    />
                  </Col>
                  <Col span={8}>
                    <Form.Item>
                      <Button
                        type='primary'
                        onClick={() => handleAddTimeSlot()}
                      >
                        Add time slots
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Row>
            </Col>
          </Row>
        )}
      </Form>

      <Flex
        justify='space-between'
        align='center'
        style={{
          marginTop: 24,
        }}
      >
        <div>{currentStep > 0 && <Button onClick>Previous</Button>}</div>

        <Flex gap={8}>
          <Button
            onClick={nextStep}
            type='primary'
            disabled={createCampaignMutation.isPending}
            loading={createCampaignMutation.isPending}
          >
            {currentStep === steps.length - 1 ? "Complete Campaign" : "Next"}
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default AddCampaignStep1;
