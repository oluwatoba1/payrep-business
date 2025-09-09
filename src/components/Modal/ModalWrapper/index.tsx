import React, {ReactNode} from 'react';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  ModalProps,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {modalMainStyles} from '../styles';
import {LogoLoader} from '@components/Layout';

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  animationType?: ModalProps['animationType'];
  transparent?: boolean;
  dismissOnTouchOutside?: boolean;
  modalContainerStyle?: StyleProp<ViewStyle>;
  modalContentStyle?: StyleProp<ViewStyle>;
  isLoading?: boolean;
}

export default function ModalWrapper({
  visible,
  children,
  onClose,
  animationType = 'slide',
  transparent = true,
  dismissOnTouchOutside = true,
  modalContainerStyle,
  modalContentStyle,
  isLoading = false,
}: CustomModalProps) {
  const handleOutsidePress = () => {
    if (dismissOnTouchOutside) {
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={transparent}
      animationType={animationType}
      onRequestClose={onClose}>
      <LogoLoader isLoading={isLoading} title="" />
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={[modalMainStyles.modalContainer, modalContainerStyle]}>
          <TouchableWithoutFeedback>
            <View style={[modalMainStyles.modalContent, modalContentStyle]}>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
