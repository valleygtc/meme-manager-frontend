import React, { useState } from 'react';
import { Button, Modal } from 'antd';


/**
 * props:
 *   title [String]: 弹出的 Modal 的 title
 *   WrappedForm [Object]
 */
export default function AddButtonModal({
    title,
    WrappedForm,
}) {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleSubmit = (values) => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>添加</Button>
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
