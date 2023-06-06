import { useSelector } from "../../services/hooks/hooks";
import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { TProtectedRouteProps } from '../../services/types/types'


export const ProtectedRouteAuth: FC<TProtectedRouteProps> = ({ element, to }) => {
    const isLogin = useSelector((store) => store.userReducer.isLogin);
    return !isLogin ? (element) : <Navigate to={to} replace/>;
}

