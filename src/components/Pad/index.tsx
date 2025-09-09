import {View} from 'react-native';
import {scale} from '../../utils/Helpers';

export default function Pad({size = 10}: {size?: number}) {
  return <View style={{marginTop: scale(size)}}></View>;
}
