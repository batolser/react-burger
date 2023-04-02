import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { getCookie } from '../../utils/cookie'
import { TProtectedRouteProps } from '../../services/types/types'

export const ProtectedRoute: FC<TProtectedRouteProps> = ({ element, to }) => {
    const accessToken = getCookie("accessToken");
    return accessToken ? (element) : <Navigate to={to} replace/>;
}