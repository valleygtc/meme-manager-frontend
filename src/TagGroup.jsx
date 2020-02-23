import React from 'react';
import { Tag } from 'antd';


/**
 * props:
 *   tags: [Array[String]]
 */
export default function TagGroup({
  tags,
}) {
    return (
      <div>
        {tags.map((t) => {
          return (<Tag key={t}>{t}</Tag>)
        })}
      </div>
    );
}
