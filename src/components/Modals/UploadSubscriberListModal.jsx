import React from "react";
import AppModal from "../AppModal";
import { Button, Col, Flex, Form, Row } from "antd";
import AppInput from "../AppInput";
import AppTextArea from "../AppTextArea";
import AppUpload from "../AppUpload";

const UploadSubscriberListModal = ({ children, ...props }) => {
  return (
    <AppModal {...props} title='Upload Subscriber List'>
      <Form layout='vertical'>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <AppInput
              label='List Name'
              name='list_name'
              placeholder='Enter list name'
              required
            />
          </Col>
          <Col span={24}>
            <AppTextArea
              label='Description'
              name='description'
              placeholder='Enter description'
              required
            />
          </Col>
        </Row>

        <Flex justify='start' align='center' gap={16}>
          <Button>Template</Button>

          <AppUpload
            label={null}
            name='subscriber_csv'
            formName='subscriber_csv'
            action='/upload/subscriber-csv'
            noStyle
            icon={''}
            title="Browse..."
          />
        </Flex>
      </Form>
    </AppModal>
  );
};

export default UploadSubscriberListModal;
