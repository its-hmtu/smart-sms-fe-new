import AppInput from "@/components/AppInput";
import AppSelect from "@/components/AppSelect";
import AppTable from "@/components/AppTable";
import EditableCell from "@/components/AppTable/EditableCell";
import AppTextArea from "@/components/AppTextArea";
import {
  Button,
  Col,
  Divider,
  Flex,
  Form,
  Popconfirm,
  Row,
  Space,
  Steps,
  Typography,
} from "antd";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";

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

const originData = Array.from({ length: 1 }).map((_, i) => ({
  key: i.toString(),
  name: '',
  mo: '',
  prefix: '',
}));

const AddCampaign = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isStepCompleted, setIsStepCompleted] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [menuRequestTableData, setMenuRequestTableData] = useState(originData);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({ name: "", mo: "", prefix: "", ...record });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...menuRequestTableData];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setMenuRequestTableData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setMenuRequestTableData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const nextStep = () => {
    if (currentStep === steps.length - 1) {
      setIsStepCompleted(true);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep === 0) return;
    setCurrentStep((prev) => prev - 1);
  };

  const stepItems = steps.map((step) => ({
    key: step.title,
    title: step.title,
  }));

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

  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      width: "20%",
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "25%",
      editable: true,
    },
    {
      title: "MO",
      dataIndex: "mo",
      width: "15%",
      editable: true,
    },
    {
      title: "Prefix",
      dataIndex: "prefix",
      width: "40%",
      editable: true,
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const renderContentByType = () => {
    switch (selectedType) {
      case "text_request":
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
      case "menu_request":
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
                      <span>Menu Request Table</span>
                      <Button type='primary' icon={<PlusIcon size={14} />}>
                        Add more items
                      </Button>
                    </Flex>
                  }
                >
                  <AppTable
                    columns={mergedColumns}
                    components={{
                      body: {
                        cell: EditableCell,
                      },
                    }}
                    dataSource={menuRequestTableData}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Space>
        );
      case "url_request":
        return <div>URL Request Content</div>;
      case "call_request":
        return <div>Call Request Content</div>;
      case "ussd_request":
        return <div>USSD Request Content</div>;
      default:
        return null;
    }
  };

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
          <Col span={8}>
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
      </Form>
      <Flex
        justify={currentStep === 0 ? "end" : "space-between"}
        style={{
          marginTop: 24,
        }}
      >
        {currentStep > 0 && <Button onClick={prevStep}>Previous</Button>}
        <Button onClick={nextStep} type='primary'>
          Next
        </Button>
      </Flex>
    </Space>
  );
};

export default AddCampaign;
