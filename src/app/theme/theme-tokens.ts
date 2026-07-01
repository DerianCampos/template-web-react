import type { ThemeConfig } from "antd";

/**
 * Ant Design theme token overrides matching DESIGN.md.
 * Light theme tokens only; dark algorithm is applied separately.
 */
export const lightThemeTokens: ThemeConfig = {
  token: {
    // ── Brand Colors ──────────────────────────────────────
    colorPrimary: "#0057c2",
    colorPrimaryHover: "#4a8fd9",
    colorPrimaryActive: "#006ef2",
    colorPrimaryBg: "rgba(0, 87, 194, 0.1)",

    // ── Neutral Colors ────────────────────────────────────
    colorBgContainer: "#ffffff",
    colorBgLayout: "#f9f9f9",
    colorBgElevated: "#ffffff",
    colorBorder: "#eeeeee",
    colorBorderSecondary: "#eeeeee",

    // ── Text Colors ───────────────────────────────────────
    colorText: "#1a1a1a",
    colorTextSecondary: "#666666",
    colorTextPlaceholder: "#a0a0a0",

    // ── Semantic Colors (Ant Design defaults) ─────────────
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    colorError: "#ff4d4f",
    colorInfo: "#1677ff",

    // ── Typography ────────────────────────────────────────
    fontFamily:
      '"InterVariable", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 16,
    fontSizeHeading1: 32,
    fontSizeHeading2: 24,
    fontSizeHeading3: 18,
    lineHeight: 1.5,

    // ── Border Radius ─────────────────────────────────────
    borderRadius: 8,
    borderRadiusLG: 16,

    // ── Sizing ────────────────────────────────────────────
    controlHeight: 40,
    paddingContentHorizontal: 24,
    paddingContentVertical: 24,

    // ── Shadows ───────────────────────────────────────────
    boxShadow:
      "0 2px 8px rgba(0, 0, 0, 0.06)",
    boxShadowSecondary:
      "0 4px 16px rgba(0, 0, 0, 0.08)",
  },
  components: {
    Card: {
      borderRadiusLG: 24,
      paddingLG: 24,
    },
    Button: {
      borderRadius: 8,
      paddingInline: 16,
      paddingBlock: 12,
      controlHeight: 40,
      fontWeight: 600,
    },
    Menu: {
      itemBorderRadius: 8,
      itemHeight: 40,
      itemMarginInline: 8,
    },
    Input: {
      borderRadius: 8,
      paddingInline: 12,
      paddingBlock: 8,
    },
    Tag: {
      borderRadiusSM: 8,
    },
    Alert: {
      borderRadiusLG: 16,
    },
    Modal: {
      borderRadiusLG: 24,
    },
  },
};

/** Dark theme algorithm token overrides */
export const darkThemeTokens: ThemeConfig = {
  token: {
    colorPrimary: "#4a8fd9",
    colorPrimaryHover: "#6ba8e8",
    colorPrimaryActive: "#3a7ac4",
    colorPrimaryBg: "rgba(74, 143, 217, 0.15)",
    colorBgContainer: "#1e1e1e",
    colorBgLayout: "#141414",
    colorBgElevated: "#1e1e1e",
    colorBorder: "#2d2d2d",
    colorBorderSecondary: "#2d2d2d",
    colorText: "#e8e8e8",
    colorTextSecondary: "#a0a0a0",
    colorTextPlaceholder: "#666666",
  },
};
