import React from 'react';
import { Card } from 'antd'

import TagGroup from './TagGroup.jsx';
import config from './config';

const { BACKEND_PREFIX } = config;
const { Meta } = Card;


/**
 * props:
 *   metadata [Object]: {
 *     "id": [Number],
 *     "img_type": [String],
 *     "tags": [Array[String]],
 *     "create_at": [String],
 *   }
 */
export default function ImageBox({
  metadata,
}){
  return (
    <Card
      style={{ width: 240 }}
      cover={
        <img
          src={`${BACKEND_PREFIX}/images?id=${metadata['id']}`}
          alt={`img-${metadata['id']}`}
        />
      }
    >
      <Meta description={<TagGroup tags={metadata['tags']}/>}/>
    </Card>
  );
}
