import React from "react";

const AddMenuCategory = () => {
  return (
    <div>
      <button
        className="btn btn-success mx-2"
        data-bs-toggle="modal"
        data-bs-target="#addmenuCategory"
      >
        新增分類
      </button>

      <div
        className="modal fade"
        id="addmenuCategory"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">
                新增餐點分類
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
                <span className="input-group-text" id="inputGroup-sizing-default">
                  分類名稱
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="請輸入分類名稱"
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
              <button type="button" className="btn btn-primary">
                完成
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMenuCategory;
