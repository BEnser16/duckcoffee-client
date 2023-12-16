import React from "react";
import { useState } from "react";
import { PostService } from "../../service/PostService";
import { Modal } from "react-bootstrap";

const EditPost = (props) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [updateState, setUpdateState] = useState(false);
  const [coverImg, setCoverImg] = useState();

  function handleEditPost(title, description, cover_img) {
    const now = new Date();
    const create_time = now.toISOString();
    // get id by regex
    const href = props.post._links.self.href;
    const idMatch = href.match(/\/(\d+)$/); // 提取最後的數字
    const id = idMatch ? idMatch[1] : null;
    console.log("Update Post ID:", id);

    PostService.updatePostById(id, title, description, cover_img, create_time)
      .then((res) => {
        console.log("update post res: ", res);
        window.alert("update post success.");
        window.location.reload();
      })
      .catch((err) => {
        console.warn("update post error: ", err);
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
          className="btn btn-primary"
          onClick={() => {
            console.log("this props post: ", props.post);
            setTitle(props.post.title);
            setDescription(props.post.description);
            setCoverImg(props.post.cover_img);
            setUpdateState(true);
          }}
        >
          編輯
        </button>

        <Modal show={updateState}>
          <Modal.Dialog>
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5">編輯消息</h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setUpdateState(false);
                  }}
                ></button>
              </div>
              <div class="modal-body">
                <img
                  className="mb-2"
                  src={coverImg}
                  alt="edit menu img"
                  style={{ maxHeight: "150px", maxWidth: "400px" }}
                />

                <div className="input-group mb-3">
                  <span class="input-group-text">標題</span>
                  <input
                    type="text"
                    class="form-control"
                    value={title}
                    onChange={handleInputTitle}
                    placeholder="請輸入消息標題"
                  />
                </div>
                <div className="input-group mb-3">
                  <span class="input-group-text">消息描述</span>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="請輸入消息描述"
                    value={description}
                    onChange={handleInputDescription}
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label for="formFile" class="form-label">
                    重新上傳消息封面
                  </label>
                  <input
                    class="form-control"
                    type="file"
                    id="formFile"
                    onChange={() => handleCoverImgFile}
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setUpdateState(false);
                  }}
                >
                  取消
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => handleEditPost(title, description, coverImg)}
                >
                  完成
                </button>
              </div>
            </div>
          </Modal.Dialog>
        </Modal>
      </div>
    </>
  );
};

export default EditPost;
