// import {
//     TypedUseSelectorHook,
//     useSelector as selectorHook,
//     useDispatch as dispatchHook,
//   } from 'react-redux';
//   import {AppDispatch, RootState, AppThunk } from '../types/types';
  
//   export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
//   export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();

import { 
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import { AppDispatch, RootState } from "../types/types";

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;