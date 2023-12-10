import React from "react";

const AddMenuItem = () => {
  return (
    <div>
        <button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#addmenuItem" >新增品項</button>

      <div className="modal fade"  id="addmenuItem" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                新增餐點品項
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">

            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                取消
              </button>
              <button type="button" class="btn btn-primary">
                完成
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMenuItem;
