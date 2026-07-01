import { Link } from "react-router-dom";
import { Card, Typography } from "antd";
import { AdminLoginForm } from "@/features/auth/components/admin-login-form";
import styles from "./login.module.scss";

const { Title } = Typography;

const LoginPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Title level={2} className={styles.title}>
          Welcome Back
        </Title>
        <AdminLoginForm />
        <div className={styles.links}>
          <Link to="/forgot-password">Forgot password?</Link>
          <Link to="/register">Create account</Link>
          <Link to="/">Back to Home</Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
