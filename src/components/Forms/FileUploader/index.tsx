import React from 'react';
import {Image, Pressable, View} from 'react-native';
import {
  DocumentPickerResponse,
  pick,
  types,
} from '@react-native-documents/picker';
import {Typography} from '..';
import ScreenImages from '@assets/images/screens';
import {styles} from './styles';

interface FileUploaderProps {
  file: DocumentPickerResponse | null;
  title?: string;
  subtitle?: string;
  allowMultiSelection?: boolean;
  type?: string[];
  onChoose: (file: DocumentPickerResponse[]) => void;
  notifier: (message: string) => void;
}

export default function FileUploader({
  file,
  allowMultiSelection = false,
  type = [types.images, types.pdf],
  onChoose,
  title = '',
  subtitle = '',
  notifier,
}: FileUploaderProps) {
  const selectFile = async () => {
    try {
      const result = await pick({
        mode: 'open',
        allowMultiSelection,
        type,
        requestLongTermAccess: true,
      });
      const areAcceptedTypes = result.every(file => file.hasRequestedType);
      if (!areAcceptedTypes) {
        notifier(`Accepted files are ${type.join(', ')}`);
        return;
      }
      onChoose(result);
    } catch (error: any) {
      notifier(error?.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.imagePickerContainer}>
      <Typography title={title} type="body-sb" />
      <Typography title={subtitle} type="body-r" />
      {file && <Image source={{uri: file.uri}} style={styles.imagePreview} />}
      <Pressable style={styles.imageButton} onPress={selectFile}>
        <Image
          source={ScreenImages.MoreScreen.image}
          style={styles.imageIcon}
        />
        <Typography
          title={file ? 'Change document' : 'Select a document to upload'}
        />
      </Pressable>
    </View>
  );
}
