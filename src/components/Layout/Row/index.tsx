import {ReactNode} from 'react';
import {FlexAlignType, View, ViewStyle} from 'react-native';
import { scale } from '../../../utils/Helpers';

interface RowProps {
  children: ReactNode;
  alignItems?: FlexAlignType;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  gap?: number;
  containerStyle?: ViewStyle;
}

export default function Row({
  children,
  alignItems = 'center',
  justifyContent = 'space-between',
  gap = 0,
  containerStyle = {},
}: RowProps) {
  const styles: ViewStyle = {
    flexDirection: 'row',
    alignItems,
    justifyContent,
    gap: scale(gap),
    ...containerStyle,
  };

  return <View style={styles}>{children}</View>;
}
