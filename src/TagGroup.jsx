import React from 'react';
import {
  Tag,
  Dropdown,
  Menu,
  Modal
} from 'antd';

const { confirm } = Modal;

/**
 * props:
 *   tags: [Array[String]]
 *   onTagDelete: [callback]
 */
export default function TagGroup({
  tags,
  onTagDelete,
}) {
  const showConfirm = (tag) => {
    confirm({
      title: '确定删除该标签？',
      content: '注意！标签删除后无法恢复！',
      onOk() {
        onTagDelete(tag);
      },
      onCancel() {},
    });
  }

  return (
    <div>
      {tags.map((t) => {
        return (
          <Dropdown
            key={t}
            overlay={
              <Menu>
                <Menu.Item>
                  <div onClick={() => showConfirm(t)}>
                    删除标签
                  </div>
                </Menu.Item>
              </Menu>
            }
            trigger={['contextMenu']}
            onContextMenu={(e) => e.stopPropagation()}
          >
            <Tag className="tag">{t}</Tag>
          </Dropdown>
        )})}
    </div>
  );
}
