import React, { useState, useEffect } from 'react';
import { Form, message } from 'antd';

import ImageWall from './ImageWall.jsx';
import AddButtonModal from './AddButtonModal.jsx';
import ImageAddForm from './ImageAddForm.jsx';

import { get, postForm } from './utils';
import config from './config';

const { BACKEND_PREFIX } = config;


export default function App() {
  const [ imageMetaDatas, setImageMetaDatas ] = useState([]);

  const refresh = async () => {
    console.log('App: handle refresh');
    const resp = await get(`${BACKEND_PREFIX}/images/`);
    if (resp.status !== 200) {
      message.error('网络异常，刷新失败');
      console.error('Error: %o', { resp });
      return ;
    }

    const respJSON = await resp.json();
    console.log('App: receive data: %o', { respJSON })
    setImageMetaDatas(respJSON.data)
    return ;
  }

  // 仅在组件挂载时执行
  useEffect(() => {
    refresh();
  }, [])

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

  const WrappedAddForm = Form.create()(ImageAddForm);
  return (
    <div>
      <AddButtonModal
        title="添加图片"
        WrappedForm={WrappedAddForm}
        onSubmit={handleImageAdd}
      />
      <ImageWall imageMetaDatas={imageMetaDatas} />
    </div>
  );
}
