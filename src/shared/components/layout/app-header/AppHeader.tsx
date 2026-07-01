import { Layout, Button, Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/app/store/hooks";
import {
  selectIsAuthenticated,
  selectUser,
} from "@/features/auth/state/admin-auth-slice";
import { useLogout } from "@/features/auth/hooks/use-logout";
import styles from "./app-header.module.scss";

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const handleLogout = useLogout();
  const navigate = useNavigate();

  const userMenuItems: MenuProps["items"] = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/dashboard"),
    },
    { type: "divider" },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <Header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          Template App
        </Link>

        <Space className={styles.actions}>
          {isAuthenticated ? (
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Button type="text" icon={<UserOutlined />} className={styles.userBtn}>
                {user?.displayName ?? "Account"}
              </Button>
            </Dropdown>
          ) : (
            <Link to="/login">
              <Button type="primary">Sign In</Button>
            </Link>
          )}
        </Space>
      </div>
    </Header>
  );
};

export default AppHeader;
