import { Image, View, TextInput } from "react-native";
import { Typography } from "..";
import styles from "./styles";
import Colors from "../../../theme/Colors";
import ComponentImages from "../../../../assets/images/components";
import IconImages from "../../../../assets/images/appIcons";
import { scale, scaleHeight } from "../../../utils/Helpers";

interface SearchBarProps{
    title: string;
}

export default function SearchBar({title}: SearchBarProps) {
    return(
        <View style={styles.container}>
            <Image source={IconImages.icon.search} style={styles.searchIcon}/>
            <TextInput
                placeholder={title}
                style={styles.searchInput}
                placeholderTextColor={Colors.gray[400]}
            />
        </View>
    )
}
