import axios from "axios";
const API_URL = "http://localhost:8080/api/posts"



class PostService {

    getAllPost() {
        return axios.get(API_URL);
    }

    getPostById(id) {
        return axios.get(API_URL + "/" + id);
    }

    createPost(title , description , cover_img , create_time) {
        return axios.post(API_URL , {title , description , cover_img , create_time});
    }

    deletePostById(id) {
        return axios.delete(API_URL + "/" + id);
    }

    updatePostById(id , title , description , cover_img , create_time) {
        return axios.patch(API_URL + "/" + id , {title , description , cover_img , create_time});
    }
    

}

const postServiceInstance = new PostService();

export { postServiceInstance as PostService };

