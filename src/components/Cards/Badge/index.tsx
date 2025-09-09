import {TextProps} from 'react-native';
import Colors from '../../../theme/Colors';
import {Typography} from '../../Forms';
import {moderateScale, scale, scaleHeight} from '../../../utils/Helpers';

interface IStatusMap {
  title: string;
  color: string;
  backgroundColor: string;
}

type STATUSES = 'successful' | 'pending' | 'failed';

interface BadgeProps extends TextProps {
  type: STATUSES;
  backgroundColor?: string;
}

export default function Badge({type, backgroundColor, ...props}: BadgeProps) {
  const statusMap: Record<STATUSES, IStatusMap> = {
    successful: {
      title: 'Successful',
      color: Colors.success['base'],
      backgroundColor: backgroundColor || Colors.success[100],
    },
    pending: {
      title: 'Pending',
      color: Colors.primary['base'],
      backgroundColor: backgroundColor || Colors.primary[100],
    },
    failed: {
      title: 'Failed',
      color: Colors.danger['base'],
      backgroundColor: backgroundColor || Colors.danger[100],
    },
  };
  return (
    <Typography
      title={statusMap[type].title}
      type="label-sb"
      color={statusMap[type].color}
      style={[
        {
          paddingVertical: scaleHeight(2),
          paddingHorizontal: scale(10),
          backgroundColor: statusMap[type].backgroundColor,
          borderRadius: moderateScale(15),
        },
        props.style,
      ]}
    />
  );
}
