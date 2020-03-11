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
 *   onGroupRename [callback]
 */
export default function GroupEditModalButton({
  groups,
  onGroupDelete,
  onGroupRename,
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

  const handleGroupRename = (old, new_) => {
    setVisible(false);
    onGroupRename(old, new_);
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
        <EditBoard
          groups={groups}
          onGroupDelete={handleGroupDelete}
          onGroupRename={handleGroupRename}
        />
      </Modal>
    </div>
  );
}


/**
 * props:
 *   groups [Array[String]]
 *   onGroupDelete [callback]
 *   onGroupRename [callback]
 */
function EditBoard({
  groups,
  onGroupDelete,
  onGroupRename,
}) {
  // {oldName: newName, ...}
  const [renamingGroups, setrenamingGroups] = useState({});

  const handleRenameCancle = (group) => {
    let newRenamings = {...renamingGroups}
    delete newRenamings[group]
    setrenamingGroups(newRenamings);
  }

  const handleNameChange = (old, new_) => {
    setrenamingGroups({
      ...renamingGroups,
      [old]: new_,
    });
  }

  // TODO：如果不加这个最外层的 div stopPropagation，表单里的 Input 就点不了。应该是外层 ononMouseDown 捕获后 e.preventDefault 的原因。
  // antd 4.x 就没有这个问题了。等升级 4.x 后修改这里的实现。
  return (
    <div onMouseDown={(e) => e.stopPropagation()}>
      {groups.map((g) => (
        <div
          style={{
            display: 'flex',
            margin: '10px',
          }}
          key={g}
        >
          {Object.keys(renamingGroups).includes(g) ?
          <Input
            style={{
              width: '50%',
            }}
            value={renamingGroups[g]}
            onChange={(e) => handleNameChange(g, e.target.value)}
          /> :
          <Input
            style={{
              width: '50%',
            }}
            value={g}
            disabled
          />
          }
          {g !== 'all' && !Object.keys(renamingGroups).includes(g) &&
            <>
            <Button
              style={{
                marginLeft: '20px',
              }}
              onClick={() => setrenamingGroups({...renamingGroups, [g]: g})}
            >重命名</Button>
            <Popconfirm
              title={`确定删除组“${g}”？注意，所有组内图片也会一并删除。`}
              onConfirm={() => onGroupDelete(g)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                style={{
                  marginLeft: '20px',
                }}
                type="danger"
              >删除</Button>
            </Popconfirm>
            </>
          }
          {
            g !== 'all' && Object.keys(renamingGroups).includes(g) &&
            <>
            <Button icon="check" onClick={() => onGroupRename(g, renamingGroups[g])} />
            <Button icon="close" onClick={() => handleRenameCancle(g)}/>
            </>
          }
        </div>
      ))}
    </div>
  );
}
