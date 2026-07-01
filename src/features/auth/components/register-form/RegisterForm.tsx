import { App, Button, Form, Input, Select } from "antd";
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useRegisterMutation } from "@/features/auth/api/admin-auth-api";
import { validatePassword } from "@/features/auth/model/password-policy";
import { getErrorMessage } from "@/shared/utils/error-handler";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import styles from "./register-form.module.scss";

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "viewer" | "admin";
}

const RegisterForm: React.FC = () => {
  const [form] = Form.useForm<RegisterFormValues>();
  const [register, { isLoading }] = useRegisterMutation();
  const { message } = App.useApp();

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      await register({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        role: values.role,
      }).unwrap();
      // Auto-login: GuardResolver will redirect to /dashboard
    } catch (err) {
      message.error(
        getErrorMessage(err as FetchBaseQueryError | SerializedError),
      );
    }
  };

  return (
    <Form<RegisterFormValues>
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      requiredMark="optional"
      size="large"
      initialValues={{ role: "viewer" }}
      className={styles.form}
    >
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[
          { required: true, message: "Please enter your first name" },
          { min: 1, max: 50, message: "Must be 1–50 characters" },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="John" />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[
          { required: true, message: "Please enter your last name" },
          { min: 1, max: 50, message: "Must be 1–50 characters" },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Doe" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Please enter a valid email address" },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="you@example.com" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Please enter a password" },
          {
            validator: (_, value) => {
              if (!value) return Promise.resolve();
              const { valid, errors } = validatePassword(value);
              return valid
                ? Promise.resolve()
                : Promise.reject(new Error(errors[0]));
            },
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Min 8 chars, upper+lower+digit+special"
        />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Please confirm your password" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords do not match"));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Confirm your password"
        />
      </Form.Item>

      <Form.Item
        label="Role"
        name="role"
        rules={[{ required: true }]}
      >
        <Select
          options={[
            { value: "viewer", label: "Viewer" },
            { value: "admin", label: "Admin" },
          ]}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading} block>
          Create Account
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
