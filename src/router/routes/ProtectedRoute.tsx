import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import * as paths from '../pagePaths';

const ProtectedRoute = () => {
    const auth = useAuth();
    const [isAuthentificated, setIsAuthentificated] = useState<boolean>(auth.isAuthentificated);

    useEffect(() => {
        setIsAuthentificated(auth.isAuthentificated);
    }, [auth.isAuthentificated]);

    return isAuthentificated ? (
        <Outlet />
    ) : (
        <Navigate to={paths.loginPath} />
    );
};

export default ProtectedRoute;