interface ScreenSize {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

const screenSize: ScreenSize = {
  xs: "400px", // for small screen mobile
  sm: "600px", // for mobile screen
  md: "900px", // for tablets
  lg: "1280px", // for laptops
  xl: "1440px", // for desktop / monitors
  xxl: "1920px", // for big screens
};

export const device = {
  xs: `(max-width: ${screenSize.xs})`,
  sm: `(max-width: ${screenSize.sm})`,
  md: `(max-width: ${screenSize.md})`,
  lg: `(max-width: ${screenSize.lg})`,
  xl: `(max-width: ${screenSize.xl})`,
  xxl: `(max-width: ${screenSize.xxl})`,
};

export default device;
