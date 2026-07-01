import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="403"
      title="Access Denied"
      subTitle="You do not have permission to access this page. Admin access is required."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Go to Home
        </Button>
      }
    />
  );
};

export default UnauthorizedPage;
