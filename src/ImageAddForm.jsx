import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Select } from 'antd';

import Upload from './Upload.jsx';
import TagsInput from './TagsInput.jsx';

const { Option } = Select;

/**
 * props:
 *   form: Form.create包装自带的form。
 *   groups [Array[String]]
 *   onSubmit [callback]
 */
export default function ImageAddForm({
  form,
  groups,
  onSubmit,
}) {
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (err) {
        console.error(err);
      } else {
          onSubmit(values);
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
      <Form.Item label="图片">
        {form.getFieldDecorator('image', {
          rules: [{ required: true, message: '必须选择一个图片' }]
        })(
          <Upload />
        )}
      </Form.Item>
      <Form.Item label="组">
        {form.getFieldDecorator('group', {
          initialValue: 'all',
          rules: [{ required: true, message: '必须选择一个组' }],
        })(
          <Select>
            {groups.map((g) => (
              <Option key={g} value={g}>{g}</Option>
            ))}
          </Select>
        )}
      </Form.Item>
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
