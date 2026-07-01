import { Typography, Card, Spin, Result } from "antd";
import {
  UserOutlined,
} from "@ant-design/icons";
import { useRole } from "@/features/auth/hooks/use-role";
import { useDashboard } from "@/features/dashboard/hooks/use-dashboard";
import { AdminWelcome } from "@/features/dashboard/components/admin-welcome";
import { getErrorMessage } from "@/shared/utils/error-handler";
import styles from "./dashboard.module.scss";

const { Title, Text } = Typography;

const DashboardPage: React.FC = () => {
  const { isAdmin } = useRole();
  const { user, isLoading, error } = useDashboard();

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spin size="large" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <Result
        status="error"
        title="Failed to load profile"
        subTitle={error ? getErrorMessage(error) : "User data not available"}
      />
    );
  }

  return (
    <div className={styles.page}>
      <Title level={1} className={styles.pageTitle}>
        Dashboard
      </Title>

      {isAdmin && <AdminWelcome user={user} />}

      <Card variant="outlined" className={styles.welcomeCard}>
        <div className={styles.welcomeHeader}>
          <UserOutlined className={styles.welcomeIcon} />
          <div>
            <Title level={2} className={styles.welcomeTitle}>
              Welcome, {user.displayName}
            </Title>
            <Text type="secondary">
              You are signed in as{" "}
              <Text strong>{user.role === "admin" ? "Administrator" : "Viewer"}</Text>
              . Use the navigation to explore the application.
            </Text>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;
