import React from "react";
import styled from "styled-components";
import bgLogin from "@/assets/images/bg-login.png";
import { Button, Checkbox, Flex, Form, Input } from "antd";
import { LockIcon, UserIcon } from "lucide-react";
import bitelLogo from "@/assets/images/bitel_logo.png";
import { useMutation } from "@tanstack/react-query";
import UserService from "@/features/user/userService";
import useUser from "@/features/user/useUser";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PATH from "@/configs/PATH";

const Login = () => {
  const [form] = Form.useForm();
  const { saveLoginInfo } = useUser();
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: UserService.login,
  });
  const onFinish = (values) => {
    loginMutation.mutate(values, {
      onSuccess: (data) => {
        console.log("Login successful:", data);

        // Save user data to Redux store
        saveLoginInfo(data);

        // Show success message
        toast.success("Login successful!");

        // Navigate to overview page
        navigate(PATH.OVERVIEW);
      },
      onError: (error) => {
        console.error("Login failed:", error);
        toast.error("Login failed. Please check your credentials.");
      },
    });
  };

  return (
    <LoginWrapper>
      <img src={bitelLogo} alt='Bitel' />
      <h1>Smart SMS</h1>
      <div className='login-form'>
        <Form
          layout='vertical'
          requiredMark={false}
          initialValues={{
            remember: true,
          }}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            // label='Username'
            name='username'
            required
            rules={[
              {
                required: true,
                message: "Please enter username",
              },
            ]}
          >
            <Input prefix={<UserIcon size={14} />} placeholder='Username' />
          </Form.Item>
          <Form.Item
            //  label='Password'
            name='password'
            required
            rules={[
              {
                required: true,
                message: "Please enter password",
              },
              {
                min: 6,
                message:
                  "Password must contain at least 6 to 10 characters",
                max: 10,
                // validator: (_, value) => {
                //   // 6-10 characters, at least one uppercase letter
                //   const regex = /^(?=.*[A-Z]).{6,10}$/;
                //   if (value && !regex.test(value)) {
                //     return Promise.reject(new Error("Password must contain at least one uppercase letter and 6 to 10 characters"));
                //   }
                //   return Promise.resolve();
                // }
              },
            ]}
          >
            <Input.Password
              prefix={<LockIcon size={14} />}
              placeholder='Password'
            />
          </Form.Item>
          <Form.Item>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              block
              loading={loginMutation.isPending}
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? 'Logging in...' : 'Login'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </LoginWrapper>
  );
};

export default Login;

const LoginWrapper = styled.div`
  background-image: url(${bgLogin});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px;

  img {
    max-width: 100px;
    width: 100%;
  }

  h1 {
    color: #2c7a8c;
    font-size: 48px;
    font-weight: bold;
    text-transform: uppercase;
  }

  .login-form {
    max-width: 380px;
    width: 100%;
    margin-top: 24px;
  }
`;
