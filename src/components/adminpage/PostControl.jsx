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
    // get id by regex
    const href = post._links.self.href;
    const idMatch = href.match(/\/(\d+)$/); // 提取最後的數字
    const id = idMatch ? idMatch[1] : null;
    console.log("post link: ", href)
    console.log("Delete Post ID:", id);

    PostService.deletePostById(id)
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
                        data-bs-toggle="modal"
                        data-bs-target="#deletePostModal"
                      >
                        刪除
                      </button>
                      <div
                        className="modal fade"
                        id="deletePostModal"
                        tabIndex="-1"
                        aria-labelledby="deletePostModal"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                              >
                                刪除消息
                              </h1>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">確定刪除消息？</div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                取消
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => handleDeletePost(post)}
                              >
                                完成
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

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
