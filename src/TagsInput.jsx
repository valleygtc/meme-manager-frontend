import React from 'react';
import { Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';


/** 自定义完全受控组件，受上级 Form 控制。
 * props:
 *  value [Object]: Antd Form 下传
 *  onChange [Object]: Antd Form 下传
 *
 * state:
 *  tags [Array[String]]
 */
export default class TagsInput extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    console.log('TagsInput getDerivedStateFromProps: %o', { nextProps });
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        tags: (nextProps.value || [''])
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      tags: this.props.value || [''],
    };
  }

  handleOptionRemove = (k) => {
    const tags = [
      ...this.state.tags.slice(0, k),
      ...this.state.tags.slice(k + 1),
    ];
    this.triggerChange(tags);
  }

  handleOptionAdd = () => {
    const tags = [
      ...this.state.tags,
      '',
    ]
    this.triggerChange(tags);
  }

  handleInputChange = (i, event) => {
    const value = event.target.value || '';
    const tags = [...this.state.tags];
    tags[i] = value;
    this.triggerChange(tags);
  }

  triggerChange = (tags) => {
    this.setState({
      tags
    });
    this.props.onChange(tags);
  }

  render() {
    const { tags } = this.state;

    const items = tags.map((t, index) => {
      return (
        <div key={index}>
          <Input
            value={t}
            placeholder="Tag"
            style={{ width: '80%' }}
            onChange={(event) => { this.handleInputChange(index, event) }} />
          {tags.length > 1 ? (
            <MinusCircleOutlined
              className="dynamic-delete-button"
              disabled={tags.length === 1}
              onClick={() => this.handleOptionRemove(index)} />
          ) : null}
        </div>
      );
    });

    return (
      <div>
        {items}
        <Button type="dashed" onClick={this.handleOptionAdd}>
          <PlusOutlined /> Add Select Item
        </Button>
      </div>
    );
  }
}
