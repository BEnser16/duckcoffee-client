import React from "react";
import { useState } from "react";
import { PostService } from "../../service/PostService";
import { Modal } from "react-bootstrap";
import { UploadImageToServer } from "../../utils/UploadImgToServer";

const EditPost = (props) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [updateState, setUpdateState] = useState(false);
  const [coverImg, setCoverImg] = useState();
  const [imageUrl, setImageUrl] = useState(""); // 用於存儲圖片的URL

  async function handleEditPost(title, description, cover_img) {
    const now = new Date();
    const create_time = now.toISOString();
    const href = props.post._links.self.href;

    console.log("Update Post link:", href);
    if (!title || !description) {
      window.alert("請輸入標題和描述");
      return;
    }
    if(cover_img === null){
      window.alert("請上傳封面圖片");
      return;
    } else {
      const img_url = await UploadImageToServer(cover_img).catch((err) => {
        console.error("upload img to server error: ", err);
        return;
      });
      cover_img = img_url;
    }

    PostService.updatePost(href, title, description, cover_img, create_time)
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
    console.log("set post cover img_file: ", img_file);
    const url = URL.createObjectURL(img_file); // 使用URL.createObjectURL創建URL
    setImageUrl(url); // 將URL設置為state中的imageUrl
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
                {/* 顯示選擇的圖片 */}
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="new menu"
                    style={{ maxWidth: "100%", maxHeight: "300px" }}
                  />
                )}
                {!imageUrl && (
                  <img
                    className="mb-2"
                    src={coverImg}
                    alt="edit menu img"
                    style={{ maxHeight: "150px", maxWidth: "400px" }}
                  />
                )}

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
                    onChange={handleCoverImgFile}
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
