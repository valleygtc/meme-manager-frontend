import React, { useState } from 'react';
import {
  Modal,
  Button,
  Input,
  Popconfirm,
} from 'antd';


/**
 * props:
 *   groups [Array[String]]
 *   onGroupDelete [callback]
 */
export default function GroupUpdateModalButton({
  groups,
  onGroupDelete,
}) {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  // TODO：因为本组件在 GroupSelect 组件中是通过 Select 的 dropdownRender 渲染的。所以 group 变化只能传到 GroupSelect 组件，传不到本组件，直至关闭重新打开 Modal 才能触发重新渲染。
  // 目前暂时就再删除后强制关闭 Modal。
  // 以后尝试一下能不能用 Redux 来做，这样就走 Redux 的更新机制了。
  const handleGroupDelete = (name) => {
    setVisible(false);
    onGroupDelete(name);
  }

  return (
    <div>
      <Button size={'small'} onClick={showModal}>编辑</Button>
      <Modal
        title="编辑组"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <UpdateBoard
          groups={groups}
          onGroupDelete={handleGroupDelete}
        />
      </Modal>
    </div>
  );
}


/**
 * props:
 *   groups [Array[String]]
 *   onGroupDelete [callback]
 */
function UpdateBoard({
  groups,
  onGroupDelete,
}) {
  return (
    <div>
      {groups.map((g) => (
        <div
          style={{
            display: 'flex',
            margin: '10px',
          }}
          key={g}
        >
          <Input
            style={{
              width: '50%',
            }}
            value={g}
            disabled
          />
          {g !== 'all' &&
            <>
            <Button
              style={{
                marginLeft: '20px',
              }}
              size="small"
            >重命名</Button>
            <Popconfirm
              title={`确定删除组：${g}？注意，所有组内图片也会一并删除。`}
              onConfirm={() => onGroupDelete(g)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                style={{
                  marginLeft: '20px',
                }}
                size="small"
                type="danger"
              >删除</Button>
            </Popconfirm>
            </>
          }
        </div>
      ))}
    </div>
  );
}
