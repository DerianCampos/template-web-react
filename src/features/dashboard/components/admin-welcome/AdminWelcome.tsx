import { Card, Typography, Statistic, Row, Col } from "antd";
import {
  SafetyCertificateOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { UserProfile } from "@/features/auth/types";
import styles from "./admin-welcome.module.scss";

const { Title, Text } = Typography;

interface AdminWelcomeProps {
  user: UserProfile;
}

const AdminWelcome: React.FC<AdminWelcomeProps> = ({ user }) => {
  return (
    <Card variant="outlined" className={styles.card}>
      <div className={styles.header}>
        <SafetyCertificateOutlined className={styles.icon} />
        <div>
          <Title level={3} className={styles.title}>
            Admin Dashboard
          </Title>
          <Text type="secondary">
            Welcome, {user.displayName}. You have administrative access.
          </Text>
        </div>
      </div>
      <Row gutter={[16, 16]} className={styles.stats}>
        <Col xs={12} sm={8}>
          <Statistic
            title="Role"
            value="Administrator"
            prefix={<SafetyCertificateOutlined />}
          />
        </Col>
        <Col xs={12} sm={8}>
          <Statistic
            title="Account"
            value={user.displayName}
            prefix={<UserOutlined />}
          />
        </Col>
        <Col xs={12} sm={8}>
          <Statistic title="Email" value={user.email} />
        </Col>
      </Row>
    </Card>
  );
};

export default AdminWelcome;
