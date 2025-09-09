import {Image} from 'react-native';

import {Button, Typography} from '@components/Forms';
import Pad from '@components/Pad';
import {Row} from '@components/Layout';
import styles from './styles';
import {ModalWrapper} from '..';
import Colors from '@theme/Colors';

interface IsThisYouModalProps {
  title: string;
  image?: string;
  showModal: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export default function IsThisYouModal({
  title,
  image,
  showModal,
  onClose,
  onProceed,
}: IsThisYouModalProps) {
  return (
    <ModalWrapper visible={showModal} onClose={onClose}>
      <Pad />

      <Typography title="Is this you?" type="heading" />

      {/* <Pad />

            <Image source={{ uri: image || 'https://via.placeholder.com/150' }} style={styles.image} /> */}

      <Pad size={20} />

      <Typography
        title={title}
        type="heading-sb"
        style={{textAlign: 'center'}}
      />

      <Pad size={30} />

      <Row gap={20}>
        <Button
          title="No, it's not me"
          onPress={onClose}
          containerStyle={styles.closeButton}
        />
        <Button title="Yes, this is me" onPress={onProceed} />
      </Row>
    </ModalWrapper>
  );
}
