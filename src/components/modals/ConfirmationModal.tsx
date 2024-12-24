import { Button } from "../Button";
import SlideOutModal, { SlideOutModalProps } from "./SlideOutModal";
import { propsFilter } from "../../utils/miscUtils";

export interface ConfirmationModalProps extends SlideOutModalProps {
  message?: string;
  confirmText?: string;
  onConfirm: any;
  onCancel?: () => void;
}

export function ConfirmationModal(props: ConfirmationModalProps) {
  const onCancel = () => {
    props.showState.setter(false);
    props.onCancel?.();
  };

  const onConfirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    props.showState.setter(false);
    props.onConfirm.call(null, e);
  };

  const footer = props.footer ?? (
    <div className="container p-0">
      <div className="row g-0">
        <div className="col-12 pe-2">
          <Button onClick={onCancel} variant="cancel" className="w-100">
            Cancel
          </Button>
        </div>
        <div className="col-12 ps-2">
          <Button onClick={onConfirm} variant="primary" className="w-100">
            {props.confirmText ?? "Confirm"}
          </Button>
        </div>
      </div>
    </div>
  );
  if (props.footer !== undefined) delete props.footer;

  const filteredProps = propsFilter(props, [
    "message",
    "confirmText",
    "onConfirm",
  ]);

  return (
    <SlideOutModal {...(filteredProps as SlideOutModalProps)} footer={footer}>
      {props.message ? <span>{props.message}</span> : <></>}
      {props.children}
    </SlideOutModal>
  );
}

export default SlideOutModal;

