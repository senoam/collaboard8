import React, { Component, Fragment } from 'react';
import './login.css'


class Login extends Component {

    render() { 
        return(
            <Fragment>
            <div className="login-wrapper">
                <h2>Login</h2>
                <form>
                    <label>
                        <p>Username</p>
                        <input type="text" />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" />
                    </label>
                    <br/>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
            </Fragment>
        );
    }
}

export default Login;