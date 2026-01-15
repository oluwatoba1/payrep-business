import {StyleSheet} from 'react-native';
import Colors from '../../../theme/Colors';
import {PNR, PNSB} from '../../../theme/Fonts';
import {scale, scaleHeight} from '../../../utils/Helpers';
import {height, MAIN_LAYOUT_HORIZONTAL_PADDING, width} from '@utils/Constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary['base'],
  },
  top: {
    width: '100%',
    backgroundColor: Colors.primary['base'],
    paddingTop: scale(107),
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  logoContainer: {
    height: '44%',
  },
  logo: {
    height: scale(178),
    width: scale(178),
  },
  overlay: {
    position: 'relative',
    height: '56%',
    width,
    backgroundColor: Colors.white,
    borderTopLeftRadius: scale(32),
    borderTopRightRadius: scale(32),
    paddingVertical: scale(32),
    paddingHorizontal: scale(MAIN_LAYOUT_HORIZONTAL_PADDING),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  overlayHeader: {
    width: width - 2 * scale(MAIN_LAYOUT_HORIZONTAL_PADDING),
  },
  overlayHeading: {
    fontSize: scale(24),
    color: Colors.gray[700],
    fontFamily: PNSB,
    paddingBottom: scale(16),
    letterSpacing: scale(-0.48),
    lineHeight: scale(31.2),
  },
  overlayText: {
    fontSize: scale(16),
    color: Colors.gray[600],
    fontFamily: PNR,
    lineHeight: scale(23.2),
  },
  createAccount: {
    fontSize: scale(16),
    color: Colors.gray[600],
    fontFamily: PNR,
    lineHeight: scale(21),

    textAlign: 'center',
    paddingTop: scale(16),
  },
  caLink: {
    color: Colors.primary[600],
  },
  biometricsContainer: {
    borderWidth: 0.5,
    height: scale(48),
    width: scale(48),
    borderRadius: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.gray['300'],
    backgroundColor: Colors.gray['100'],
    marginBottom: scaleHeight(16),
  },
  biometricsIcon: {
    height: scale(24),
    width: scale(24),
  },
  accountButton: {
    flexDirection: 'row',
    gap: scaleHeight(4),
  },
  cbnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scaleHeight(4),
  },
});

export default styles;
