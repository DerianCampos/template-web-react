import { AppRouter } from "@/app/routing";

/**
 * Root application component.
 * Providers (Redux, ConfigProvider) are applied in main.tsx.
 * This component only mounts the router.
 */
const App: React.FC = () => {
  return <AppRouter />;
};

export default App;
