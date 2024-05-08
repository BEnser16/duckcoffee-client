import axios from "axios";
import BaseUrl from "./BaseUrl";

const API_URL = `${BaseUrl}/api/auth/member`;


class AuthService {
    login(email , password) {
        return axios.post(API_URL + "/login" , {email , password});
    }

    register(user) {
        return axios.post(API_URL + "/register" , user);
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem("user-info"));
    };   

    logout(){
     localStorage.removeItem("user-info");
    }
}

const authServiceInstance = new AuthService();

export { authServiceInstance as AuthService };
