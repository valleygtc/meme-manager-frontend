import React from 'react';
import { Form, Button, Input } from 'antd';


/**
 * props:
 *   onSubmit [callback]
 */
export default function GroupAddForm({
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
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="组名"
        name="name"
        rules={[{ required: true, message: '必须输入组名' }]}
      >
        <Input placeholder="Group"/>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
}
