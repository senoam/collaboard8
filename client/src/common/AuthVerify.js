import React from "react";
import { Navigate, useNavigate } from "react-router";

// Logout when token expires https://www.bezkoder.com/handle-jwt-token-expiration-react/

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
};

const AuthVerify = (props) => {
    props.history.listen(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            const decodedJwt = parseJwt(user.accessToken);

            if (decodedJwt.exp * 1000 < Date.now()) {
                props.logOut();
            }
        }
    });

    return <div></div>;
};

const withRouter = (Component) => {
    const Wrapper = (props) => {
        const navigate = useNavigate();

        return <Component navigate={navigate} {...props} />;
    };
    return Wrapper;
};

export default withRouter(AuthVerify);
