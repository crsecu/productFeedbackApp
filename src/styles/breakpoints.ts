/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

const breakpointKeys = ["xs", "sm", "md", "lg", "xl", "xxl"] as const;
type BreakpointKey = (typeof breakpointKeys)[number];
type breakpointWidths = { [breakpointWidths in BreakpointKey]: string };

const breakpointWidths: breakpointWidths = {
  xs: "400px", // for small screen mobile
  sm: "600px", // for mobile screen
  md: "900px", // for tablets
  lg: "1280px", // for laptops
  xl: "1440px", // for desktop / monitors
  xxl: "1920px", // for big screens
};

export const device = {
  xs: `(max-width: ${breakpointWidths.xs})`,
  sm: `(max-width: ${breakpointWidths.sm})`,
  md: `(max-width: ${breakpointWidths.md})`,
  lg: `(max-width: ${breakpointWidths.lg})`,
  xl: `(max-width: ${breakpointWidths.xl})`,
  xxl: `(max-width: ${breakpointWidths.xxl})`,
};

export default device;
