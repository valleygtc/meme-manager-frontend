import React from 'react';
import {
  Select,
  Divider,
  Button,
  Form
} from 'antd';

import FormModalButton from './FormModalButton.jsx';
import GroupAddForm from './GroupAddForm.jsx';
import GroupEditModalButton from './GroupEditModalButton.jsx';

const { Option } = Select;


/**
 * props:
 *   groups [Array[String]]
 *   value [String]
 *   onGroupSelect [callback]
 *   onGroupAdd [callback]
 *   onGroupDelete [callback]
 */
export default function GroupSelect({
  groups,
  value,
  onGroupSelect,
  onGroupAdd,
  onGroupDelete,
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
            onMouseDown={(e) => {
              // TODO：如果不加这个，Button 按钮点击就没有用，这是个 bug，见：https://github.com/ant-design/ant-design/issues/13504
              // antd 4.x 就没有这个问题了。等升级 4.x 后修改这里的实现。
              e.preventDefault()
            }}
          >
            <GroupEditModalButton
              groups={groups}
              onGroupDelete={onGroupDelete}
            />
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
