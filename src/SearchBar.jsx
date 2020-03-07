import React, { useState } from 'react';
import { Input, Select } from 'antd';

const { Option } = Select;


/**
 * props:
 *   initialKey [String]
 *   initialValue [String]
 *   onSearch [callback]
 *
 * state:
 *   initialKey [String]
 */
export default function SearchBar({
  initialKey,
  initialValue,
  onSearch,
}) {
  const [ key, setKey ] = useState(initialKey);

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
        defaultValue={initialValue}
        onSearch={(value) => onSearch(key, value)}
        enterButton
      />
    </div>
  );
}
