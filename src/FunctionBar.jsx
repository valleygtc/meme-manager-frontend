import React from 'react';
import { Form, Button } from 'antd';

import ImageAddForm from './ImageAddForm.jsx';
import FormModalButton from './FormModalButton.jsx';
import SearchBar from './SearchBar.jsx';


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
      <div
        style={{
          flexGrow: '1',
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
