import { RouteProps } from 'react-router-dom';
import {store} from "../store";
import {Action, ActionCreator} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import { TIngredientsActions } from '../actions/ingredients';
import { TModalActions } from '../actions/modal';
import { TOrderActions } from '../actions/order';
import { TUserActions } from '../actions/user';
import { TWSActions } from '../actions/orders';

export interface IModalProps {
    title?: string;
    children: React.ReactChild | React.ReactNode;
    onClose: () => void;
}

export interface IModalOverlayProps {
    onClick: () => void;
}

export interface IGetCoords {
    top: number,
    left: number,
}

export interface IAbsoluteCoords {
    title: string,
    value: number,
}

export interface IIngredient {
    image_large: string,
    name: string,
    calories: number,
    proteins: number,
    fat: number,
    carbohydrates: number,
    _id: string,
    image : string,
    price: number,
    type: string,
    uuid: string,
  }

export interface IChosenIngredient {
    ingredient : IIngredient,
    id: string,
    moveIngredient: (dragIndex: number, hoverIndex: number) => void
    index: number,
}

export interface ICard {
    ingredient: IIngredient,
    onClick: () => void,
}

export interface DragItem {
    index: number
    id: string
    type: string
  }


export interface IBurgerConstructorProps {
    onDropHandler: (ingredientId: IIngredient) => void;
 }

 export interface IUser {
    email: string
    name: string
  }


export type TProtectedRouteProps = {
    element: JSX.Element;
    to: string
  } & RouteProps;

export interface IModalState {
  isIngredientsModalOpen: boolean;
  isOrderDetailsModalOpen: boolean;
  ingredient:  IIngredient | null;
  order: string | null;
}

export interface IOrderState {
  orderRequest: boolean;
  orderFailed: boolean;
  order: string | null;
}
export interface IIngredientsState {
  ingredients: IIngredient[];
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  chosenIngredients: IIngredient[];
}

export interface IUserState {
  registrationRequest: boolean;
  registrationFailed: boolean;
  loginRequest: boolean;
  loginRequestFailed: boolean;
  forgotPasswordRequest: boolean;
  forgotPasswordRequestFailed: boolean;
  resetPasswordRequest: boolean;
  resetPasswordRequestFailed: boolean;
  refreshTokenRequest: boolean;
  refreshTokenRequestFailed: boolean;
  logoutRequest: boolean;
  logoutRequestFailed: boolean;
  getUsersDataRequest: boolean;
  getUsersDataRequestFailed: boolean;
  patchUsersDataRequest: boolean;
  patchUsersDataRequestFailed: boolean;
  user: IUser | null;
  isLogin: boolean;
  isPasswordForgot: boolean;
  token: string | null;
}
export interface IOrder {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}
export interface IOrdersState {
  wsOrders: boolean,
  wsUserOrders: boolean,
  orders: IOrder[],
  userOrders: IOrder[],
  total: number,
  totalToday: number,
  orderInfoRequest: boolean,
  orderInfoFailed: boolean,
  orderInfo: IOrder | null,
  ordersError?: Event,
  userOrdersError?: Event,
}

export interface IOrdersItemProps {
  order: IOrder,
  isHistory: boolean,
}

type TApplicationActions =
  | TIngredientsActions
  | TModalActions
  | TOrderActions
  | TUserActions
  | TWSActions;

export type RootState = ReturnType<typeof store.getState>;


export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, RootState, unknown, TApplicationActions>>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;