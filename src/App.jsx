import React, { useState, useEffect } from 'react';
import { Form, message, Button, Pagination } from 'antd';

import ImageWall from './ImageWall.jsx';
import ImageAddForm from './ImageAddForm.jsx';
import FormModalButton from './FormModalButton.jsx';

import { get, postForm, post } from './utils';
import config from './config';

const { BACKEND_PREFIX } = config;


export default function App() {
  const [ imageMetaDatas, setImageMetaDatas ] = useState([]);
  const [ pagination, setPagination ] = useState({
    current: 1,
    pageSize: 2,
    total: null,
  });

  const refresh = async () => {
    console.log('App: handle refresh');
    const resp = await get(`${BACKEND_PREFIX}/images/`, {
      page: pagination.current,
      per_page: pagination.pageSize,
    });
    if (resp.status !== 200) {
      message.error('网络异常，刷新失败');
      console.error('Error: %o', { resp });
      return ;
    }

    const respJSON = await resp.json();
    console.log('App: receive resp: %o', { respJSON });
    setImageMetaDatas(respJSON.data);
    setPagination({
      ...pagination,
      current: respJSON['pagination']['page'],
      pageSize: respJSON['pagination']['per_page'],
      total: respJSON['pagination']['total'],
    });
    return ;
  }

  useEffect(() => {
    refresh();
  }, [pagination.current, pagination.pageSize])

  const handleImageAdd = async (values) => {
    console.log('App handleImageAdd: %o', { values });
    const image = values['image'];
    const imageType = image.type.split('/')[1];
    const body = {
      image: image,
      metadata: JSON.stringify({
        img_type: imageType,
        tags: values['tags'],
      })
    }
    console.log('App post body: %o', body);
    const resp = await postForm(`${BACKEND_PREFIX}/images/add`, body);
    if (resp.status !== 200) {
      message.error('网络异常，添加图片失败');
      console.error('Error: %o', { resp });
      return ;
    }

    message.success('添加图片成功');
    console.log('Success: %o', { resp });
    refresh();
    return ;
  }

  const handleImageDelete = async (id) => {
    console.log('App handleImageDelete: %o', { id });
    const resp = await get(`${BACKEND_PREFIX}/images/delete`, { id });
    if (resp.status !== 200) {
      message.error('网络异常，删除图片失败');
      console.error('Error: %o', { resp });
      return ;
    }

    message.success('删除图片成功');
    console.log('Success: %o', { resp });
    refresh();
    return ;
  }

  const handleTagsAdd = async (imageId, tags) => {
    console.log('App handleTagsAdd: %o', { imageId, tags });
    const body = {
      image_id: imageId,
      tags,
    }
    console.log('App POST body: %o', body)
    const resp = await post(`${BACKEND_PREFIX}/tags/add`, body);
    if (resp.status !== 200) {
      message.error('网络异常，添加标签失败');
      console.error('Error: %o', { resp });
      return ;
    }

    message.success('添加标签成功');
    console.log('Success: %o', { resp });
    refresh();
    return ;
  }

  const handleTagDelete = async (imageId, tag) => {
    console.log('App handleTagDelete: %o', { imageId, tag });
    const body = {
      image_id: imageId,
      tag,
    }
    console.log('App POST body: %o', body)
    const resp = await post(`${BACKEND_PREFIX}/tags/delete`, body);
    if (resp.status !== 200) {
      message.error('网络异常，删除标签失败');
      console.error('Error: %o', { resp });
      return ;
    }

    message.success('删除标签成功');
    console.log('Success: %o', { resp });
    refresh();
    return ;
  }

  const WrappedAddForm = Form.create()(ImageAddForm);
  return (
    <div>
      <FormModalButton
        buttonItem={(<Button type="primary">添加</Button>)}
        title="添加图片"
        WrappedForm={WrappedAddForm}
        onSubmit={handleImageAdd}
      />
      <ImageWall
        imageMetaDatas={imageMetaDatas}
        onImageDelete={handleImageDelete}
        onTagsAdd={handleTagsAdd}
        onTagDelete={handleTagDelete}
      />
      <Pagination
        {...pagination}
        showSizeChanger
        pageSizeOptions={[20, 50, 100, 200]}
        onChange={(page, pageSize) => setPagination({
          ...pagination,
          current: page,
          pageSize,
        })}
        onShowSizeChange={(current, size) => setPagination({
          ...pagination,
          current,
          pageSize: size,
        })}
      />
    </div>
  );
}
