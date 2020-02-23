import React, { useState, useEffect } from 'react';

import ImageBox from './ImageBox.jsx';
import { get } from './utils';
import config from './config';

const { BACKEND_PREFIX } = config;


/**
 * state:
 *   imageMetaDatas [Array[Object]]: {
 *     "id": [Number],
 *     "img_type": [String],
 *     "tags": [Array[String]],
 *     "create_at": [String],
 *   }
 */
export default function ImageWall() {
  const [ imageMetaDatas, setImageMetaDatas ] = useState([]);

  const refresh = async () => {
    console.log('ImageWall: handle init');
    const resp = await get(`${BACKEND_PREFIX}/images/`);
    if (resp.status !== 200) {
      console.error('Error: %o', { resp });
      return ;
    }

    const respJSON = await resp.json();
    console.log('ImageWall: receive data: %o', { respJSON })
    setImageMetaDatas(respJSON.data)
    return ;
  }

  // 仅在组件挂载时执行
  useEffect(() => {
    refresh();
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {imageMetaDatas.map((m) => {
        return (
          <ImageBox key={m['id']} metadata={m} />
        );
      })}
    </div>
  );
}
