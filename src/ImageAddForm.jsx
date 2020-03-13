import React from 'react';
import { Form, Button, Select } from 'antd';

import Upload from './Upload.jsx';
import TagsInput from './TagsInput.jsx';
import { countArray } from './utils';

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

  const cleanTags = (tags) => tags.filter((t) => t !== '');

  const tagsValidator = async (rule, value) => {
    const neatTags = cleanTags(value);
    // 禁止上传同名标签
    const tCount = countArray(neatTags)
    for (const [t, num] of Object.entries(tCount)) {
      if (num > 1) {
        throw Error(`标签“${t}”重复`);
      }
    }
  }
  
  const handleFinish = (values) => {
    const cleanValues = {
      ...values,
      tags: cleanTags(values.tags),
    }
    onSubmit(cleanValues);
    form.resetFields();
  };

  const handleFinishFailed = (errorInfo) => {
    console.error(errorInfo);
  };

  const handleReset = () => {
    form.resetFields();
  }

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
  };

  return (
    <Form
      name="addImageForm"
      form={form}
      {...layout}
      initialValues={{
        group: 'all',
        tags: [''],
      }}
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
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
        <Button htmlType="button" onClick={handleReset}>
          重置
        </Button>
      </Form.Item>
    </Form>
  );
}
