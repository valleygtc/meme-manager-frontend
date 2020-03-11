import React from 'react';
import { Form, Button, Select } from 'antd';

const { Option } = Select;


/**
 * props:
 *   groups [Array[String]]
 *   group [String]
 *   onSubmit [callback]
 */
export default function ImageMoveForm({
    groups,
    group,
    onSubmit,
  }) {
  const onFinish = (values) => {
    onSubmit(values['group']);
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
      {...layout}
      initialValues={{
        group: group,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="移至组"
        name="group"
        rules={[{ required: true, message: '必须选择一个组' }]}
      >
        <Select>
          {groups.map((g) => (
            <Option key={g} value={g}>{g}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
}
  