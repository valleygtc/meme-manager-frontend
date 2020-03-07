import React from 'react';

import ImageBox from './ImageBox.jsx';


/**
 * props:
 *   imageMetaDatas [Array[Object]]: {
 *     "id": [Number],
 *     "img_type": [String],
 *     "tags": [Array[String]],
 *     "create_at": [String],
 *   }
 *   onImageDelete [callback]
 *   onTagsAdd [callback]
 *   onTagDelete [callback]
 */
export default function ImageWall({
  imageMetaDatas,
  onImageDelete,
  onTagsAdd,
  onTagDelete,
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: 'white',
        boxShadow: '2px 2px 5px #a0a0a0',
      }}
    >
      {imageMetaDatas.map((m) => {
        return (
          <ImageBox
            key={m['id']}
            metadata={m}
            onImageDelete={onImageDelete}
            onTagsAdd={onTagsAdd}
            onTagDelete={onTagDelete}
          />
        );
      })}
    </div>
  );
}
