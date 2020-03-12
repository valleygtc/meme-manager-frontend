import React from 'react';
import { Form, Button } from 'antd';

import TagsInput from './TagsInput.jsx';
import { countArray } from './utils';


/**
 * props:
 *   tags [Array[String]]: 该图片已有的标签。
 *   onSubmit [callback]
 */
export default function TagsAddForm({
  tags,
  onSubmit,
}) {
  const [form] = Form.useForm();

  const cleanTags = (tags) => tags.filter((t) => t !== '');

  const tagsValidator = async (rule, value) => {
    // 禁止只上传空标签
    const neatTags = cleanTags(value);
    if (neatTags.length === 0) {
      throw Error('必须至少设置一个标签');
    }

    // 禁止上传与已存在标签同名的标签
    for (const t of neatTags) {
      if (tags.includes(t)) {
        throw Error(`标签“${t}”已存在`);
      }
    }

    // 禁止上传同名标签
    const tCount = countArray(neatTags)
    for (const [t, num] of Object.entries(tCount)) {
      if (num > 1) {
        throw Error(`标签“${t}”重复`);
      }
    }
  }

  const onFinish = (values) => {
    // 去除空标签
    const netTags = cleanTags(values['tags']);
    onSubmit(netTags);
    form.resetFields();
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
      form={form}
      {...layout}
      initialValues={{
        tags: [''],
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="标签"
        name="tags"
        rules={[{
          validator: tagsValidator,
        }]}
      >
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
