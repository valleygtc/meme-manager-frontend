import React, { useState } from 'react';
import { Modal } from 'antd';

import ImageMoveForm from './ImageMoveForm.jsx';

/**
 * props:
 *   groups [Array[String]]
 *   group [String]
 *   onImageMove [callback]
 */
export default function ImageMoveModalButton({
  groups,
  group,
  onImageMove,
}) {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleImageMove = (group) => {
    setVisible(false);
    onImageMove(group);
  }

  return (
    <div>
      <div onClick={showModal}>移至组</div>
      <Modal
        title="移至组"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <ImageMoveForm
          groups={groups}
          group={group}
          onSubmit={handleImageMove}
        />
      </Modal>
    </div>
  );
}
