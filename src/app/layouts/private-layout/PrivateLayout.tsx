import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { AppHeader } from "@/shared/components/layout/app-header";
import styles from "./private-layout.module.scss";

const { Content } = Layout;

/**
 * Private layout: authenticated header with user menu, content area.
 * Used for authenticated pages: Dashboard.
 */
const PrivateLayout: React.FC = () => {
  return (
    <Layout className={styles.layout}>
      <AppHeader />
      <Content className={styles.content}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default PrivateLayout;
