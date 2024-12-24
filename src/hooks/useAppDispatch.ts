import { useDispatch } from "react-redux";
import { AppDispatch } from "../app";

/**
 * Custom hook that returns the `dispatch` function from the Redux store.
 * @returns The `dispatch` function from the Redux store.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();


