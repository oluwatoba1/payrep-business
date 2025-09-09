import {Typography} from '@components/Forms';
import ModalWrapper from '../ModalWrapper';
import Pad from '@components/Pad';
import styles from './styles';

interface SelectProfileModalProps {
  showModal: boolean;
  profiles: ICustomerInfo[];
  onClose: () => void;
  onSelectProfile: (profile: ICustomerInfo) => void;
}

export default function SelectProfileModal({
  showModal,
  profiles,
  onClose,
  onSelectProfile,
}: SelectProfileModalProps) {
  return (
    <ModalWrapper visible={showModal} onClose={onClose}>
      <Typography title="Select a profile to log in with" />

      <Pad size={40} />

      {profiles.map((profile, index) => (
        <Typography
          key={index}
          title={profile.type}
          type="body-sb"
          onPress={() => onSelectProfile(profile)}
          style={[
            styles.optionContainer,
            {borderBottomWidth: index === profiles.length - 1 ? 0 : 1},
          ]}
        />
      ))}

      <Pad size={20} />
    </ModalWrapper>
  );
}
