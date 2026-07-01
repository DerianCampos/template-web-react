import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import {
  DashboardOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { AppHeader } from "@/shared/components/layout/app-header";
import styles from "./admin-layout.module.scss";

const { Content, Sider } = Layout;

const siderMenuItems: MenuProps["items"] = [
  {
    key: "/dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: "/admin",
    icon: <SafetyCertificateOutlined />,
    label: "Admin",
  },
];

/**
 * Admin layout: authenticated header + admin sidebar navigation.
 * Used for admin-gated pages.
 */
const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key);
  };

  return (
    <Layout className={styles.layout}>
      <AppHeader />
      <Layout className={styles.body}>
        <Sider
          width={240}
          className={styles.sider}
          breakpoint="lg"
          collapsedWidth={80}
        >
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={siderMenuItems}
            onClick={handleMenuClick}
            className={styles.menu}
          />
        </Sider>
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
