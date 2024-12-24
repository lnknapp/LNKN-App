import { useEffect } from "react";

/**
 * Custom hook that adds a beforeunload event listener to the window,
 * prompting the user with a confirmation dialog if there are unsaved changes.
 *
 * @param hasUnsavedChanges - A boolean indicating whether there are unsaved changes.
 */
export function useFormPrompt(hasUnsavedChanges: boolean){
  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [hasUnsavedChanges]);
};
