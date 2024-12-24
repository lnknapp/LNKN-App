import { store } from "../../app/store/store";
import { clearException } from "../../app/store/exceptionSlice";
import { useAppSelector } from "../../hooks";
import { ExceptionLevel } from "../../models/exception/ExceptionLevel";
import { FaExclamationTriangle, FaInfoCircle, FaBan, FaCheck, FaInfo } from "react-icons/fa";

import "./ExceptionMessage.scss";
export function ExceptionMessage() {
  const message = useAppSelector((state) => state.exceptions.message);
  const showError = useAppSelector((state) => state.exceptions.show);
  const level = useAppSelector((state) => state.exceptions.level);
  const dismiss = () => {
    store.dispatch(clearException());
  };
  const initialTime = 5000;
  const millisecondsPerChar = 100;
  const variants = new Map<ExceptionLevel, string>();
  variants.set(ExceptionLevel.information, "info");
  variants.set(ExceptionLevel.warning, "warning");
  variants.set(ExceptionLevel.error, "danger");
  variants.set(ExceptionLevel.success, "success");
  const variant = variants.get(level!);

  const icons = new Map<ExceptionLevel, JSX.Element>();
  icons.set(ExceptionLevel.information, <FaInfoCircle />);
  icons.set(ExceptionLevel.warning, <FaExclamationTriangle />);
  icons.set(ExceptionLevel.error, <FaBan />);
  icons.set(ExceptionLevel.success, <FaCheck />);
  const icon = icons.get(level!);

  const titles = new Map<ExceptionLevel, string>();
  titles.set(ExceptionLevel.information, "Information!");
  titles.set(ExceptionLevel.warning, "Warning!");
  titles.set(ExceptionLevel.error, "Error!");
  titles.set(ExceptionLevel.success, "Success!");

  if (showError) {
    const waitTime = initialTime + (message?.length ?? 1) * millisecondsPerChar;
    setTimeout(() => {
      store.dispatch(clearException());
    }, waitTime);

    return (
      <div className="my-2" style={{position: "fixed", zIndex: 999 }}>
          <div className={`d-flex justify-content-between`} role="alert">
            <div className="d-flex justify-content-center w-100 align-items-center">
              <div className={`text-dark d-flex justify-content-center align-items-center ${variant} py-2 px-3 border-radius-vh100`}>
                <div className={`icon bg-${variant} border border-0 rounded-circle me-2 text-white`}>
                  <span>{icon}</span>
                </div>
                <span className="fw-bold">
                {message}
                </span>
                <span className="fs-2 ms-2 toggle" onClick={dismiss} style={{color: "rgba(0,0,0,0.3)"}}>&times;</span>
              </div>
            </div>
          </div>
      </div>
    );
  }
  return <></>;
}

export default ExceptionMessage;
