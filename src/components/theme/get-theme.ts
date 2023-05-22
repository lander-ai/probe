import { DefaultTheme } from "solid-styled-components";
import { theme } from "./base.theme";

export enum ThemeMode {
  Light = "Light",
  Dark = "Dark",
}

export const getTheme = (mode: ThemeMode): DefaultTheme => {
  if (mode === ThemeMode.Dark) {
    return { ...theme, colors: theme.colors.modes.dark };
  }

  const { modes: _, ...colors } = theme.colors;

  return { ...theme, colors };
};
