import React from 'react';
import {
  Card,
  Dropdown,
  Menu,
  Modal,
  Form,
} from 'antd'

import TagGroup from './TagGroup.jsx';
import TagsAddForm from './TagsAddForm.jsx';
import config from './config';
import AddButtonModal from './AddButtonModal.jsx';

const { confirm } = Modal;
const { BACKEND_PREFIX } = config;
const { Meta } = Card;


/**
 * props:
 *   metadata [Object]: {
 *     "id": [Number],
 *     "img_type": [String],
 *     "tags": [Array[String]],
 *     "create_at": [String],
 *   }
 *   onImageDelete [callback]
 *   onTagsAdd [callback]
 */
export default function ImageBox({
  metadata,
  onImageDelete,
  onTagsAdd,
}){
  const showConfirm = () => {
    confirm({
      title: '确定删除该图片？',
      content: '注意！图片删除后无法恢复！',
      onOk() {
        onImageDelete(metadata['id']);
      },
      onCancel() {},
    });
  }

  const WrappedTagsAddForm = Form.create()(TagsAddForm);

  const menu = (
    <Menu>
      <Menu.Item>
        <div onClick={showConfirm}>
          删除图片
        </div>
      </Menu.Item>
      <Menu.Item>
        <AddButtonModal
          title="添加标签"
          WrappedForm={WrappedTagsAddForm}
          onSubmit={(tags) => onTagsAdd(metadata['id'], tags)}
        />
      </Menu.Item>
    </Menu>
  );
  
  return (
    <Dropdown overlay={menu} trigger={['contextMenu']}>
      <Card
        style={{ width: 240 }}
        cover={
          <img
            src={`${BACKEND_PREFIX}/images?id=${metadata['id']}`}
            alt={`img-${metadata['id']}`}
          />
        }
      >
        <Meta description={<TagGroup tags={metadata['tags']}/>}/>
      </Card>
    </Dropdown>
  );
}
