import React from "react";
import { Modal, ModalProps } from "react-bootstrap";

import "./SlideOutModal.scss";
import sharedProperty from "../../hooks/useSharedState";
import { propsFilter } from "../../utils/miscUtils";

export interface SlideOutModalProps
  extends React.PropsWithChildren,
    ModalProps {
  title?: string;
  titleClassName?: string;
  bodyClassName?: string;
  footer?: React.ReactElement;
  topbar?: React.ReactElement;
  footerClassName?: string;
  showClose?: boolean;
  showState: sharedProperty<boolean>;
}

export function SlideOutModal(props: Readonly<SlideOutModalProps>) {
  const onHide = () => {
    props.showState.setter(false);
    props.onHide?.call(null);
  };

  /* Remove properties no longer required to pass on to BS Modal */
  const filteredProps = propsFilter(props, [
    "title",
    "titleClassName",
    "bodyClassName",
    "footer",
    "footerClassName",
    "showClose",
    "showState",
    "onHide",
    "show",
    "animation"
  ]);

  return (
    <Modal
      dialogClassName="modal-dialog-slideout-right modal-dialog-scrollbody border-radius-md"
      className="p-3"
      onHide={onHide}
      show={props.showState.value}
      animation={true}
      {...filteredProps}
    >
      <Modal.Header
        closeButton={props.showClose === undefined || props.showClose}
      >
        <Modal.Title className={props.titleClassName}>
          {props.title}
        </Modal.Title>
      </Modal.Header>
      {props.topbar}
      <Modal.Body className={props.bodyClassName}>{props.children}</Modal.Body>
      {!props.footer ? (
        <></>
      ) : (
        <Modal.Footer className={`${props.footerClassName}`}>
          {props.footer}
        </Modal.Footer>
      )}
    </Modal>
  );
}

export default SlideOutModal;

