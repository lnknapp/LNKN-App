import { motion } from "framer-motion";
import "./Card.scss";
import React, { HTMLAttributes } from "react";

export interface TitlelessCardProps extends React.PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  bodyClassName?: string
}

export function TitlelessCard(props: TitlelessCardProps) {
  return (
    <motion.div
      initial={{ y: ".5rem", opacity: 1 }}
      animate={{y: 0, opacity: 1 }}
      exit={{ y: "50%", opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className={`card w-100 ${props.className ?? ""}`}>
        <div className={`card-body ${props.bodyClassName ?? ""}`}>{props.children}</div>
      </div>
    </motion.div>
  );
}

export default TitlelessCard;
