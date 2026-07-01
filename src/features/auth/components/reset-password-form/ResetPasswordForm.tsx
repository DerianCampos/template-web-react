import { App, Button, Form, Input } from "antd";
import { LockOutlined, KeyOutlined } from "@ant-design/icons";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "@/features/auth/api/admin-auth-api";
import { validatePassword } from "@/features/auth/model/password-policy";
import { getErrorMessage } from "@/shared/utils/error-handler";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import styles from "./reset-password-form.module.scss";

interface ResetPasswordValues {
  token: string;
  password: string;
  confirmPassword: string;
}

const ResetPasswordForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [form] = Form.useForm<ResetPasswordValues>();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const { message } = App.useApp();

  const token = searchParams.get("token") ?? "";

  const handleSubmit = async (values: ResetPasswordValues) => {
    try {
      await resetPassword({
        token: values.token || token,
        password: values.password,
      }).unwrap();
      message.success("Password has been reset successfully. Please log in.");
      navigate("/login", { replace: true });
    } catch (err) {
      message.error(getErrorMessage(err as FetchBaseQueryError | SerializedError));
    }
  };

  return (
    <Form<ResetPasswordValues>
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      requiredMark="optional"
      size="large"
      className={styles.form}
    >
      {!token && (
        <Form.Item
          label="Reset Token"
          name="token"
          rules={[{ required: true, message: "Reset token is required" }]}
        >
          <Input prefix={<KeyOutlined />} placeholder="Enter reset token" />
        </Form.Item>
      )}

      <Form.Item
        label="New Password"
        name="password"
        rules={[
          { required: true, message: "Please enter a new password" },
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
          placeholder="New password (min 8 chars)"
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
          placeholder="Confirm new password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading} block>
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ResetPasswordForm;
