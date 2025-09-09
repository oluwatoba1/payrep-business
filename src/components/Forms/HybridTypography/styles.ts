import {TextStyle} from 'react-native';

import {moderateScale} from '../../../utils/Helpers';

interface IHybridTypographyStyleTextArgs {
  color: string;
  fontSize: number;
  lineHeight: number;
  fontFamily: string;
}

interface HybridTypographyStyleTextStyle {
  (headingTextArgs: IHybridTypographyStyleTextArgs): TextStyle;
}

type HybridTypographyStyle = {
  text: HybridTypographyStyleTextStyle;
};

const styles: HybridTypographyStyle = {
  text: ({
    color,
    fontSize,
    fontFamily,
    lineHeight,
  }: IHybridTypographyStyleTextArgs) => ({
    fontFamily,
    fontSize: moderateScale(fontSize),
    lineHeight: moderateScale(lineHeight),
    color,
  }),
};

export default styles;
