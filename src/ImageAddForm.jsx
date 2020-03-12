import React from 'react';
import { Form, Button, Select } from 'antd';

import Upload from './Upload.jsx';
import TagsInput from './TagsInput.jsx';

const { Option } = Select;

/**
 * props:
 *   groups [Array[String]]
 *   onSubmit [callback]
 */
export default function ImageAddForm({
  groups,
  onSubmit,
}) {
  const [form] = Form.useForm();
  
  const onFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.error(errorInfo);
  };

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
  };

  return (
    <Form
      form={form}
      {...layout}
      initialValues={{
        group: 'all',
        tags: [''],
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="图片"
        name="image"
        rules={[{ required: true, message: '必须选择一个图片' }]}
      >
        <Upload />
      </Form.Item>
      <Form.Item
        label="组"
        name="group"
        rules={[{ required: true, message: '必须选择一个组' }]}
      >
        <Select>
          {groups.map((g) => (
            <Option key={g} value={g}>{g}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="标签" name="tags">
        <TagsInput />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
}
