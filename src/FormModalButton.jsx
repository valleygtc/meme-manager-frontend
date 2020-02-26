import React, { useState } from 'react';
import { Modal } from 'antd';


/**
 * props:
 *   buttonItem [Object]
 *   title [String]: 弹出的 Modal 的 title
 *   WrappedForm [Object]
 *   onSubmit [callback]
 */
export default function FormModalButton({
  buttonItem,
  title,
  WrappedForm,
  onSubmit,
}) {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
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
        title={title}
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <WrappedForm onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
}
