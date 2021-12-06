import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Navigate, Outlet } from "react-router";

const { default: authService } = require("../../services/auth.service");

//  Private Route https://stackoverflow.com/questions/56357459/cant-redirect-if-not-logged-in-react-token-auth
const PrivateRoute = ({ component: Component, ...rest }) => {
    const user = authService.getCurrentUser();

    if (user) {
        return <Outlet />;
    }
    return <Navigate to="/" />;
};

export default PrivateRoute;
