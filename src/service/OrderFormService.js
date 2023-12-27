import axios from "axios";
const API_URL = "http://localhost:8080/api/orderForms"



class OrderFormService {

    createOrderForm(create_time , last_update_time, table_number , total_price) {
        return axios.post(API_URL , {create_time , last_update_time, table_number , total_price});
    }

    getAllOrderForm() {
        return axios.get(API_URL);
    }

    getOrderFormById(id) {
        return axios.get(API_URL + "/" + id);
    }   

    deleteOrderFormById(id) {
        return axios.delete(API_URL + "/" + id);
    }

    updateOrderFormById(id , create_time , last_update_time, table_number , total_price) {
        return axios.patch(API_URL + "/" + id , {create_time , last_update_time, table_number , total_price});
    }    

}

const orderFormService = new OrderFormService();

export { orderFormService as OrderFormService };

