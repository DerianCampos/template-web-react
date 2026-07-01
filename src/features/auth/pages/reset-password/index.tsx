import { Link } from "react-router-dom";
import { Card, Typography } from "antd";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";
import styles from "./reset-password.module.scss";

const { Title, Text } = Typography;

const ResetPasswordPage: React.FC = () => {

  // If no token in URL and user must enter it, show the form anyway
  // (the form has a token input field for manual entry)

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Title level={2} className={styles.title}>
          Reset Password
        </Title>
        <Text type="secondary" className={styles.subtitle}>
          Enter your new password below.
        </Text>
        <ResetPasswordForm />
        <div className={styles.link}>
          <Link to="/login">Back to Login</Link>
        </div>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
