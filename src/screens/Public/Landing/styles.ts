import {StyleSheet} from 'react-native';
import {scale} from '../../../utils/Helpers';
import {baseDP, height, width} from '../../../utils/Constants';
import Colors from '../../../theme/Colors';

export const styles = StyleSheet.create({
  payrepLogo: {
    width: scale(178),
    height: scale(178),
    resizeMode: 'contain',
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height: '100%',
    zIndex: 1,
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    gap: scale(16),
    width: 217,
    bottom: 140,
    position: 'absolute',
    zIndex: 3,
  },
  signupButtonStyle: {
    backgroundColor: Colors.black,
    borderRadius: baseDP * 2,
    opacity: 0.9,
  },
  imageBackgroundImageStyle: {
    width: '100%',
    height: '100%',
  },
  imageBackgroundStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  signupTextStyle: {
    color: Colors.white,
  },
  loginButtonStyle: {
    borderColor: Colors.black,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
});
