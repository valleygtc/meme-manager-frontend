import React, { useState, useEffect } from 'react';
import { message, Pagination } from 'antd';

import FunctionBar from './FunctionBar.jsx';
import ImageWall from './ImageWall.jsx';
import Footer from './Footer.jsx';

import { get, postForm, post } from './utils';
import config from './config';

const { BACKEND_PREFIX } = config;


export default function App() {
  /**
   * {
   *   id: [Number],
   *   img_type: [String],
   *   tags: [Array[String]],
   *   group: [String],
   *   create_at: [String],
   * }
   */
  const [ imageMetaDatas, setImageMetaDatas ] = useState([]);
  const [ pagination, setPagination ] = useState({
    current: 1,
    pageSize: 20,
    total: null,
  });
  // range: 'all' or 'group'
  const [ searchInfo, setSearchInfo ] = useState({
    range: 'all',
    tag: '',
  });
  const [ groups, setGroups ] = useState(['all']);
  const [ currentGroup, setCurrentGroup ] = useState('all');

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
    current,
    pageSize,
    searchTag,
    group,
  ) => {
    const params = {
      page: current,
      per_page: pageSize,
      tag: searchTag,
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

  const refreshGroups = async () => {
    console.log('App: refreshGroups');
    // fetch group
    let groups;
    try {
      groups = await fetchGroups();
    } catch (e) {
      message.error('网络异常，刷新失败');
      return
    }
    setGroups(['all', ...groups]);
  }

  const refreshImages = async () => {
    console.log('App: refreshImageMetaDatas');
    // fetch images
    let imagesJSON;
    try {
      imagesJSON = await fetchImages(pagination.current, pagination.pageSize, searchInfo.tag, currentGroup);
    } catch (e) {
      message.error('网络异常，刷新失败');
      return
    }
    setImageMetaDatas(imagesJSON.data);
    setPagination({
      ...pagination,
      total: imagesJSON['pagination']['total'],
    });
    return
  }

  useEffect(() => {
    refreshGroups();
    refreshImages();
  }, []);

  const handleCurrentPageChange = async (page) => {
    // fetch images
    let imagesJSON;
    try {
      imagesJSON = await fetchImages(page, pagination.pageSize, searchInfo.tag, currentGroup);
    } catch (e) {
      message.error('网络异常，刷新失败');
      return
    }
    setImageMetaDatas(imagesJSON.data);
    setPagination({
      ...pagination,
      current: page,
    });
    return ;
  }

  const handlePageSizeChange = async (pageSize) => {
    // fetch images
    let imagesJSON;
    try {
      imagesJSON = await fetchImages(1, pageSize, searchInfo.tag, currentGroup);
    } catch (e) {
      message.error('网络异常，刷新失败');
      return
    }
    setImageMetaDatas(imagesJSON.data);
    setPagination({
      ...pagination,
      current: 1,
      pageSize,
    });
    return ;
  }

  const handleGroupSelect = async (group) => {
    setCurrentGroup(group);
    // fetch images
    let imagesJSON;
    try {
      imagesJSON = await fetchImages(1, pagination.pageSize, searchInfo.tag, group);
    } catch (e) {
      message.error('网络异常，刷新失败');
      return
    }
    setImageMetaDatas(imagesJSON.data);
    setPagination({
      ...pagination,
      current: 1,
      total: imagesJSON.pagination.total,
    });
    return
  }

  const handleGroupAdd = async (values) => {
    console.log('App handleGroupAdd: %o', { values });
    const name = values['name'];

    if (groups.includes(name)) {
      message.warn(`新建组失败：“${name}”组已存在`);
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

    message.success(`成功新建组“${name}”`);
    console.log('Success: %o', { resp });
    refreshGroups();
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

    message.success(`成功删除组“${name}”`);
    console.log('Success: %o', { resp });
    refreshGroups();
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

    message.success(`成功重命名组“${old}”为“${new_}”`);
    console.log('Success: %o', { resp });
    refreshGroups();
    return ;
  }

  const handleSearch = async (range, tag) => {
    setSearchInfo({
      range,
      tag,
    });

    const group = range === 'all' ? 'all' : currentGroup;

    // fetch images
    let imagesJSON;
    try {
      imagesJSON = await fetchImages(1, pagination.pageSize, tag, group);
    } catch (e) {
      message.error('网络异常，刷新失败');
      return
    }
    setImageMetaDatas(imagesJSON.data);
    setPagination({
      ...pagination,
      current: 1,
      total: imagesJSON.pagination.total,
    });
    return
  }

  const handleReset = async () => {
    const range = 'all';
    const tag = '';
    setSearchInfo({
      range,
      tag,
    });

    // fetch images
    let imagesJSON;
    try {
      imagesJSON = await fetchImages(1, pagination.pageSize, tag, currentGroup);
    } catch (e) {
      message.error('网络异常，刷新失败');
      return
    }
    setImageMetaDatas(imagesJSON.data);
    setPagination({
      ...pagination,
      current: 1,
      total: imagesJSON.pagination.total,
    });
    return
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
        group: values['group'] === 'all' ? null : values['group'],
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
    refreshImages();
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
    // fetch images
    // 如果删除的是最后一页的最后一张图片，需要将分页 current 设置为前一页。
    const { current, pageSize, total } = pagination;
    let page = (total % pageSize === 1 && current !== 1) ? current - 1 : current
    let imagesJSON;
    try {
      imagesJSON = await fetchImages(page, pageSize, searchInfo.tag, currentGroup);
    } catch (e) {
      message.error('网络异常，刷新失败');
      return
    }
    setImageMetaDatas(imagesJSON.data);
    setPagination({
      ...pagination,
      current: page,
      total: imagesJSON.pagination.total,
    });
  }

  const handleImageMove = async (imageId, group) => {
    console.log('App handleImageMoveTo: %o', { imageId, group });
    const body = {
      id: imageId,
      group: group === 'all' ? null : group,
    }
    const resp = await post(`${BACKEND_PREFIX}/api/images/update`, body);
    if (resp.status !== 200) {
      message.error('网络异常，移动图片失败');
      console.error('Error: %o', { resp });
      return ;
    }

    message.success(`成功移动图片至组“${group}”`);
    console.log('Success: %o', { resp });
    refreshImages();
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
    refreshImages();
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
    refreshImages();
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
            marginTop: '10px',
            marginBottom: '10px',
          }}
        >
          <FunctionBar
            groups={groups}
            currentGroup={currentGroup}
            searchInfo={searchInfo}
            onGroupSelect={handleGroupSelect}
            onGroupAdd={handleGroupAdd}
            onGroupDelete={handleGroupDelete}
            onGroupRename={handleGroupRename}
            onImageAdd={handleImageAdd}
            onSearch={handleSearch}
            onReset={handleReset}
          />
        </div>
        <ImageWall
          imageMetaDatas={imageMetaDatas}
          groups={groups}
          onImageDelete={handleImageDelete}
          onImageMove={handleImageMove}
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
            onChange={(page, pageSize) => handleCurrentPageChange(page)}
            onShowSizeChange={(current, size) => handlePageSizeChange(size)}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
