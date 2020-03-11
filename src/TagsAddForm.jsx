import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button } from 'antd';

import TagsInput from './TagsInput.jsx';


/**
 * props:
 *   form: Form.create包装自带的form。
 *   onSubmit [callback]
 */
export default function TagsAddForm({
  form,
  onSubmit,
}) {
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (err) {
        console.error(err);
      } else {
          onSubmit(values['tags']);
          form.resetFields();
      }
    });
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 22, offset: 4 },
    },
  };

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <Form.Item label="标签">
        {form.getFieldDecorator('tags', {
          initialValue: [''],
        })(
          <TagsInput />
        )}
      </Form.Item>
      <Form.Item {...formItemLayoutWithOutLabel}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
}
