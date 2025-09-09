import { View } from "react-native";
import { Typography } from "../Forms";
import { styles } from "./styles";

interface SectionProps {
    title: string;
    titleType: "body-r" | "text" | "heading" | "subheading" | "subheading-sb" | "label-sb" | "label-r" | "body-sb" | "heading-sb" | "heading3-b" | "heading4-b" | "heading4-sb" | "heading5-sb" | "body-b" | undefined;
    value?: string;
    noBorder?: boolean;
  }
  
  export default function Section({ title, titleType, value, noBorder = false }: SectionProps): JSX.Element {
    return (
      <View
        style={[
          styles.section,
          !noBorder && styles.sectionWithBorder,
        ]}
        accessible={true}
        accessibilityRole="text"
      >
        <Typography title={title} type={titleType} />
        {value && <Typography title={value} type="body-sb" />}
      </View>
    );
  }