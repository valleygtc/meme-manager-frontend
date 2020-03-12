import React from 'react';
import { Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';


/** 自定义完全受控组件，受上级 Form 控制。
 * props:
 *  value [Array[String]]: Antd Form 下传
 *  onChange [callback]: Antd Form 下传
 */
export default function TagsInput({
  value,
  onChange,
}) {
  const tags = value;

  const handleOptionRemove = (k) => {
    onChange([
      ...tags.slice(0, k),
      ...tags.slice(k + 1),
    ]);
  }

  const handleOptionAdd = () => {
    onChange([
      ...tags,
      '',
    ]);
  }

  const handleInputChange = (i, event) => {
    const value = event.target.value || '';
    const newTags = [...tags];
    newTags[i] = value;
    onChange(newTags);
  }

  const items = tags.map((t, index) => {
    return (
      <div key={index}>
        <Input
          value={t}
          placeholder="Tag"
          style={{
            width: '80%',
            marginBottom: '10px',
          }}
          onChange={(event) => { handleInputChange(index, event) }} />
        {tags.length > 1 ? (
          <MinusCircleOutlined
            className="dynamic-delete-button"
            onClick={() => handleOptionRemove(index)} />
        ) : null}
      </div>
    );
  });

  return (
    <div>
      {items}
      <Button type="dashed" onClick={handleOptionAdd}>
        <PlusOutlined /> Add Select Item
      </Button>
    </div>
  );
}
