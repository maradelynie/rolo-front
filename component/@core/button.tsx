import { ButtonHTMLAttributes } from "react";

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={
        props.color === "neutral"
          ? "neutral-btn"
          : props.color === "primary"
          ? "primary-btn"
          : props.color === "warning"
          ? "warning-btn"
          : ""
      }
      {...props}
    />
  );
}
