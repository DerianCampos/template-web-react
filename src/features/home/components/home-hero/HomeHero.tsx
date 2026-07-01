import { Button, Space, Typography } from "antd";
import { ArrowRightOutlined, UserAddOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styles from "./home-hero.module.scss";

const { Title, Paragraph } = Typography;

const HomeHero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <Title level={1} className={styles.title}>
        Template App
      </Title>
      <Paragraph className={styles.subtitle}>
        A full-stack starter template with FastAPI backend, React frontend,
        JWT authentication, and role-based access control. Ready to build on.
      </Paragraph>
      <Space size="middle">
        <Link to="/register">
          <Button type="primary" size="large" icon={<UserAddOutlined />}>
            Create Account
          </Button>
        </Link>
        <Link to="/login">
          <Button size="large" icon={<ArrowRightOutlined />}>
            Sign In
          </Button>
        </Link>
      </Space>
    </section>
  );
};

export default HomeHero;
