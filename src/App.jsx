import React, { useState, useEffect } from 'react';
import { message, Pagination } from 'antd';

import FunctionBar from './FunctionBar.jsx';
import ImageWall from './ImageWall.jsx';
import Footer from './Footer.jsx';

import { get, postForm, post } from './utils';
import config from './config';

const { BACKEND_PREFIX } = config;


export default function App() {
  const [ imageMetaDatas, setImageMetaDatas ] = useState([]);
  const [ pagination, setPagination ] = useState({
    current: 1,
    pageSize: 20,
    total: null,
  });
  const [ searchField, setSearchField ] = useState({
    key: 'tag',
    value: '',
  });
  const [ groups, setGroups ] = useState(['all']);
  const [ group, setGroup ] = useState('all');

  const fetchGroups = async () => {
    const resp = await get(`${BACKEND_PREFIX}/api/groups/`);
    if (resp.status !== 200) {
      console.error('Error: %o', { resp });
      throw new Error('resp status !== 200')
    }

    const respJSON = await resp.json();
    console.log('App fetch group: receive resp: %o', { respJSON });
    return respJSON.data;
  }

  const fetchImages = async (
    pagination,
    searchField,
    group,
  ) => {
    const params = {
      page: pagination.current,
      per_page: pagination.pageSize,
      [searchField.key]: searchField.value,
      group: group === 'all' ? '' : group,
    }
    const resp = await get(`${BACKEND_PREFIX}/api/images/`, params);
    if (resp.status !== 200) {
      console.error('Error: %o', { resp });
      throw new Error('resp status !== 200')
    }

    const respJSON = await resp.json();
    console.log('App fetch imageMetaDatas: receive resp: %o', { respJSON });
    return respJSON;
  }

  const refresh = async () => {
    console.log('App: handle refresh');
    // fetch group
    let groups;
    try {
      groups = await fetchGroups();
    } catch (e) {
      message.error('网络异常，刷新失败');
      return
    }
    setGroups(['all', ...groups]);

    // fetch images
    let imagesJSON;
    try {
      imagesJSON = await fetchImages(pagination, searchField, group);
    } catch (e) {
      message.error('网络异常，刷新失败');
      return
    }
    setImageMetaDatas(imagesJSON.data);
    setPagination({
      ...pagination,
      current: imagesJSON['pagination']['page'],
      pageSize: imagesJSON['pagination']['per_page'],
      total: imagesJSON['pagination']['total'],
    });
    return ;
  }

  useEffect(() => {
    refresh();
  }, [pagination.current, pagination.pageSize, searchField, group])

  const handleGroupAdd = async (values) => {
    console.log('App handleGroupAdd: %o', { values });
    const name = values['name'];

    if (groups.includes(name)) {
      message.warn(`新建组失败：${name}组已存在`);
      return
    }

    const body = {
      name,
    }
    console.log('App POST body: %o', body)
    const resp = await post(`${BACKEND_PREFIX}/api/groups/add`, body);
    if (resp.status !== 200) {
      message.error('网络异常，新建组失败');
      console.error('Error: %o', { resp });
      return ;
    }

    message.success('新建组成功');
    console.log('Success: %o', { resp });
    refresh();
    return ;
  }

  const handleGroupDelete = async (name) => {
    console.log('App handleGroupAdd: %o', { name });
    const body = {
      name,
    }
    console.log('App POST body: %o', body)
    const resp = await post(`${BACKEND_PREFIX}/api/groups/delete`, body);
    if (resp.status !== 200) {
      message.error('网络异常，删除组失败');
      console.error('Error: %o', { resp });
      return ;
    }

    message.success('删除组成功');
    console.log('Success: %o', { resp });
    refresh();
    return ;
  }

  const handleGroupRename = async (old, new_) => {
    console.log('App handleGroupRename: %o', { old, new_ });
    const body = {
      name: old,
      new_name: new_,
    }
    console.log('App POST body: %o', body)
    const resp = await post(`${BACKEND_PREFIX}/api/groups/update`, body);
    if (resp.status !== 200) {
      message.error('网络异常，重命名组失败');
      console.error('Error: %o', { resp });
      return ;
    }

    message.success('重命名组成功');
    console.log('Success: %o', { resp });
    refresh();
    return ;
  }

  const handleSearch = (key, value) => {
    setPagination({
      ...pagination,
      current: 1,
    });
    setSearchField({
      key,
      value,
    });
  }

  const handleReset = () => {
    setSearchField({
      ...searchField,
      value: '',
    });
    setPagination({
      ...pagination,
      current: 1,
    });
  }

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
    const resp = await postForm(`${BACKEND_PREFIX}/api/images/add`, body);
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
    const resp = await get(`${BACKEND_PREFIX}/api/images/delete`, { id });
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
    const resp = await post(`${BACKEND_PREFIX}/api/tags/add`, body);
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
    const resp = await post(`${BACKEND_PREFIX}/api/tags/delete`, body);
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
  
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#eeeeee',
      }}
    >
      <div
        style={{
          flexGrow: '1',
          maxWidth: '1010px',
        }}
      >
        <div
          style={{
            marginBottom: '10px',
          }}
        >
          <FunctionBar
            groups={groups}
            group={group}
            searchField={searchField}
            onGroupSelect={setGroup}
            onGroupAdd={handleGroupAdd}
            onImageAdd={handleImageAdd}
            onSearch={handleSearch}
            onReset={handleReset}
          />
        </div>
        <ImageWall
          imageMetaDatas={imageMetaDatas}
          onImageDelete={handleImageDelete}
          onTagsAdd={handleTagsAdd}
          onTagDelete={handleTagDelete}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
            marginBottom: '20px',
          }}
        >
          <Pagination
            {...pagination}
            showSizeChanger
            pageSizeOptions={['20', '50', '100', '200']}
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
      </div>
      <Footer />
    </div>
  );
}
