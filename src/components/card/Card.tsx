import "./Card.scss";
import React from "react";
import { CardTitle, CardTitleProps } from "./CardTitle";
import { motion } from "framer-motion";

interface CardProps extends React.PropsWithChildren, CardTitleProps {
  className?: string;
  bodyClassName?: string;
}

export function Card(props: CardProps) {
  return (
    <div className={`card w-100 ${props.className}`}>
      {props.title ? (

        <motion.div
          initial={{ y: ".5rem", opacity: 1 }}
          animate={{y: 0, opacity: 1 }}
          exit={{ y: "50%", opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut"}}
        >
          <CardTitle
            title={props.title}
            textRight={props.textRight}
          ></CardTitle>
        </motion.div>
      ) : (
        <></>
      )}

      <motion.div
        initial={{ y: `${props.title ? '0.8rem' : '0.5rem'}`, opacity: 1 }}
        animate={{y: 0, opacity: 1 }}
        exit={{ y: "50%", opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className={`${props.bodyClassName} card-body border-radius-md border shadow-sm bg-white`}>{props.children}</div>
      </motion.div>
    </div>
  );
}

export default Card;

