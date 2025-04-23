/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

const breakpointKeys = ["sm", "md", "lg", "xl", "xxl"] as const;
type BreakpointKey = (typeof breakpointKeys)[number];
type breakpointWidths = { [breakpointWidths in BreakpointKey]: string };

const breakpointWidths: breakpointWidths = {
  sm: "640px", // landscape mobile, small tablets
  md: "768px", // tablets
  lg: "1024px", // for laptops, large tablets
  xl: "1280", // 	desktops, widescreen laptops
  xxl: "1536", // large monitors
};

export const device = {
  sm: `(min-width: ${breakpointWidths.sm})`,
  md: `(min-width: ${breakpointWidths.md})`,
  lg: `(min-width: ${breakpointWidths.lg})`,
  xl: `(min-width: ${breakpointWidths.xl})`,
  xxl: `(min-width: ${breakpointWidths.xxl})`,
};

export default device;
