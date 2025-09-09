import Pad from '@components/Pad';
import ModalWrapper from '../ModalWrapper';
import {Button, Typography} from '@components/Forms';
import {Row} from '@components/Layout';
import {Alert} from 'react-native';

interface NewDeviceDetectedModalProps {
  showModal: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export default function NewDeviceDetectedModal({
  showModal,
  onClose,
  onProceed,
}: NewDeviceDetectedModalProps) {
  return (
    <ModalWrapper visible={showModal} onClose={onClose}>
      <Pad size={20} />

      <Typography title="New Device Detected" type="heading-sb" />

      <Pad />

      <Typography
        title="You attempted to login with a new device, register this new device in order to login"
        type="body-r"
      />

      <Pad size={40} />

      <Row>
        <Button title="Register New Device" onPress={onProceed} />
        <Button title="Cancel" onPress={onClose} />
      </Row>
    </ModalWrapper>
  );
}
