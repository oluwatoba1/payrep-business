import {Text, TextStyle} from 'react-native';
import Colors from '../../../theme/Colors';
import styles from './styles';
import {PNB, PNR} from '../../../theme/Fonts';

interface ITextTrayProps {
  text: string;
  bold: boolean;
  action?: () => void;
}

interface IHybridTypographyProps {
  textTray: ITextTrayProps[];
  boldFontFamily?: string;
  boldFontColor?: string;
  textStyle?: TextStyle;
}

export default function HybridTypography({
  textTray,
  boldFontFamily = PNB,
  boldFontColor = Colors.primary[600],
  textStyle = {},
}: IHybridTypographyProps) {
  const _textStyle = {
    fontFamily: PNR,
    fontSize: 14,
    color: Colors.gray[600],
    lineHeight: 14 * 1.5,
  };

  return (
    <Text style={[styles.text(_textStyle), textStyle]}>
      {textTray.map((item, index) => {
        if (!item.bold) return item.text;
        return (
          <Text
            key={index}
            onPress={() => item.action && item.action()}
            style={[
              styles.text(_textStyle),
              textStyle,
              {fontFamily: boldFontFamily, color: boldFontColor},
            ]}>
            {item.text}
          </Text>
        );
      })}
    </Text>
  );
}
