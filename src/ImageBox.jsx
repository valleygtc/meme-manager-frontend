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
import FormModalButton from './FormModalButton.jsx';

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
 *   onTagDelete [callback]
 */
export default function ImageBox({
  metadata,
  onImageDelete,
  onTagsAdd,
  onTagDelete,
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
        <FormModalButton
          buttonItem={<div>添加标签</div>}
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
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            src={`${BACKEND_PREFIX}/api/images/?id=${metadata['id']}`}
            alt={`img-${metadata['id']}`}
          />
        }
      >
        <Meta description={<TagGroup tags={metadata['tags']} onTagDelete={(tag) => onTagDelete(metadata['id'], tag)} />}/>
      </Card>
    </Dropdown>
  );
}
