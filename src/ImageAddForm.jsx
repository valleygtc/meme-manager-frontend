import React from 'react';
import { Form, Input, Button, Upload, Icon } from 'antd';

import { postForm } from './utils';
import config from './config';

const { BACKEND_PREFIX } = config;


/**
 * props:
 *   form: Form.create包装自带的form。
 *   onSubmit [callback]
 */
export default function AddForm({ form, onSubmit }) {
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (err) {
        console.error(err);
      } else {
        const image = values['image'][0]['originFileObj'];
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
        onSubmit();
        return ;
      }
    });
  };

  const { getFieldDecorator } = form;

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

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <Form.Item label="图片">
        {getFieldDecorator('image', {
          valuePropName: 'fileList',
          getValueFromEvent: normFile,
          rules: [{ required: true, message: '必须选择一个图片' }]
        })(
          <Upload
            beforeUpload={() => false}
            listType="picture"
          >
            <Button>
              <Icon type="upload" /> 点击选择图片
            </Button>
          </Upload>,
        )}
      </Form.Item>
      <Form.Item label="标签">
        {getFieldDecorator('tag', {
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
