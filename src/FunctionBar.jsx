import React from 'react';
import { Form, Button } from 'antd';

import ImageAddForm from './ImageAddForm.jsx';
import FormModalButton from './FormModalButton.jsx';
import SearchBar from './SearchBar.jsx';
import GroupSelect from './GroupSelect';


/**
 * props:
 *   groups [Array[String]]
 *   group [String]
 *   searchField [Object]: {key: , value: }
 *   onGroupSelect [callback]
 *   onGroupAdd [callback]
 *   onGroupDelete [callback]
 *   onGroupRename [callback]
 *   onImageAdd [callback]
 *   onSearch [callback]
 *   onReset [callback]
 */
export default function FunctionBar({
  groups,
  group,
  searchField,
  onGroupSelect,
  onGroupAdd,
  onGroupDelete,
  onGroupRename,
  onImageAdd,
  onSearch,
  onReset,
}) {
  const WrappedAddForm = Form.create()(ImageAddForm);

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <div>
        组：
        <GroupSelect
          groups={groups}
          value={group}
          onGroupSelect={onGroupSelect}
          onGroupAdd={onGroupAdd}
          onGroupDelete={onGroupDelete}
          onGroupRename={onGroupRename}
        />
      </div>
      <div
        style={{
          flexGrow: '1',
          marginLeft: '100px',
        }}
      >
        <SearchBar
          initialKey={searchField.key}
          initialValue={searchField.value}
          onSearch={onSearch}
          onReset={onReset}
        />
      </div>
      <div
        style={{
          marginLeft: '100px',
        }}
      >
        <FormModalButton
          buttonItem={(<Button type="primary">添加</Button>)}
          title="添加图片"
          WrappedForm={WrappedAddForm}
          onSubmit={onImageAdd}
        />
      </div>
    </div>
  );
}
