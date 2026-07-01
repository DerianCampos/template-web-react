import { App, Button, Form, Input } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "@/features/auth/api/admin-auth-api";
import { getErrorMessage } from "@/shared/utils/error-handler";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import styles from "./forgot-password-form.module.scss";

interface ForgotPasswordValues {
  email: string;
}

const ForgotPasswordForm: React.FC = () => {
  const [form] = Form.useForm<ForgotPasswordValues>();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();
  const { message } = App.useApp();

  const handleSubmit = async (values: ForgotPasswordValues) => {
    try {
      await forgotPassword(values).unwrap();
      message.success(
        "If an account with that email exists, a password reset link has been sent.",
      );
      navigate("/login", { replace: true });
    } catch (err) {
      message.error(getErrorMessage(err as FetchBaseQueryError | SerializedError));
    }
  };

  return (
    <Form<ForgotPasswordValues>
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      requiredMark="optional"
      size="large"
      className={styles.form}
    >
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

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading} block>
          Send Reset Link
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ForgotPasswordForm;
