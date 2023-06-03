// @refresh reload
import { onMount, Suspense } from "solid-js";
import { createStore } from "solid-js/store";
import { Assets } from "solid-js/web";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import {
  DefaultTheme,
  extractCss,
  styled,
  ThemeProvider,
} from "solid-styled-components";
import { getTheme, ThemeMode } from "./components/theme";
import "./index.css";

const SWrapper = styled("div")`
  font-family: ${(props) => props.theme?.fontFamily};
  background: linear-gradient(145deg, rgb(20, 20, 30) 0%, rgb(0, 0, 0) 100%);
  min-height: 100vh;

  @media (prefers-color-scheme: light) {
    background: linear-gradient(
      145deg,
      rgb(196, 212, 242) 0%,
      rgb(240, 240, 240) 100%
    );
  }
`;

export default () => {
  const [theme, setTheme] = createStore<DefaultTheme>(getTheme(ThemeMode.Dark));

  onMount(async () => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? ThemeMode.Dark
      : ThemeMode.Light;

    setTheme(getTheme(systemTheme));

    const handleThemeChange = (event: MediaQueryListEvent) => {
      setTheme(
        event.matches ? getTheme(ThemeMode.Dark) : getTheme(ThemeMode.Light)
      );
    };

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleThemeChange);
  });

  return (
    <Html lang="en">
      <Head>
        <Title>Lander</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Assets>
          <style innerHTML={extractCss()} />
        </Assets>
      </Head>
      <ThemeProvider theme={theme}>
        <Body>
          <SWrapper>
            <Suspense>
              <ErrorBoundary>
                <Routes>
                  <FileRoutes />
                </Routes>
              </ErrorBoundary>
            </Suspense>
            <Scripts />
          </SWrapper>
        </Body>
      </ThemeProvider>
    </Html>
  );
};
