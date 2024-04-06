import axios from "axios";
const API_URL = "http://localhost:8080/api/reservations"



class ReservationService {

    
    getReservations() {
        return axios.get(API_URL);
    }

    delete(href) {
        return axios.delete(href);
    }

    getById(){
        return JSON.parse(localStorage.getItem("user-info"));
    };   

    update(){
     localStorage.removeItem("user-info");
    }

}

const reservationServiceInstance = new ReservationService();

export { reservationServiceInstance as ReservationService };

