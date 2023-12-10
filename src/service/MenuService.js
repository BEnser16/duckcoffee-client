import axios from "axios";
const API_URL = "http://localhost:8080/api/menuItems"



class MenuService {

    // get all menu data
    getAllMenuItem() {
        return axios.get(API_URL + "?page=0&size=100");
    }

    // get menu item by id
    getMenuItemById(id) {
        return axios.get(API_URL + `/${id}`);
    }

    // delete menu item by id
    deleteMenuItemById(id) {
        return axios.delete(API_URL + `/${id}`);
    }

}

const menuServiceInstance = new MenuService();

export { menuServiceInstance as MenuService };

