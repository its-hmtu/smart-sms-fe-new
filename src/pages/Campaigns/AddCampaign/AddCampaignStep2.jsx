import AppInput from "@/components/AppInput";
import AppTable from "@/components/AppTable";
import AppUpload from "@/components/AppUpload";
import { Button, Col, Flex, Form, Row } from "antd";
import { DownloadIcon, PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import React, { useMemo } from "react";
import phoneFrame from "@/assets/images/phone-frame.png";

const AddCampaignStep2 = ({ form, initialData, saveStepData }) => {
  const [testNumbers, setTestNumbers] = React.useState(initialData?.testNumbers || [
    { id: 1, phone_number: "+1234567890" },
    { id: 2, phone_number: "+0987654321" }
  ]);

  // Initialize form with saved data
  React.useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    }
  }, [form, initialData]);

  // Save data whenever testNumbers change
  React.useEffect(() => {
    if (saveStepData) {
      const formValues = form.getFieldsValue();
      saveStepData({
        ...formValues,
        testNumbers
      });
    }
  }, [testNumbers, saveStepData, form]);

  const handleAddTestNumber = () => {
    const testNumber = form.getFieldValue('test_number');
    if (!testNumber) return;

    const newNumber = {
      id: Date.now(), // Simple ID generation
      phone_number: testNumber
    };
    
    setTestNumbers(prev => [...prev, newNumber]);
    form.setFieldValue('test_number', ''); // Clear input
  };

  const handleEdit = (record) => {
    // Set the phone number in the input for editing
    form.setFieldValue('test_number', record.phone_number);
    // Remove from list (will be re-added when user clicks add)
    handleDelete(record);
  };

  const handleDelete = (record) => {
    setTestNumbers(prev => prev.filter(item => item.id !== record.id));
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

  return (
    <Form layout='vertical' initialValues={{}} form={form}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Flex gap={8} align='center'>
            <AppInput
              label='Add my test number'
              name='test_number'
              placeholder='Add my test number'
            />
            <Form.Item label=' '>
              <Button type='primary' onClick={handleAddTestNumber}>
                Add Number
              </Button>
            </Form.Item>
          </Flex>
        </Col>
        <Col span={12}>
          <Flex justify="center">
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
              {/* <Button>Import File</Button> */}
              <AppUpload noStyle icon={""} title='Import File'></AppUpload>
              <Button icon={<PlusIcon size={14} />}>Add</Button>
            </Flex>
          </Flex>
          <AppTable
            columns={columns}
            dataSource={testNumbers}
            rowKey="id"
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
                  borderRadius: 4,
                  padding: 8,
                  minHeight: 100,
                  maxWidth: "80%",
                  margin: "0 auto",
                }}
              >
                <Flex align="end" style={{
                  height: '100%'
                }}>
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
                        cursor: 'pointer'
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
                        cursor: 'pointer'
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
  );
};

export default AddCampaignStep2;
