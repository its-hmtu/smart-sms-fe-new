import React from "react";
import AppModal from "../AppModal";
import { Button, Col, Flex, Form, Modal, Row } from "antd";
import AppInput from "../AppInput";
import AppTextArea from "../AppTextArea";
import AppUpload from "../AppUpload";
import { CheckIcon, DownloadIcon } from "lucide-react";
import useUser from "@/features/user/useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CampaignService from "@/features/campaign/campaignService";
import { toast } from "react-toastify";

const UploadSubscriberListModal = ({ children, setOpen, setSubscriberData, refreshSubscriberList, ...props }) => {
  const [form] = Form.useForm();
  const { user } = useUser();
  const uploadMutation = useMutation({
    mutationFn: CampaignService.uploadSubscriber,
  });
  const [isUploadSuccess, setIsUploadSuccess] = React.useState(false);
  const queryClient = useQueryClient();
  return (
    <AppModal
      {...props}
      title='Upload Subscriber List'
      width='40%'
      onOk={() => {
        form.submit();
      }}
      okButtonProps={{
        loading: uploadMutation.isPending,
        disabled: uploadMutation.isPending,
      }}
      cancelButtonProps={{
        disabled: uploadMutation.isPending,
      }}
    >
      <Form
        layout='vertical'
        form={form}
        onFinish={async (values) => {
          const { subscriber_file, ...rest } = values;
          const formData = new FormData();
          formData.append("file", subscriber_file[0].originFileObj);
          formData.append("user_id", user.userInfo.id);
          formData.append("group_name", rest.list_name);
          formData.append("description", rest.description);
          // Handle the form submission logic here
          console.log("Form Data Submitted:", formData);

          for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
          }

          await uploadMutation.mutateAsync(formData, {
            onSuccess: (data) => {
              if (data) {
                toast.success("Subscriber list uploaded successfully!");
                setIsUploadSuccess(true);
                
                // Set the uploaded subscriber data
                if (setSubscriberData) {
                  setSubscriberData(data);
                }
                
                // Refresh the subscriber list
                queryClient.invalidateQueries({ queryKey: ["subscriberList"] });
                // if (refreshSubscriberList) {
                //   refreshSubscriberList();
                // }
                
                // Close the modal after success
                if (setOpen) {
                  form.resetFields();
                  setOpen(false);
                }
              }
            },
            onError: (error) => {
              console.error("Upload failed:", error);
              toast.error("Failed to upload subscriber list. Please try again.");
            }
          });
        }}
      >
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

        <Flex justify='start' align='start' gap={16}>
          <Form.Item noStyle>
            <Button icon={<DownloadIcon size={14} />}>Template</Button>
          </Form.Item>

          <AppUpload
            label={null}
            name='subscriber_file'
            formName='subscriber_file'
            noStyle
            icon={""}
            title='Browse...'
          />
        </Flex>
      </Form>
    </AppModal>
  );
};

export default UploadSubscriberListModal;
