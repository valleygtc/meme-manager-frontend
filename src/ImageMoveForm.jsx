import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Select } from 'antd';

const { Option } = Select;


/**
 * props:
 *   form: Form.create包装自带的form。
 *   groups [Array[String]]
 *   group [String]
 *   onSubmit [callback]
 */
export default function ImageMoveForm({
    form,
    groups,
    group,
    onSubmit,
  }) {
  const handleSubmit = e => {
    console.log('handleSubmit');
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (err) {
        console.error(err);
      } else {
          onSubmit(values['group']);
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

  // 外层的 Dropdown 貌似会 e.preventDefault 这里的 click。如果不加这个，Form 就输入不了了。
  // 但是加标签的没有这个问题，明明是一样的啊。不知道为什么。
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label="移至组">
          {form.getFieldDecorator('group', {
            initialValue: group,
            rules: [{ required: true, message: '必须选择一个组' }],
          })(
            <Select>
              {groups.map((g) => (
                <Option key={g} value={g}>{g}</Option>
              ))}
            </Select>
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
  