import axios from "axios";
const API_URL = "http://localhost:8080/api/auth/member"



class AuthService {

    // send login request function
    login(email , password) {
        return axios.post(API_URL + "/login" , {email , password});
    }

    // send register request function
    register(email , password) {
        return axios.post(API_URL + "/register" , {email , password});
    }

}

const authServiceInstance = new AuthService();

export { authServiceInstance as AuthService };

