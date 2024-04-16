import React from "react";
import { useState } from "react";
import { PostService } from "../../service/PostService";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [coverImg, setCoverImg] = useState("");

  function handleCreatePost(title, description, cover_img) {
    const now = new Date();
    const create_time = now.toISOString();
    PostService.createPost(title, description, cover_img, create_time)
      .then((res) => {
        console.log("create post res: ", res);
        window.alert("create post success.");
        window.location.reload();
      })
      .catch((err) => {
        window.alert("create post error.");
        console.warn("create post error: ", err);
      });
  }

  const handleInputTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleInputDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleCoverImgFile = (e) => {
    const img_file = e.target.files[0];
    setCoverImg(img_file);
  };

  return (
    <>
      <div>
        <button
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#addPost"
        >
          新增消息
        </button>

        <div
          className="modal fade"
          id="addPost"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  新增消息
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text">標題</span>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={handleInputTitle}
                    placeholder="請輸入消息標題"
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">消息描述</span>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="請輸入消息描述"
                    value={description}
                    onChange={handleInputDescription}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">
                    上傳消息封面
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    onChange={() => handleCoverImgFile}
                  />
                </div>
              </div>
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
                  onClick={() =>
                    handleCreatePost(title, description, coverImg)
                  }
                >
                  完成
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPost;
