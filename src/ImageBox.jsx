import React from 'react';
import {
  Dropdown,
  Menu,
  Modal,
  Form,
} from 'antd'

import TagGroup from './TagGroup.jsx';
import TagsAddForm from './TagsAddForm.jsx';
import config from './config';
import FormModalButton from './FormModalButton.jsx';
import ImageMoveModalButton from './ImageMoveModalButton.jsx';

const { confirm } = Modal;
const { BACKEND_PREFIX } = config;


/**
 * props:
 *   metadata [Object]: {
 *     "id": [Number],
 *     "img_type": [String],
 *     "tags": [Array[String]],
 *     "group": [String],
 *     "create_at": [String],
 *   }
 *   groups [Array[String]]
 *   onImageDelete [callback]
 *   onImageMove [callback]
 *   onTagsAdd [callback]
 *   onTagDelete [callback]
 */
export default function ImageBox({
  metadata,
  groups,
  onImageDelete,
  onImageMove,
  onTagsAdd,
  onTagDelete,
}){
  const imgSrc = `${BACKEND_PREFIX}/api/images/?id=${metadata['id']}`

  const showImage = () => {
    window.open(imgSrc);
  }

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
        <div onClick={showImage}>
          查看图片
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
      <Menu.Item>
        <ImageMoveModalButton
          groups={groups}
          group={metadata['group'] || 'all'}
          onImageMove={(group) => onImageMove(metadata['id'], group)}
        />
      </Menu.Item>
      <Menu.Item>
        <div onClick={showConfirm}>
          删除图片
        </div>
      </Menu.Item>
    </Menu>
  );
  
  return (
    <Dropdown overlay={menu} trigger={['contextMenu']}>
      <div
        className='imageBox'
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            width: '250px',
            height: '250px',
            overflow: 'hidden',
          }}
        >
          <img
            style={{
              maxWidth: '100%',
              margin: 'auto',
            }}
            src={imgSrc}
            alt={`img-${metadata['id']}`}
          />
        </div>
        <div
          style={{
            width: '250px',
            minHeight: '50px',
            overflow: 'hidden',
          }}
        >
          <TagGroup tags={metadata['tags']} onTagDelete={(tag) => onTagDelete(metadata['id'], tag)} />
        </div>
      </div>
    </Dropdown>
  );
}
