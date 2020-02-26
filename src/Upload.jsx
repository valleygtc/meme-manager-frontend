import React from 'react';
import { Input } from 'antd';


/** 自定义完全受控组件，受上级 Form 控制。
 * props:
 *  value [Object]: Antd Form 下传
 *  onChange [Object]: Antd Form 下传
 *
 * state:
 *  file [Object]
 */
export default class Upload extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    console.log('Upload getDerivedStateFromProps: %o', { nextProps });
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        file: (nextProps.value || undefined)
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      file: this.props.value,
    };
  }

  handleFileChoose = (e) => {
    const file = e.target.files[0];
    console.log('Upload: recv file: %o', { file });
    this.setState({
      file,
    });
    this.props.onChange(file);
  }

  render() {
    const { file } = this.state;

    return (
      <div>
        {file === undefined ? (
          <Input type="file" onChange={this.handleFileChoose} />
        ) : (
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            style={{ width: '300px' }}
          />
        )}
      </div>
    );
  }
}
