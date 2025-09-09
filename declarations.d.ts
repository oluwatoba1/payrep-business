declare module '*.png' {
  import React from 'react';
  import { ImageSourcePropType } from 'react-native';
  const content: React.FC<ImageSourcePropType>;
  export default content;
}
