import React from 'react';
import { Form, Button } from 'antd';

import ImageAddForm from './ImageAddForm.jsx';
import FormModalButton from './FormModalButton.jsx';
import SearchBar from './SearchBar.jsx';
import GroupSelect from './GroupSelect';
import Group from 'antd/lib/input/Group';


/**
 * props:
 *   searchField [Object]: {key: , value: }
 *   onImageAdd [callback]
 *   onSearch [callback]
 *   onReset [callback]
 */
export default function FunctionBar({
  searchField,
  onImageAdd,
  onSearch,
  onReset,
}) {
  const WrappedAddForm = Form.create()(ImageAddForm);

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <div>
        组：
        <GroupSelect groups={['全部', 'Group1', 'Group2']} value={'全部'}/>
      </div>
      <div
        style={{
          flexGrow: '1',
          marginLeft: '100px',
        }}
      >
        <SearchBar
          initialKey={searchField.key}
          initialValue={searchField.value}
          onSearch={onSearch}
          onReset={onReset}
        />
      </div>
      <div
        style={{
          marginLeft: '100px',
        }}
      >
        <FormModalButton
          buttonItem={(<Button type="primary">添加</Button>)}
          title="添加图片"
          WrappedForm={WrappedAddForm}
          onSubmit={onImageAdd}
        />
      </div>
    </div>
  );
}
