import { useState } from "react"
import { Image, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { Typography } from "../../Forms";
import styles from "./styles";
import IconImages from "../../../../assets/images/appIcons";
import Colors from "../../../theme/Colors";
import FilterModal from "../../Modal/FilterModal";

interface ITabsProps {
    title: string;
    component: React.ComponentType<any>;
    props?: {};
}
interface CustomTabsProps {
    tabs: ITabsProps[];
    customStyle?: ViewStyle;
    tabStyle?: ViewStyle;
    textStyle?: TextStyle;
    screen?: string;
    onFilterHandle?: (filters: {startDate?: Date, endDate?:Date}) => void | undefined
}
export default function CustomTabs({ tabs, customStyle, tabStyle, textStyle, onFilterHandle }: CustomTabsProps) {

    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [isFilter, setIsFilter] = useState(0);
    const [isFilterModalHidden, setIsFilterModalHidden] = useState(true);

    const toggleFilterModalVisibility = () => {
        setIsFilterModalHidden(prev => !prev);
    };

    const handleTabPress = (index: number) => {
        setActiveTabIndex(index);
        setIsFilter(index);
    };

    const ActiveScreen = tabs[activeTabIndex].component;
    const activeScreenProps = tabs[activeTabIndex].props || {};

    let renderTabs

    renderTabs = () => {
        return tabs.map((tab, index) => (

            <TouchableOpacity
                key={index}
                style={[
                    tabStyle,
                    styles.tab,
                    index === activeTabIndex && styles.activeTab,
                ]}
                onPress={() => handleTabPress(index)}
            >
                <Typography title={`${tab.title}`} style={[textStyle, styles.tabText, index === activeTabIndex && styles.activeTabText]} type="body-sb" />
            </TouchableOpacity>

        ));
    }

    return (
        <View style={styles.container}>
            <FilterModal onApplyFilters={onFilterHandle}  showModal={!isFilterModalHidden} title="Filter Transaction" onClose={ toggleFilterModalVisibility }/>
            <View style={styles.top}>
                <View style={[customStyle, styles.tabsContainer]}>
                    {renderTabs()}
                </View>
                {!isFilter ?
                    (
                        <View style={styles.filterContainer}>
                            <TouchableOpacity style={styles.filter} onPress={toggleFilterModalVisibility}>
                                <Image source={IconImages.icon.filter} style={styles.filterIcon} />
                                <Typography title='Filter' type='body-b' color={Colors.gray[600]} />
                            </TouchableOpacity>
                        </View>
                    ) : (<View></View>)
                }
            </View>

            <ActiveScreen {...activeScreenProps} />
        </View>

    )


}