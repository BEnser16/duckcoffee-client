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

    deletePost(postLink) {
        return axios.delete(postLink);
    }

    updatePost(link , title , description , cover_img , create_time) {
        return axios.patch(link, {title , description , cover_img , create_time});
    }
    

}

const postServiceInstance = new PostService();

export { postServiceInstance as PostService };

