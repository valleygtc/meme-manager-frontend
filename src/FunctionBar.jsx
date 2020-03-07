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
 */
export default function FunctionBar({
  searchField,
  onImageAdd,
  onSearch,
}) {
  const WrappedAddForm = Form.create()(ImageAddForm);

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <SearchBar
        initialKey={searchField.key}
        initialValue={searchField.value}
        onSearch={onSearch}
      />
      <FormModalButton
        buttonItem={(<Button type="primary">添加</Button>)}
        title="添加图片"
        WrappedForm={WrappedAddForm}
        onSubmit={onImageAdd}
      />
    </div>
  );
}
