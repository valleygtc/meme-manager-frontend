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
 */
export default function ImageWall({
  imageMetaDatas,
  onImageDelete,
  onTagsAdd,
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {imageMetaDatas.map((m) => {
        return (
          <ImageBox
            key={m['id']}
            metadata={m}
            onImageDelete={onImageDelete}
            onTagsAdd={onTagsAdd}
          />
        );
      })}
    </div>
  );
}
