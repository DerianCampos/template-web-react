import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { AppHeader } from "@/shared/components/layout/app-header";
import { Footer } from "@/shared/components/layout/footer";
import styles from "./public-layout.module.scss";

const { Content } = Layout;

/**
 * Public layout: simple header, content area, footer.
 * Used for unauthenticated pages: Home, Login, ForgotPassword, ResetPassword.
 */
const PublicLayout: React.FC = () => {
  return (
    <Layout className={styles.layout}>
      <AppHeader />
      <Content className={styles.content}>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
};

export default PublicLayout;
