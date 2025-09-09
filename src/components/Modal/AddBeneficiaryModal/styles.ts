import {StyleSheet} from 'react-native';
import Colors from '@theme/Colors';
import {height, MAIN_LAYOUT_HORIZONTAL_PADDING, width} from '@utils/Constants';
import {moderateScale, scale, scaleHeight} from '@utils/Helpers';

export const styles = StyleSheet.create({
  container: {
    width: width - scale(2 * MAIN_LAYOUT_HORIZONTAL_PADDING),
    height: height - scale(2 * MAIN_LAYOUT_HORIZONTAL_PADDING),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scaleHeight(16),
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[300],
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: scale(100),
    height: scaleHeight(100),
  },
  // iconContainer: {
  //   width: 40,
  //   height: 40,
  //   borderRadius: 20,
  //   backgroundColor: '#0066CC',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginRight: 12,
  // },
  closeButton: {
    paddingHorizontal: scale(8),
    paddingVertical: scaleHeight(4),
    backgroundColor: Colors.gray[100],
    borderRadius: moderateScale(20),
  },
  formContainer: {
    paddingVertical: scaleHeight(16),
  },
  accountInfoContainer: {
    backgroundColor: Colors.gray[50],
    borderRadius: moderateScale(8),
    padding: scaleHeight(16),
    marginBottom: scaleHeight(20),
  },
  sectionTitle: {
    marginBottom: scaleHeight(12),
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: scaleHeight(8),
  },
  infoLabel: {
    width: scale(120),
    color: Colors.black,
  },
  infoValue: {
    flex: 1,
    fontWeight: '500',
  },
  formGroup: {
    marginBottom: scaleHeight(16),
  },
  helperText: {
    marginTop: scaleHeight(4),
    color: Colors.gray[600],
    fontSize: moderateScale(12),
  },
  submitButton: {
    marginTop: scaleHeight(8),
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.gray[200],
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  loadingText: {
    marginTop: scaleHeight(12),
    color: Colors.gray[100],
  },
  successContainer: {
    padding: scaleHeight(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIconContainer: {
    width: scale(64),
    height: scaleHeight(64),
    borderRadius: moderateScale(32),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaleHeight(16),
  },
  successTitle: {
    marginBottom: scaleHeight(8),
  },
  successMessage: {
    textAlign: 'center',
  },
  errorContainer: {
    padding: scaleHeight(24),
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: '#666666',
    marginBottom: scaleHeight(16),
  },
  closeErrorButton: {
    width: '100%',
  },
});
