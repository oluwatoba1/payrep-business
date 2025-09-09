import React from 'react';
import {View} from 'react-native';
import {ModalWrapper} from '..';
import {Button, Checkbox, Typography} from '@components/Forms';
import {styles} from './styles';

interface AttestationModalProps {
  showModal: boolean;
  onClose: () => void;
  title: string;
  description: string;
  agreement: string;
  isChecked: boolean;
  onCheckboxChange: () => void;
  onSubmit?: () => void;
}

export default function AttestationModal({
  showModal,
  onClose,
  title,
  description,
  agreement,
  isChecked,
  onCheckboxChange,
  onSubmit = () => {},
}: AttestationModalProps) {
  return (
    <ModalWrapper visible={showModal} onClose={onClose}>
      <View style={styles.container}>
        <Typography title={title} />
        <Typography title={description} type="body-r" />
        <Checkbox
          label={agreement}
          value={isChecked}
          onPress={onCheckboxChange}
          containerStyle={{width: '90%'}}
        />
      </View>
      <View>
        <Button
          disabled={!isChecked}
          title="Submit"
          onPress={() => [onSubmit(), onClose()]}
        />
      </View>
    </ModalWrapper>
  );
}
