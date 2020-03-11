import React from 'react';
import { Select, Divider, Button } from 'antd';

import FormModalButton from './FormModalButton.jsx';
import GroupAddForm from './GroupAddForm.jsx';
import GroupEditModalButton from './GroupEditModalButton.jsx';

const { Option } = Select;


/**
 * props:
 *   groups [Array[String]]
 *   currentGroup [String]
 *   onGroupSelect [callback]
 *   onGroupAdd [callback]
 *   onGroupDelete [callback]
 *   onGroupRename [callback]
 */
export default function GroupSelect({
  groups,
  currentGroup,
  onGroupSelect,
  onGroupAdd,
  onGroupDelete,
  onGroupRename,
}) {
  return (
    <Select
      style={{
        minWidth: 120,
      }}
      placeholder="group"
      value={currentGroup}
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
            <GroupEditModalButton
              groups={groups}
              onGroupDelete={onGroupDelete}
              onGroupRename={onGroupRename}
            />
            <FormModalButton
              buttonItem={(<Button size={'small'}>新建</Button>)}
              title="添加组"
              wrappedForm={<GroupAddForm />}
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
