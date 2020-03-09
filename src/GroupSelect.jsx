import React from 'react';
import { Select, Divider, Button } from 'antd';

const { Option } = Select;


/**
 * props:
 *   groups [Array[String]]
 */
export default function GroupSelect({
  groups,
  value,
}) {
  return (
    <Select
      style={{
        minWidth: 120,
      }}
      placeholder="group"
      value={value}
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
