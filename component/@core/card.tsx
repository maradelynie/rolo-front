import { ReactNode } from "react";

export default function Card(
  props: {
    children: ReactNode;
  } & { variant?: "button"; onClick?: () => void }
) {
  return (
    <div
      onClick={props.onClick}
      className={"card-core" + (props.variant ? " clickable" : "")}
      {...props}
    />
  );
}
