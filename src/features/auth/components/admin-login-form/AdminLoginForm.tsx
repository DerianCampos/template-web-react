import { useState } from "react";
import { App, Alert, Button, Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useLoginMutation } from "@/features/auth/api/admin-auth-api";
import { getErrorMessage } from "@/shared/utils/error-handler";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import styles from "./admin-login-form.module.scss";

interface LoginFormValues {
  email: string;
  password: string;
}

/**
 * Map server/auth errors to user-facing messages appropriate for the login form.
 * Prefers backend detail, otherwise provides login-appropriate fallbacks.
 */
function getLoginErrorMessage(
  err: FetchBaseQueryError | SerializedError,
): string {
  if ("status" in err) {
    const fetchErr = err as FetchBaseQueryError;
    // Check if backend sent a specific detail message first
    if (fetchErr.data && typeof fetchErr.data === "object" && "detail" in fetchErr.data) {
      const detail = (fetchErr.data as Record<string, unknown>).detail;
      if (typeof detail === "string" && detail.length > 0) {
        return detail;
      }
    }
    // Login-specific fallbacks for common auth statuses
    if (fetchErr.status === 401) {
      return "Invalid email or password. Please check your credentials and try again.";
    }
    if (fetchErr.status === 429) {
      return "Too many login attempts. Please wait a moment and try again.";
    }
  }
  return getErrorMessage(err);
}

const AdminLoginForm: React.FC = () => {
  const [form] = Form.useForm<LoginFormValues>();
  const [login, { isLoading }] = useLoginMutation();
  const { message } = App.useApp();
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (values: LoginFormValues) => {
    setServerError(null);
    try {
      await login(values).unwrap();
      // Redirection is handled by GuardResolver after state updates
    } catch (err) {
      const errorMsg = getLoginErrorMessage(
        err as FetchBaseQueryError | SerializedError,
      );
      setServerError(errorMsg);
      // Also announce via toast for screen readers / at-a-glance awareness
      message.error(errorMsg);
    }
  };

  return (
    <Form<LoginFormValues>
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      requiredMark="optional"
      size="large"
      className={styles.form}
    >
      {serverError && (
        <Alert
          message="Login Failed"
          description={serverError}
          type="error"
          showIcon
          closable
          onClose={() => setServerError(null)}
          className={styles.alert}
        />
      )}

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
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Enter password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading} block>
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AdminLoginForm;
