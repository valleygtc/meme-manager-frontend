import React from 'react';
import {
  Select,
  Divider,
  Button,
  Form
} from 'antd';

import FormModalButton from './FormModalButton.jsx';
import GroupAddForm from './GroupAddForm.jsx';

const { Option } = Select;


/**
 * props:
 *   groups [Array[String]]
 *   value [String]
 *   onGroupSelect [callback]
 *   onGroupAdd [callback]
 */
export default function GroupSelect({
  groups,
  value,
  onGroupSelect,
  onGroupAdd,
}) {
  const WrappedAddForm = Form.create()(GroupAddForm);

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
            <FormModalButton
              buttonItem={(<Button size={'small'}>新建</Button>)}
              title="添加组"
              WrappedForm={WrappedAddForm}
              onSubmit={onGroupAdd}
            />
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
