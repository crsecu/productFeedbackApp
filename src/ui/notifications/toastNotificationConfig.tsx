import { IconType } from "react-icons";
import { BiSolidCheckCircle, BiSolidXCircle } from "react-icons/bi";

//types
export type ToastThemeType = "success" | "error";

interface ThemeConfig {
  backgroundColor: string;
  textColor: string;
  icon: IconType | string;
}

//theme
export const toastTheme: Record<ToastThemeType, ThemeConfig> = {
  success: {
    backgroundColor: "#b6e4b8",
    textColor: "#0b8b11",
    icon: BiSolidCheckCircle,
  },
  error: {
    backgroundColor: "#df8181",
    textColor: "#a20e0e",
    icon: BiSolidXCircle,
  },
};
