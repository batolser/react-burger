import { useSelector } from 'react-redux';

import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCookie } from '../../utils/cookie'

export const ProtectedRoute = ({ element, to }) => {
    const accessToken = getCookie("accessToken");
    return accessToken ? (element) : <Navigate to={to} replace/>;
}

ProtectedRoute.propTypes = {
    element: PropTypes.object.isRequired,
    to: PropTypes.string.isRequired
  }