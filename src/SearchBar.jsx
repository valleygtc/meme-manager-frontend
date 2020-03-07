import React, { useState } from 'react';
import { Input, Select, Button } from 'antd';

const { Option } = Select;


/**
 * props:
 *   initialKey [String]
 *   initialValue [String]
 *   onSearch [callback]
 *   onReset [callback]
 *
 * state:
 *   initialKey [String]
 */
export default function SearchBar({
  initialKey,
  initialValue,
  onSearch,
  onReset,
}) {
  const [ key, setKey ] = useState(initialKey);
  const [value, setValue] = useState(initialValue);

  const handleReset = () => {
    setValue('');
    onReset();
  }

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <Select
        value={key}
        onSelect={setKey}
      >
        <Option value="tag">标签</Option>
      </Select>
      <Input.Search
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onSearch={(value) => onSearch(key, value)}
        enterButton
      />
      <div
        style={{
          marginLeft: '10px',
        }}
      >
        <Button type="primary" onClick={handleReset}>重置</Button>
      </div>
    </div>
  );
}
