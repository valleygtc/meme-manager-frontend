import React, { useState } from 'react';
import { Modal } from 'antd';


/**
 * props:
 *   buttonItem [Object]
 *   title [String]: 弹出的 Modal 的 title
 *   wrappedForm [Object]
 *   onSubmit [callback]
 */
export default function FormModalButton({
  buttonItem,
  title,
  wrappedForm,
  onSubmit,
}) {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    console.log('click FormModalButton Button')
    setVisible(true);
  };

  const handleSubmit = (values) => {
    setVisible(false);
    onSubmit(values);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <buttonItem.type {...buttonItem.props} onClick={showModal} />
      <Modal
        forceRender
        title={title}
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <wrappedForm.type {...wrappedForm.props} onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
}
