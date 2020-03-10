import React from 'react';
import { Form, Button, Input } from 'antd';


/**
 * props:
 *   form: Form.create包装自带的form。
 *   onSubmit [callback]
 */
export default function GroupAddForm({
  form,
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

  // 如果不加这个最外层的 div stopPropagation，表单里的 Input 就点不了。应该是外层 ononMouseDown 捕获后 e.preventDefault 的原因。
  // antd 4.x 就没有这个问题了。等升级 4.x 后修改这里的实现。
  return (
    <div onMouseDown={(e) => e.stopPropagation()}>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label="组名">
          {form.getFieldDecorator('name', {
            rules: [{ required: true, message: '必须输入组名' }],
          })(
            <Input placeholder="Group"/>
          )}
        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
