import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../app";

/**
 * A custom hook that allows selecting data from the Redux store using the RootState type.
 * 
 * @template RootState - The type of the root state object in the Redux store.
 * 
 * @returns A selector hook that can be used to select data from the Redux store.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export default useAppSelector;
