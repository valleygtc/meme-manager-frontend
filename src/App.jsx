import React from 'react';
import { Form } from 'antd';

import ImageWall from './ImageWall.jsx';
import AddButtonModal from './AddButtonModal.jsx';
import ImageAddForm from './ImageAddForm.jsx';


export default function App() {
  const WrappedAddForm = Form.create()(ImageAddForm);
  return (
    <div>
      <AddButtonModal
        title="添加图片"
        WrappedForm={WrappedAddForm}
      />
      <ImageWall />
    </div>
  );
}
