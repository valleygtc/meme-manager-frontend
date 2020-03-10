import React from 'react';
import { Select, Divider, Button } from 'antd';

const { Option } = Select;


/**
 * props:
 *   groups [Array[String]]
 *   value [String]
 *   onGroupSelect [callback]
 */
export default function GroupSelect({
  groups,
  value,
  onGroupSelect,
}) {
  return (
    <Select
      style={{
        minWidth: 120,
      }}
      placeholder="group"
      value={value}
      onSelect={onGroupSelect}
      dropdownRender={(menu) => (
        <div>
          {menu}
          <Divider style={{ margin: '4px 0' }} />
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              padding: '8px',
            }}
          >
            <Button size={'small'}>编辑</Button>
            <Button size={'small'}>新建</Button>
          </div>
        </div>
      )}
    >
      {groups.map((g) => (
        <Option key={g} value={g}>{g}</Option>
      ))}
    </Select>
  );
}
