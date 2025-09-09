import React from 'react';
import {Image, View, ImageSourcePropType} from 'react-native';
import {Typography} from '../../Forms';
import {styles} from './styles';

interface ProfileDetailInfoProps {
  profileImage: ImageSourcePropType | {uri: string};
  username: string;
  mobileNumber: string;
}

export default function UserProfileCard({
  profileImage,
  username,
  mobileNumber,
}: ProfileDetailInfoProps) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={profileImage} style={styles.image} resizeMode="cover" />
      </View>
      <View style={styles.textContainer}>
        <Typography title={username} type="body-sb" />
        <Typography title={mobileNumber} type="body-r" />
      </View>
    </View>
  );
}
