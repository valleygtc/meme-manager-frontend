import React, { useState } from 'react';
import { Input, Select, Button } from 'antd';

const { Option } = Select;


/**
 * props:
 *   initialRange [String]: 'all' or 'group'
 *   initialTag [String]
 *   onSearch [callback]
 *   onReset [callback]
 *
 * state:
 *   initialKey [String]
 */
export default function SearchBar({
  initialRange,
  initialTag,
  onSearch,
  onReset,
}) {
  // range: 'all' or 'group'
  const [ range, setRange ] = useState(initialRange);
  const [ tag, setTag ] = useState(initialTag);

  const handleReset = () => {
    setRange('all');
    setTag('');
    onReset();
  }

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <Select
        style={{
          minWidth: '6em',
        }}
        value={range}
        onSelect={setRange}
      >
        <Option value="all">全部</Option>
        <Option value="group">组内</Option>
      </Select>
      <Input.Search
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        onSearch={(tag) => onSearch(range, tag)}
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
