import { useSelector } from 'react-redux';
import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { TProtectedRouteProps } from '../../services/types/types'


export const ProtectedRouteAuth: FC<TProtectedRouteProps> = ({ element, to }) => {
    const isLogin = useSelector((store: any) => store.userReducer.isLogin);
    return !isLogin ? (element) : <Navigate to={to} replace/>;
}

