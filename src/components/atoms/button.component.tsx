import { Component, JSX, splitProps } from "solid-js";
import { styled } from "solid-styled-components";
import { flexbox, FlexboxProps, space, SpaceProps } from "styled-system";
import { Text } from "./text.component";

type StyledProps = SpaceProps & FlexboxProps;

const SWrapper = styled("button")<StyledProps>`
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  padding: 6px 8px;
  margin: 0;
  background: ${(props) => props.theme?.colors.gray4};
  opacity: ${(props) => (props.disabled ? 0.6 : undefined)};
  border: ${(props) => `0.5px solid ${props.theme?.colors.gray2}`};
  border-radius: 4px;

  &:hover {
    background: ${(props) =>
      !props.disabled ? props.theme?.colors.gray3 : undefined};
  }

  &:active {
    background: ${(props) =>
      !props.disabled ? props.theme?.colors.gray2 : undefined};
  }

  &:focus-visible {
    outline-style: none;
    outline-width: 0;
  }

  ${space};
  ${flexbox};
`;

interface Props extends JSX.HTMLAttributes<HTMLButtonElement>, StyledProps {
  children: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: Component<Props> = ($props) => {
  const [props, rest] = splitProps($props, ["children", "onClick", "disabled"]);

  return (
    <SWrapper
      type="button"
      onClick={props.onClick}
      disabled={props.disabled}
      {...rest}
    >
      <Text.Callout fontWeight="medium">{props.children}</Text.Callout>
    </SWrapper>
  );
};
