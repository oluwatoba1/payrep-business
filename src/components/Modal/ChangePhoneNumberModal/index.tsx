import React from 'react';
import { Pressable, View } from "react-native";
import CustomModal from '..';
import { Button, TextInput, Typography } from "../../Forms";
import { modalMainStyles } from '../styles';
import { styles } from './styles';

interface ChangePhoneNumberModalProps {
  showModal: boolean;
  onClose: () => void;
  title: string;
}

export default function ChangePhoneNumberModal({
  showModal,
  onClose,
  title,
}: ChangePhoneNumberModalProps) {
  return (
    <CustomModal visible={showModal} onClose={onClose}>
      <View style={[modalMainStyles.modalContent, styles.container]}>
        <View style={modalMainStyles.header}>
            <Typography title={title} />
            <Pressable style={modalMainStyles.onClose} onPress={onClose}>
                <Typography title='Close' />
            </Pressable>
        </View>
            <TextInput type='phone' placeholder='Mobile number' />
      </View>
      <View>
        <Button title='Save Changes' onPress={() => onClose()} />
      </View>
    </CustomModal>
  );
}
