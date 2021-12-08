import axios from "axios";

const API_URL = process.env.API_URL;

class AuthService {
    login(email, password) {
        return axios
            .post(API_URL + "login", {
                email: email,
                password: password
            })
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    register(email, password, firstName, lastName) {
        return axios.post(API_URL + "signup", {
            email,
            password,
            firstName,
            lastName
        });
    }

    logout() {
        localStorage.removeItem("user");
    }

    getCurrentUser() {
        if (localStorage.getItem("user") === null) {
            return undefined;
        }
        console.log(localStorage.getItem("user"));

        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();
