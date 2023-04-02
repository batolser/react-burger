import { RouteProps } from 'react-router-dom';

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

// export interface IProtectedRouteProps {
//     element: React.ReactNode,
//     to: string,
// }

// export interface IInitialState {
//     ingredients: never[];
//     ingredientsRequest: boolean;
//     ingredientsFailed: boolean;
//     chosenIngredients: never[];
// }


export type TProtectedRouteProps = {
    element: JSX.Element;
    to: string
  } & RouteProps;