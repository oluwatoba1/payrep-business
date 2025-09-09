import {Button, Typography} from '@components/Forms';
import ModalWrapper from '../ModalWrapper';
import Pad from '@components/Pad';
import {Row} from '@components/Layout';
import styles from './styles';

interface HasPersonalProfileModalProps {
  showModal: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function HasPersonalProfileModal({
  showModal,
  onClose,
  onSubmit,
}: HasPersonalProfileModalProps) {
  return (
    <ModalWrapper visible={showModal} onClose={onClose}>
      <Typography title="This account already has a personal profile, should we proceed to setup your business profile?" />

      <Pad size={40} />

      <Row gap={20}>
        <Button
          title="No, it's not me"
          onPress={onClose}
          containerStyle={styles.closeButton}
        />
        <Button title="Yes, this is me" onPress={onSubmit} />
      </Row>
    </ModalWrapper>
  );
}
