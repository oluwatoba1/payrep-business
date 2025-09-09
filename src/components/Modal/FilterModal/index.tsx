import {Pressable, View} from 'react-native';
import {useState} from 'react';

import {Button, Typography} from '../../Forms';
import {modalMainStyles} from '../styles';
import ModalWrapper from '../ModalWrapper/index.tsx';
import DateRangePicker from '@components/Forms/DateRangePicker/index.tsx';
import styles from './styles.ts';
import Pad from '@components/Pad';

interface IFilterModalProps {
  showModal: boolean;
  onClose: () => void;
  title: string;
  onApplyFilters?: (filters: {startDate?: Date; endDate?: Date}) => void;
}

export default function FilterModal({
  showModal,
  onClose,
  title,
  onApplyFilters,
}: IFilterModalProps) {
  const [dateRange, setDateRange] = useState<{
    startDate?: Date;
    endDate?: Date;
  }>({});

  const handleApply = () => {
    onApplyFilters?.(dateRange);

    onClose();
  };

  return (
    <ModalWrapper visible={showModal} onClose={onClose}>
      <View style={modalMainStyles.header}>
        <Typography title={title} />
        <Pressable style={modalMainStyles.onClose} onPress={onClose}>
          <Typography title="Close" />
        </Pressable>
      </View>

      <View style={styles.buttonContainer}>
        <DateRangePicker onRangeChange={setDateRange} />

        <Pad size={20} />

        <Button
          title="Apply Filter"
          onPress={handleApply}
          disabled={!dateRange.startDate || !dateRange.endDate}
        />
      </View>
    </ModalWrapper>
  );
}
