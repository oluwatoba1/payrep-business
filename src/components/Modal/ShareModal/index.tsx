import {
  Image,
  TouchableOpacity,
  View,
  FlatList,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {captureRef} from 'react-native-view-shot';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import RNHTMLtoPDF, {Options} from 'react-native-html-to-pdf';

import ModalWrapper from '../ModalWrapper';
import {Typography} from '@components/Forms';
import ComponentImages from '@assets/images/components';
import useToast from '@hooks/useToast';
import {useState} from 'react';
import {styles} from './styles';
import {buildReceiptHTML} from '@utils/Helpers';
import IconImages from '@assets/images/appIcons';
import {height, width} from '@utils/Constants';

interface ShareModalProps {
  selectedTransaction: ITransaction;
  visible: boolean;
  onClose: () => void;
  viewRef: any;
  title?: string;
}

const ShareModal = ({
  selectedTransaction,
  visible,
  onClose,
  viewRef,
  title = 'Transaction Receipt',
}: ShareModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {showToast} = useToast();
  const logoUri = Image.resolveAssetSource(
    IconImages.logo.payrepBlackWithText,
  ).uri;
  const checkmarkUri = Image.resolveAssetSource(IconImages.icon.checkmark).uri;

  const handleDownloadPDF = async () => {
    try {
      setIsLoading(true);

      // Ensure selectedTransaction is available
      if (!selectedTransaction) {
        showToast('danger', 'No transaction data available');
        setIsLoading(false);
        return;
      }

      const dateGenerated = new Date().toISOString();
      const htmlContent = buildReceiptHTML(
        selectedTransaction,
        dateGenerated,
        logoUri,
        checkmarkUri,
      );
      const fileName = `${title.replace(/\s+/g, '_')}_${Date.now()}.pdf`;

      const pdfOptions: Options = {
        html: htmlContent,
        fileName,
        directory: Platform.OS === 'ios' ? 'Documents' : 'Download',
        height: height * 0.9,
        width,
      };

      const pdf = await RNHTMLtoPDF.convert(pdfOptions);

      const tempPdfPath = pdf.filePath || '';

      if (Platform.OS === 'ios') {
        // On iOS, show the share sheet (sandbox prevents direct disk access)
        await Share.open({
          url: `file://${tempPdfPath}`,
          type: 'application/pdf',
          title,
        });
      } else {
        // Step 2: Copy to Downloads
        const destPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
        await RNFS.copyFile(tempPdfPath, destPath);

        // Step 3: Scan so file is visible in downloads
        await RNFS.scanFile(destPath);

        showToast('success', 'Receipt saved to Downloads folder');
      }

      onClose();
    } catch (error) {
      showToast('danger', 'Failed to generate PDF');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToPhone = async () => {
    try {
      setIsLoading(true);
      const uri = await captureRef(viewRef, {format: 'png', quality: 1.0});
      const fileName = `${title.replace(/\s+/g, '_')}_${Date.now()}.png`;
      const path = `${RNFS.PicturesDirectoryPath}/${fileName}`;
      await RNFS.copyFile(uri, path);

      await RNFS.scanFile(path);
      showToast('success', 'Image saved to your gallery');
      setIsLoading(false);
      onClose();
    } catch (error) {
      showToast('danger', 'Failed to save image');
      setIsLoading(false);
    }
  };

  const handleShareImage = async () => {
    try {
      setIsLoading(true);
      const uri = await captureRef(viewRef, {format: 'png', quality: 0.8});

      await Share.open({
        title: title,
        url: uri,
        type: 'image/png',
      });

      setIsLoading(false);
    } catch (error) {
      showToast('danger', 'Failed to share image');
      setIsLoading(false);
    }
  };

  const shareOptions = [
    {
      title: 'PDF',
      onPress: handleDownloadPDF,
      image: ComponentImages.shareReceipt.pdfIcon,
    },
    {
      title: 'Image',
      onPress: handleSaveToPhone,
      image: ComponentImages.shareReceipt.imageIcon,
    },
  ];

  return (
    <ModalWrapper visible={visible} onClose={onClose} isLoading={isLoading}>
      <View>
        <Typography
          title="Save Options"
          type="heading5-sb"
          style={styles.title}
        />
        <FlatList
          data={shareOptions}
          keyExtractor={item => item.title}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={[
                styles.optionButton,
                shareOptions.length === index + 1 && {
                  borderBottomWidth: 0,
                },
              ]}
              onPress={item.onPress}>
              <Image source={item.image} style={styles.optionImage} />
              <Typography title={item.title} type="body-sb" />
            </TouchableOpacity>
          )}
        />
        {/* {pdfSource && (
          <Pdf source={pdfSource} style={{ flex: 1, width: "100%", height: 400 }} />
        )} */}
      </View>
    </ModalWrapper>
  );
};

export default ShareModal;
