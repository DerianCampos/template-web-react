import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="Page Not Found"
      subTitle="The page you're looking for doesn't exist or has been moved."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Go to Home
        </Button>
      }
    />
  );
};

export default NotFoundPage;
