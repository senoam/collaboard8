import React from "react";
import { Navigate, Outlet } from "react-router";

const { default: authService } = require("../../services/auth.service");

//  Private Route https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5
const loginAuthRoute = ({ component: Component, ...rest }) => {
    const user = authService.getCurrentUser();

    if (!user) {
        return <Outlet />;
    }
    return <Navigate to="/home" />;
};

export default loginAuthRoute;
