import React from 'react'


const TextToast = (props) => {

   

  return (
    <div>
        {props.show &&
            <div className="toast show"  role="alert" aria-live="assertive" aria-atomic="true" >
            <div className="toast-header">
              <strong className="me-auto">通知</strong>
              <small className="text-body-secondary">11 mins ago</small>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></button>
            </div>
            <div className="toast-body">{props.message}</div>
          </div>

        }
        
    </div>
  )
}

export default TextToast