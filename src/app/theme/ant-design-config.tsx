import { ConfigProvider, theme as antTheme } from "antd";
import type { ReactNode } from "react";
import { lightThemeTokens } from "./theme-tokens";

interface AntDesignConfigProps {
  children: ReactNode;
}

/**
 * Wraps children with Ant Design ConfigProvider using design tokens.
 * Dark mode toggle can be added later via theme state.
 */
const AntDesignConfig: React.FC<AntDesignConfigProps> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        ...lightThemeTokens,
        algorithm: antTheme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntDesignConfig;
