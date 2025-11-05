import AppInput from "@/components/AppInput";
import AppSelect from "@/components/AppSelect";
import { Button, Card, Col, Divider, Form, Row, Space, Flex } from "antd";
import React, { useEffect, useState } from "react";
import { SectionTitle } from "../components";
import AppDatePicker from "@/components/AppDatePicker";
import AppTextArea from "@/components/AppTextArea";
import { PlusIcon, XIcon, UploadIcon } from "lucide-react";
import { REQUEST_TYPE } from "@/configs/const";
import useCampaign from "@/features/campaign/useCampaign";
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

const AddCampaignStep1 = ({
  setOpenUploadModal,
  form
}) => {
  const [selectedType, setSelectedType] = useState(null);
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
      value: "text_request",
    },
    {
      label: "Menu Request",
      value: "menu_request",
    },
    {
      label: "URL Request",
      value: "url_request",
    },
    {
      label: "Call Request",
      value: "call_request",
    },
    {
      label: "USSD Request",
      value: "ussd_request",
    },
  ];

  const {
    campaign
  } = useCampaign();

  useEffect(() => {
    if (campaign.data && campaign.data.type) {
      setSelectedType(campaign.data.type);
      form.setFieldsValue({
        ...campaign.data,
      });
    }
  }, [campaign.data]);

  console.log(campaign)

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
                  name='service_short_code'
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
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter MO",
                                },
                              ]}
                            />
                          </Col>
                          <Col span={12}>
                            <AppInput
                              label='Prefix'
                              name={`prefix_${data.key}`}
                              placeholder='Prefix'
                              layout='horizontal'
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter prefix",
                                },
                              ]}
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

  return (
    <Form
      layout='vertical'
      initialValues={{
        campaign_name: "",
        type: null,
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
            label={null}
            name='subcriber_list_select'
            placeholder='Select or search'
            options={[]}
          />
          <p>Total subcribers: {0}</p>
          <p>Last updated: {"-"}</p>
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
          <Row>
            <Form.Item
              label={
                <p
                  style={{
                    marginRight: 8,
                  }}
                >
                  Start time
                </p>
              }
              required
              layout='horizontal'
              style={{
                width: "100%",
              }}
            >
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <AppDatePicker
                    label={null}
                    name='start_date'
                    placeholder='Start Date'
                    format='DD-MM-YYYY'
                  />
                </Col>
                <Col span={12}>
                  <AppDatePicker
                    showTime={{ format: "HH:mm" }}
                    label={null}
                    name='start_with'
                    placeholder='Start With'
                    isTimePicker={true}
                    format='HH:mm'
                  />
                </Col>
              </Row>
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label={
                <p
                  style={{
                    marginRight: 8,
                  }}
                >
                  End time
                </p>
              }
              required
              layout='horizontal'
              style={{
                width: "100%",
              }}
            >
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <AppDatePicker
                    label={null}
                    name='end_date'
                    placeholder='End Date'
                    format='DD-MM-YYYY'
                  />
                </Col>
                <Col span={12}>
                  <AppDatePicker
                    showTime={{ format: "HH:mm" }}
                    label={null}
                    name='end_with'
                    placeholder='End With'
                    isTimePicker={true}
                    format='HH:mm'
                  />
                </Col>
              </Row>
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label={
                <p
                  style={{
                    marginRight: 8,
                  }}
                >
                  Time slots
                </p>
              }
              required
              layout='horizontal'
              style={{
                width: "100%",
              }}
            >
              <Row gutter={[8, 16]}>
                <Col span={24}>
                  <AppSelect
                    showSearch
                    label={null}
                    options={timeSlotOptions}
                    multiple
                    name="time_slots"
                    placeholder='Select time slots'
                  />
                </Col>
                <Row
                  gutter={[8, 8]}
                  style={{
                    marginTop: 24,
                  }}
                >
                  <Col span={8}>
                    <AppDatePicker
                      showTime={{ format: "HH:mm" }}
                      label={null}
                      // name='time_slot_start'
                      placeholder='Select time'
                      isTimePicker={true}
                      format='HH:mm'
                    />
                  </Col>
                  <Col span={8}>
                    <AppDatePicker
                      showTime={{ format: "HH:mm" }}
                      label={null}
                      // name='time_slot_end'
                      placeholder='Select time'
                      isTimePicker={true}
                      format='HH:mm'
                    />
                  </Col>
                  <Col span={8}>
                    <Form.Item>
                      <Button type='primary'>Add time slots</Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Row>
            </Form.Item>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default AddCampaignStep1;
