import React from 'react';
import { Button } from 'antd';

import ImageAddForm from './ImageAddForm.jsx';
import FormModalButton from './FormModalButton.jsx';
import SearchBar from './SearchBar.jsx';
import GroupSelect from './GroupSelect';


/**
 * props:
 *   groups [Array[String]]
 *   currentGroup [String]
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
  currentGroup,
  searchField,
  onGroupSelect,
  onGroupAdd,
  onGroupDelete,
  onGroupRename,
  onImageAdd,
  onSearch,
  onReset,
}) {
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
          currentGroup={currentGroup}
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
          wrappedForm={<ImageAddForm  groups={groups}/>}
          onSubmit={onImageAdd}
        />
      </div>
    </div>
  );
}
