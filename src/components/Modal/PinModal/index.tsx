import {Button, PinPad, Typography} from '@components/Forms';
import ModalWrapper from '../ModalWrapper';
import Pad from '@components/Pad';

interface PinModalProps {
  pin: string;
  setPin: (value: string) => void;
  showModal: boolean;
  onClose: () => void;
  proceed: () => void;
}

export default function PinModal({
  pin,
  setPin,
  showModal,
  onClose,
  proceed,
}: PinModalProps) {
  return (
    <ModalWrapper visible={showModal} onClose={onClose}>
      <Pad size={20} />

      <Typography
        title="Input your pin to complete this transaction"
        type="body-sb"
      />

      <Pad size={20} />

      <PinPad pin={pin} onInput={setPin} error="" codeLength={4} />

      <Pad size={30} />

      <Button title="Proceed" onPress={proceed} />
    </ModalWrapper>
  );
}
