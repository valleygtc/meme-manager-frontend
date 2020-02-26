import React from 'react';
import { Form, Input, Button } from 'antd';

import Upload from './Upload.jsx';
import { postForm } from './utils';
import config from './config';

const { BACKEND_PREFIX } = config;


/**
 * props:
 *   form: Form.create包装自带的form。
 *   onSubmit [callback]
 */
export default function ImageAddForm({ form, onSubmit }) {
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (err) {
        console.error(err);
      } else {
        const image = values['image'];
        const imageType = image.type.split('/')[1];
        const body = {
          image: image,
          metadata: JSON.stringify({
            img_type: imageType,
            tags: [values['tag']],
          })
        }
        console.log('Form submit: %o', { body });
        const resp = await postForm(`${BACKEND_PREFIX}/images/add`, body);
        if (resp.status !== 200) {
          console.error('Error: %o', { resp });
          return ;
        }

        console.log('Add Image success: %o', { resp });
        form.resetFields();
        onSubmit();
        return ;
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
      <Form.Item label="标签">
        {form.getFieldDecorator('tag', {
          rules: [{ required: true, message: '必须输入标签' }]
        })(
          <Input placeholder="tag" />
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
