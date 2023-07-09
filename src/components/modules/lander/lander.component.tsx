import { Component, For } from "solid-js";
import { styled } from "solid-styled-components";
import landerIcon from "~/assets/icon.webp";
import notesAppIcon from "~/assets/notes-app-icon.svg";
import { Text } from "~/components/atoms";

const SWrapper = styled("div")`
  border-radius: 12px;
  border: 0.5px solid ${(props) => props.theme?.colors.gray2};
  background: rgba(29, 29, 32, 0.8);
  margin: auto;
  width: 50vw;
  min-width: 600px;
  max-width: 800px;
  height: 420px;
  overflow: hidden;
  position: relative;
  box-shadow: -4px 4px 100px 0px rgba(5, 18, 44, 0.5);

  @media (prefers-color-scheme: light) {
    background: rgba(215, 220, 228, 0.8);
    box-shadow: -4px 4px 100px 0px rgba(77, 128, 231, 0.5);
  }

  @media (max-width: 700px) {
    min-width: 400px;
  }

  @media (max-width: 425px) {
    min-width: 300px;
  }
`;

const SHeader = styled("div")`
  height: 42px;
  padding: 0 16px;
  display: grid;
  align-items: center;
  cursor: text;
  border-bottom: 0.5px solid ${(props) => props.theme?.colors.gray2};
`;

const SCommandApplication = styled("div")`
  display: grid;
  gap: 16px;
  padding: 0 12px;
  padding-top: 16px;
  grid-template-columns: max-content 1fr;
  align-items: center;
  border-radius: 8px;
`;

const SCommandApplicationSubtitle = styled(Text.Callout)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const SCommandTilesWrapper = styled("div")`
  display: grid;
  padding: 0 12px;
  gap: 4px;
`;

const SCommandTile = styled("div")`
  display: grid;
  gap: 16px;
  grid-template-columns: max-content 1fr max-content;
  align-items: center;
  padding: 8px 12px;
  border-radius: 8px;

  &:hover {
    background: ${(props) => `${props.theme?.colors.gray}22`};
  }
`;

const SFooter = styled("div")`
  height: 36px;
  width: calc(100% - 32px);
  padding: 0 16px;
  position: absolute;
  bottom: 0;
  display: grid;
  align-items: center;
  justify-content: end;
  border-top: 0.5px solid ${(props) => props.theme?.colors.gray2};
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  background: linear-gradient(
    90deg,
    rgba(64, 59, 59, 0.2) 40%,
    rgb(26, 25, 25, 0.6) 100%
  );

  @media (prefers-color-scheme: light) {
    background: linear-gradient(
      90deg,
      rgba(255, 236, 236, 0.2) 40%,
      rgb(255, 236, 236, 0.6) 100%
    );
  }
`;

interface Command {
  title: string;
}

const commands: Command[] = [
  { title: "Summarize selected text" },
  { title: "Generate a bullet point summary" },
  { title: "Improve writing & fix grammar" },
  { title: "Make content more readable" },
  { title: "Extract key quotes from content" },
  { title: "Generate questions from content" },
  { title: "Change tone to friendly" },
  { title: "Change tone to professional" },
  { title: "Change tone to sarcastic" },
  { title: "Change tone to humorous" },
];

export const Lander: Component = () => {
  return (
    <SWrapper>
      <SHeader>
        <Text.Headline color="gray">Ask me anything</Text.Headline>
      </SHeader>

      <div>
        <SCommandApplication>
          <img
            src={notesAppIcon}
            height="24px"
            width="24px"
            alt=""
            draggable={false}
          />
          <div>
            <Text.Callout fontWeight="medium">
              Notes (selected text)
            </Text.Callout>
            <SCommandApplicationSubtitle mt="4px" color="gray">
              March 2023 - Wow, ChatGPT has changed the world! Although, I
              wonder if there's a better way to interact with it in my
              workflows. Better yet, what if it could index my entire laptop? I
              should create an app to do this.
            </SCommandApplicationSubtitle>
          </div>
        </SCommandApplication>

        <Text.Callout fontWeight="semibold" mx="12px" my="16px">
          AI
        </Text.Callout>

        <SCommandTilesWrapper>
          <For each={commands}>
            {(command) => (
              <SCommandTile>
                <img
                  src={landerIcon}
                  height="24px"
                  width="24px"
                  alt=""
                  draggable={false}
                />
                <div>
                  <Text.Callout>{command.title}</Text.Callout>
                </div>
                <Text.Caption color="gray">AI</Text.Caption>
              </SCommandTile>
            )}
          </For>
        </SCommandTilesWrapper>
      </div>

      <SFooter>
        <img
          src={landerIcon}
          height="24px"
          width="24px"
          alt=""
          draggable={false}
        />
      </SFooter>
    </SWrapper>
  );
};
