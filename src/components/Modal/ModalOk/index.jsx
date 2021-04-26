import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useSelector } from 'react-redux';

const ModalOk = (props) => {
  const modalOk = useSelector((state) => state.app.modalOk || {});
  const [isShowDialog, setIsShowDialog] = useState(false);

  useEffect(() => {
    if (modalOk.title || modalOk.content) {
      setIsShowDialog(true);
    }
  }, [modalOk]);

  const toggle = () => setIsShowDialog(!isShowDialog);

  return (
    <div>
      <Modal
        isOpen={isShowDialog}
        toggle={toggle}
        style={{ paddingRight: '0px' }}>
        <ModalHeader toggle={toggle}>{modalOk.title}</ModalHeader>
        <ModalBody>{modalOk.content}</ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={toggle}>
            OK
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalOk;
