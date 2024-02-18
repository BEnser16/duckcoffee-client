import React from 'react'
import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap';

const MakeSureModal = (props) => {
    let title = props.title;
    let content = props.content;
    let onConfirm = props.onConfirm;
    let setShowMakesure = props.setShowMakesure;
    let showMakesure = props.showMakesure;  

  return (
    <>
        <Modal show={showMakesure} onHide={() => {
          setShowMakesure(false);
        }}
        centered >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {content}
            </Modal.Body>
            <Modal.Footer>
            <Button
            variant="secondary"
            onClick={() => {
                setShowMakesure(false);
            }}
          >
            取消
          </Button>
          <Button
            variant="primary"
            onClick={() => {
                setShowMakesure(false);
                onConfirm();
           }}
          >
            確定
          </Button>
            </Modal.Footer>
            
        </Modal>
    </>
  )
}

export default MakeSureModal