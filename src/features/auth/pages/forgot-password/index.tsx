import { Link } from "react-router-dom";
import { Card, Typography } from "antd";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";
import styles from "./forgot-password.module.scss";

const { Title, Text } = Typography;

const ForgotPasswordPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Title level={2} className={styles.title}>
          Forgot Password
        </Title>
        <Text type="secondary" className={styles.subtitle}>
          Enter your email and we&apos;ll send you a reset link.
        </Text>
        <ForgotPasswordForm />
        <div className={styles.link}>
          <Link to="/login">Back to Login</Link>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
