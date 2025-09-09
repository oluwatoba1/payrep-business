import {TextStyle} from 'react-native';
import {moderateScale} from '../../../utils/Helpers';

interface ITypographyStyleTextArgs {
  color: string;
  fontSize: number;
  lineHeight: number;
  fontFamily: string;
}

interface TypographyStyleTextStyle {
  (headingTextArgs: ITypographyStyleTextArgs): TextStyle;
}

type TypographyStyle = {
  text: TypographyStyleTextStyle;
};

const styles: TypographyStyle = {
  text: ({
    color,
    fontSize,
    fontFamily,
    lineHeight,
  }: ITypographyStyleTextArgs) => ({
    fontFamily,
    fontSize: moderateScale(fontSize),
    lineHeight: moderateScale(lineHeight),
    color,
  }),
};

export default styles;
