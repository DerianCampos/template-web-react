import ErrorBoundary from "@/shared/components/ErrorBoundary";

interface RouteErrorBoundaryProps {
  children: React.ReactNode;
}

/**
 * Wraps a route with an error boundary for per-route error isolation.
 */
const RouteErrorBoundary: React.FC<RouteErrorBoundaryProps> = ({
  children,
}) => {
  return <ErrorBoundary>{children}</ErrorBoundary>;
};

export default RouteErrorBoundary;
