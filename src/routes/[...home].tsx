import { createMemo, createSignal, For, onMount, Show } from "solid-js";
import { Title, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { styled } from "solid-styled-components";
import { UAParser } from "ua-parser-js";
import { Button, Text } from "~/components/atoms";
import { Lander } from "~/components/modules";

const SWrapper = styled("div")`
  width: 100vw;
  height: 100vh;
  padding: 80px 0;
  display: grid;
  align-items: center;
  align-content: center;
  justify-content: center;
  overflow-y: auto;
`;

const SContentWrapper = styled("div")`
  margin: 0 16px;
  margin-bottom: 200px;
`;

const SDownloadsWrapper = styled("div")`
  display: grid;
  grid-auto-flow: column;
`;

interface RouteDataDownload {
  os: {
    name: string;
  };
  url: string | null;
}

interface RouteData {
  os: {
    name: string;
    version: string;
  };
  downloads: RouteDataDownload[];
}

export const routeData = () => {
  return createServerData$<RouteData>(async (_, event) => {
    const userAgent = event.request.headers.get("user-agent") as string;
    const userAgentParser = new UAParser(userAgent);
    const os = userAgentParser.getOS();

    if (os.name === "Mac OS") {
      os.name = "macOS";
    }

    if (os.name === "Windows") {
      os.name = "windows";
    }

    if (os.name === "Linux") {
      os.name = "linux";
    }

    const downloads = [
      {
        os: { name: "macOS" },
        url: "/releases/darwin/x86_64",
      },
      { os: { name: "windows" }, url: null },
      { os: { name: "linux" }, url: null },
    ];

    return {
      os,
      downloads,
    } as RouteData;
  });
};

export const Home = () => {
  const data = useRouteData<typeof routeData>();

  const downloads = createMemo(() => {
    const response = data();

    if (!response) {
      return undefined;
    }

    const downloads = response.downloads.map((download) => ({
      os: { name: download.os.name },
      url: download.url,
    }));

    downloads
      .map((download) => {
        if (download.os.name === "macOS") {
          download.os.name = "macOS (universal)";
        }

        if (download.os.name === "windows") {
          download.os.name = "Windows";
        }

        if (download.os.name === "linux") {
          download.os.name = "Linux";
        }

        return download;
      })
      .sort((a) => {
        if (a.os.name === response.os.name) {
          return -1;
        }

        return 0;
      });

    return downloads;
  });

  const [isDownloadDisabled, setIsDownloadDisabled] = createSignal(false);

  const handleDownload = (download: RouteDataDownload) => {
    if (!download.url) {
      return;
    }

    setIsDownloadDisabled(true);

    window.location.href = download.url;

    setTimeout(() => {
      setIsDownloadDisabled(false);
    }, 1000);
  };

  onMount(() => {
    history.pushState(null, "", "/");
  });

  return (
    <main>
      <Title>Lander</Title>

      <SWrapper>
        <SContentWrapper>
          <Text.SuperLargeTitle textAlign="center" fontWeight="medium">
            Talk to your apps
          </Text.SuperLargeTitle>
          <Text.Title textAlign="center" color="gray" mt="8px" mb="40px">
            With Lander, you can use AI to start a chat within any application
            on your system
          </Text.Title>

          <Lander />

          <Show when={downloads()} keyed>
            {(downloads) => (
              <>
                <Button
                  disabled={!downloads[0].url || isDownloadDisabled()}
                  margin="auto"
                  mt="40px"
                  onClick={() => handleDownload(downloads[0])}
                >
                  {downloads[0].url ? "Download" : "Coming soon"}
                </Button>
                <Text.Body
                  textAlign="center"
                  mt="8px"
                  color={downloads[0].url ? "text" : "gray"}
                >
                  {downloads[0].os.name}
                </Text.Body>

                <SDownloadsWrapper>
                  <For each={downloads.slice(1)}>
                    {(download) => (
                      <div>
                        <Button
                          disabled={!download.url || isDownloadDisabled()}
                          margin="auto"
                          mt="40px"
                          onClick={() => handleDownload(download)}
                        >
                          {downloads[0].url ? "Download" : "Coming soon"}
                        </Button>
                        <Text.Body
                          textAlign="center"
                          color={downloads[0].url ? "text" : "gray"}
                          mt="8px"
                        >
                          {download.os.name}
                        </Text.Body>
                      </div>
                    )}
                  </For>
                </SDownloadsWrapper>
              </>
            )}
          </Show>
        </SContentWrapper>
      </SWrapper>
    </main>
  );
};

export default Home;
