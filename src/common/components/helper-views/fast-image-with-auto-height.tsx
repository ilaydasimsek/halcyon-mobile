import React, { useState } from 'react';
import FastImage, { FastImageProps } from 'react-native-fast-image';

const FastImageWithAutoHeight: React.FC<FastImageProps> = (props) => {
  const [aspectRatio, setAspectRatio] = useState(1);
  return (
    <FastImage
      {...props}
      style={[{ aspectRatio: aspectRatio }, props.style]}
      onLoad={(event) => {
        setAspectRatio(event.nativeEvent.width / event.nativeEvent.height);
      }}
    />
  );
};

export default FastImageWithAutoHeight;
