import { Spin } from "antd";

/**
 * Suspense fallback shown while lazy-loaded routes are loading.
 */
const RouteLoading: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 400,
      }}
    >
      <Spin size="large" />
    </div>
  );
};

export default RouteLoading;
