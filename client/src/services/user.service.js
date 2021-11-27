import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.API_URL;

class UserService {
    getUserProfile() {
        return axios.get(API_URL + "login/profile");
    }

}

export default new UserService();