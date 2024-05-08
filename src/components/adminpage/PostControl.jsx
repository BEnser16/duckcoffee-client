import React from "react";
import { useState, useEffect } from "react";
import { PostService } from "../../service/PostService";
import AddPost from "./AddPost";
import EditPost from "./EditPost";

const PostControl = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    PostService.getAllPost()
      .then((res) => {
        console.log("start get all post.", res.data._embedded.posts);
        setPosts(res.data._embedded.posts);
      })
      .catch((err) => {
        console.error("get all post error.", err);
      });
  }, []);

  function handleDeletePost(post) {
    const href = post._links.self.href;
    console.log("Delete Post", post);

    PostService.deletePost(href)
      .then((res) => {
        console.log("delete post res: ", res);
        window.alert("delete post success.");
        window.location.reload();
      })
      .catch((err) => {
        console.warn("delete post error: ", err);
      });
  }

  return (
    <div className="row mt-5 m-4">
      <form className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="請輸入消息標題"
          aria-label="Search"
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
      <div className="mt-3">
        <AddPost />
      </div>
      <div>
        <div className="row m-4 justify-content-center">
          {posts.map((post, index) => {
            return (
              <div key={index} className="card m-4">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={post.cover_img}
                      className="img-fluid rounded-start"
                      alt="..."
                      style={{ maxHeight: "240px" }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{post.title}</h5>
                      <p className="card-text">{post.description}</p>
                      <p className="card-text">
                        <small className="text-body-secondary">
                          {post.create_time}
                        </small>
                      </p>
                    </div>
                    <div className="d-flex" id="post_control_button">
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => handleDeletePost(post)}

                      >
                        刪除
                      </button>

                      <EditPost post={post} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PostControl;
