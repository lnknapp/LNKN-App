import React from "react";
import { router } from "../../app/routes";

export interface CardTitleProps {
  title?: string;
  textRight?: {
    text: string;
    redirectUrl?: string;
  };
  className?: string;
}

export function CardTitle(props: CardTitleProps) {
  const textRight = props.textRight ? (
    <div className="col-24 col-md-12 text-end">
      <span
        className={`pe-auto fw-bold text-light ${props.textRight.redirectUrl ? "clickable" : ""}`}
        onClick={
          props.textRight.redirectUrl
            ? () => {
                router.navigate(props.textRight!.redirectUrl!);
              }
            : undefined
        }
      >
        {props.textRight.text}
      </span>
    </div>
  ) : (
    <></>
  );

  return (
    <div className={`card-title mb-1 border-radius-md bg-primary shadow-sm p-3 m-0 ${props.className}`}>
      <div className="row">
        <div className="col-24 col-md-12 text-left">
          <h6 className="text-light m-0">{props.title}</h6>
        </div>
        {textRight}
      </div>
    </div>
  );
}

export default CardTitle;
