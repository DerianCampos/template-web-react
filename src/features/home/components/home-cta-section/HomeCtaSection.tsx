import { Card, Row, Col, Typography } from "antd";
import { SafetyOutlined, ApiOutlined, CodeOutlined } from "@ant-design/icons";
import styles from "./home-cta-section.module.scss";

const { Title, Paragraph } = Typography;

const features = [
  {
    icon: <SafetyOutlined style={{ fontSize: 32, color: "var(--color-primary)" }} />,
    title: "JWT Authentication",
    description: "Secure login, token refresh, role-based guards, and password reset flows.",
  },
  {
    icon: <ApiOutlined style={{ fontSize: 32, color: "var(--color-primary)" }} />,
    title: "REST API Ready",
    description: "FastAPI backend with RTK Query integration, typed endpoints, and error handling.",
  },
  {
    icon: <CodeOutlined style={{ fontSize: 32, color: "var(--color-primary)" }} />,
    title: "Clean Architecture",
    description: "Feature-sliced design with Redux Toolkit, lazy routes, and design tokens.",
  },
];

const HomeCtaSection: React.FC = () => {
  return (
    <section className={styles.section}>
      <Title level={2} className={styles.sectionTitle}>
        Everything You Need
      </Title>
      <Row gutter={[24, 24]} justify="center">
        {features.map((feature) => (
          <Col xs={24} sm={12} md={8} key={feature.title}>
            <Card variant="outlined" className={styles.card}>
              <div className={styles.icon}>{feature.icon}</div>
              <Title level={3} className={styles.cardTitle}>
                {feature.title}
              </Title>
              <Paragraph type="secondary" className={styles.cardDesc}>
                {feature.description}
              </Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default HomeCtaSection;
