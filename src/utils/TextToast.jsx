import React from 'react'


const TextToast = (props) => {

   

  return (
    <div>
        {props.show &&
            <div class="toast show"  role="alert" aria-live="assertive" aria-atomic="true" >
            <div class="toast-header">
              <strong class="me-auto">通知</strong>
              <small class="text-body-secondary">11 mins ago</small>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></button>
            </div>
            <div class="toast-body">{props.message}</div>
          </div>

        }
        
    </div>
  )
}

export default TextToast