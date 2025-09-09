import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';

import IconImages from '@assets/images/appIcons';
import styles from './styles';
import {Typography} from '@components/Forms';

interface ProfileStepProps {
  index: number;
  title: string;
  description: string;
  completed: boolean;
  isLastStep: boolean;
  handleNavigation: () => void;
}

export default function ProfileStep({
  index,
  title,
  description,
  completed,
  isLastStep,
  handleNavigation,
}: ProfileStepProps) {
  return (
    <TouchableOpacity style={styles.stepContainer} onPress={handleNavigation}>
      <View style={styles.iconAndLineContainer}>
        <View
          style={completed ? styles.successContainer : styles.numberContainer}>
          {completed ? (
            <Image source={IconImages.arrows.checkFill} style={styles.icon} />
          ) : (
            <Typography title={`${index}`} type="body-sb" />
          )}
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Typography title={title} type="body-sb" />
        <Typography type="body-r" title={description} numberOfLines={3} />
      </View>
    </TouchableOpacity>
  );
}
