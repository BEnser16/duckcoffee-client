import axios from "axios";
const API_URL = "http://localhost:8080/api/tableSeats"



class TableService {

    getAllTableSeats() {
        return axios.get(API_URL);
    }

    getTableSeatsById(id) {
        return axios.get(API_URL + "/" + id);
    }

    createTableSeat(tableNumber ,  seat) {
        return axios.post(API_URL , {tableNumber , seat});
    }

    deleteTableSeatById(id) {
        return axios.delete(API_URL + "/" + id);
    }

    updateTableSeat(href , table) {
        return axios.put(href , table);
    }

}

const tableServiceInstance = new TableService();

export { tableServiceInstance as TableService };

