import React, { Ref, forwardRef } from "react";
import "./LinkLooksLike.scss";

export interface LinkLookLikeProps
  extends React.PropsWithChildren,
    React.HTMLAttributes<HTMLSpanElement>,
    React.RefAttributes<HTMLSpanElement> {
  className?: string;
}

export const LinkLooksLike = forwardRef(
  (props : LinkLookLikeProps, ref: Ref<HTMLSpanElement>) => (
    <span
      className={`link clickable ${props.className ?? ""}`}
      onClick={props.onClick}
      ref={ref}
    >
      {props.children}
    </span>
  )
);

export default LinkLooksLike;

