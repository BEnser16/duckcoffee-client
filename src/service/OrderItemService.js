import axios from "axios";
const API_URL = "http://localhost:8080/api/orderItems"



class OrderItemService {

    // foreign key using uri
    addOrderItem(quantity , menuItem , orderForm , remark , sugar , ice ) {
        return axios.post(API_URL , {quantity , menuItem , orderForm , remark , sugar , ice});
    }

    getAllOrderItem() {
        return axios.get(API_URL);
    }

    getOrderItemById(id) {
        return axios.get(API_URL + "/" + id);
    }

    deleteOrderItemById(id) {
        return axios.delete(API_URL + "/" + id);
    }

    updateOrderItemById(id , quantity , menuItem , orderForm , remark , sugar , ice ) {
        return axios.patch(API_URL + "/" + id , {quantity , menuItem , orderForm , remark , sugar , ice});
    }

    createOrderItems(orderItems) {
        return axios.post("http://localhost:8080/api/customOrderItems" , orderItems);
    }
    

}

const orderItemService = new OrderItemService();

export { orderItemService as OrderItemService };

