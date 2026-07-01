import { Layout, Typography } from "antd";
import styles from "./footer.module.scss";

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <AntFooter className={styles.footer}>
      <div className={styles.inner}>
        <Text type="secondary" className={styles.text}>
          &copy; {year} Template App
        </Text>
      </div>
    </AntFooter>
  );
};

export default Footer;
