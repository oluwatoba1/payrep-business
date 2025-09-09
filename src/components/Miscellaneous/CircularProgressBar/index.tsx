import React, {useEffect, useState} from 'react';
import {View, Text, ColorValue} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import styles from './styles';
import Colors from '../../../theme/Colors';
import { Typography } from '../../Forms';

interface CircularProgressBarProps {
  progress?: number;
  radius?: number;
  strokeWidth?: number;
  progressBarType?: 'default' | 'health' | 'success' | 'danger';
}

export default function CircularProgressBar({
  progress = 0,
  radius = 48,
  strokeWidth = 10,
  progressBarType = 'default',
}: CircularProgressBarProps) {
  const [progressContainerColor, setProgressContainerColor] =
    useState<ColorValue>('');
  const [progressColor, setProgressColor] = useState<ColorValue>('');
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  const generateColorMap = () => {
    switch (progressBarType) {
      case 'health':
        if (progress >= 65) {
          setProgressColor(Colors.success['100']);
          setProgressColor(Colors.success.base);
        } else if (progress < 65) {
          setProgressContainerColor(Colors.primary['100']);
          setProgressColor(Colors.primary.base);
        } else {
          setProgressContainerColor(Colors.danger['100']);
          setProgressColor(Colors.danger.base);
        }

        break;
      case 'success': 
        setProgressContainerColor(Colors.success['100']);
        setProgressColor(Colors.success.base);
        break;

      case 'danger':
        setProgressContainerColor(Colors.danger['100']);
        setProgressColor(Colors.danger.base);
        break;

      default:
        setProgressContainerColor('#E6E6E6');
        setProgressColor('#3498DB');
        break;
    }
  };

  useEffect(() => {
    generateColorMap();
  }, [progressBarType]);

  return (
    <View>
      <Svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
        <Circle
          stroke={progressContainerColor}
          fill="none"
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={progressColor}
          fill="none"
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <View
        style={[styles.textContainer, {width: radius * 2, height: radius * 2}]}>
        <Typography title={`${progress}%`} type='body-b'/>
      </View>
    </View>
  );
}
