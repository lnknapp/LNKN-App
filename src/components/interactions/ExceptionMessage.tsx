import { store } from "../../app/store/store";
import { clearException } from "../../app/store/exceptionSlice";
import { useAppSelector } from "../../hooks";
import { ExceptionLevel } from "../../models/exception/ExceptionLevel";
import "./ExceptionMessage.scss";
import { Alert } from "@nextui-org/react";

export function ExceptionMessage() {
  const message = useAppSelector((state) => state.exceptions.message);
  const showError = useAppSelector((state) => state.exceptions.show);
  const level = useAppSelector((state) => state.exceptions.level);

  const initialTime = 5000;
  const millisecondsPerChar = 100;
  const variants = new Map<ExceptionLevel, string>();
  variants.set(ExceptionLevel.primary, "primary");
  variants.set(ExceptionLevel.warning, "warning");
  variants.set(ExceptionLevel.danger, "danger");
  variants.set(ExceptionLevel.success, "success");
  const variant = variants.get(level!) as "primary" | "secondary" | "success" | "warning" | "danger" || "default";

  const titles = new Map<ExceptionLevel, string>();
  titles.set(ExceptionLevel.primary, "Information!");
  titles.set(ExceptionLevel.warning, "Warning!");
  titles.set(ExceptionLevel.danger, "Error!");
  titles.set(ExceptionLevel.success, "Success!");

  if (showError) {
    const waitTime = initialTime + (message?.length ?? 1) * millisecondsPerChar;
    setTimeout(() => {
      store.dispatch(clearException());
    }, waitTime);

    return (
      <div className="my-2" style={{position: "fixed", zIndex: 999 }}>
        <div className={`flex justify-between`} role="alert">
          <div className="flex justify-center w-full items-center">
            <Alert color={variant} title={message!} description={""} />
          </div>
        </div>
      </div>
    );
  }
  return <></>;
}

export default ExceptionMessage;
