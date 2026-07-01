import { Link } from "react-router-dom";
import { Card, Typography } from "antd";
import { RegisterForm } from "@/features/auth/components/register-form";
import styles from "./register.module.scss";

const { Title } = Typography;

const RegisterPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Title level={2} className={styles.title}>
          Create Account
        </Title>
        <RegisterForm />
        <div className={styles.links}>
          <Link to="/login">Already have an account? Sign in</Link>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
