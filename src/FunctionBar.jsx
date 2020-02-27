import React from 'react';
import { Form, Button, Row, Col } from 'antd';

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
    <Row>
      <Col span={18}>
        <SearchBar
          initialKey={searchField.key}
          initialValue={searchField.value}
          onSearch={onSearch}
        />
      </Col>
      <Col span={6}>
        <FormModalButton
          buttonItem={(<Button type="primary">添加</Button>)}
          title="添加图片"
          WrappedForm={WrappedAddForm}
          onSubmit={onImageAdd}
        />
      </Col>
    </Row>
  );
}
