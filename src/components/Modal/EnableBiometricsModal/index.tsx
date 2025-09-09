import Pad from '@components/Pad';
import ModalWrapper from '../ModalWrapper';
import {Row} from '@components/Layout';
import {Button, Typography} from '@components/Forms';
import Colors from '@theme/Colors';

interface EnableBiometricsModalProps {
  showModal: boolean;
  onProceed: () => void;
  onClose: () => void;
}

export default function EnableBiometricsModal({
  showModal,
  onProceed,
  onClose,
}: EnableBiometricsModalProps) {
  return (
    <ModalWrapper visible={showModal} onClose={onClose}>
      <Pad size={20} />

      <Typography title="Enable Biometrics" type="heading" />

      <Pad />

      <Typography
        title="Biometrics will help secure your account. Do you want to enable it?"
        type="body-r"
      />

      <Pad size={30} />

      <Row gap={20}>
        <Button
          title="No"
          onPress={onClose}
          containerStyle={{
            backgroundColor: Colors.white,
            borderWidth: 1,
            borderColor: Colors.black,
          }}
        />
        <Button title="Yes" onPress={() => [onProceed(), onClose()]} />
      </Row>
    </ModalWrapper>
  );
}
