import React from 'react';
import { Form, Button } from 'antd';

import TagsInput from './TagsInput.jsx';


/**
 * props:
 *   onSubmit [callback]
 */
export default function TagsAddForm({
  onSubmit,
}) {
  // FIXME: 这里 form.resetFields 无效。照文档里要求的给 Modal 加上 forceRender 也没用。甚至给 Dropdown 加上 forceRender 也没用。控制台会报错。
  // const [form] = Form.useForm();

  const onFinish = (values) => {
    onSubmit(values['tags']);
    // form.resetFields();
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.error('Failed:', errorInfo);
  };

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
  };

  return (
    <Form
      {...layout}
      initialValues={{
        tags: [''],
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
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
