import { useState } from "react";
import { View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Typography } from "../../Forms";
import styles from "./styles";
import Colors from "../../../theme/Colors";

interface ITabs {
    title: string;
    component: React.ComponentType<any>;
    props?: {};
}

interface TabsProps {
    tabs: ITabs[];
}

export default function TabsNavigation({ tabs }: TabsProps) {

    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const handleTabPress = (index: number) => {
        setActiveTabIndex(index);
    };

    let renderTabs

    if (tabs.length > 4) {
        renderTabs = () => {
            return (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {tabs.map((tab, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.tab, index === activeTabIndex && styles.tabActive]}
                            onPress={() => handleTabPress(index)}
                        >
                            <Typography title={tab.title} type="body-r" color={Colors.gray[600]} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            );
        };
    }
    else {
        renderTabs = () => {
            return tabs.map((tab, index) => (
                <TouchableOpacity key={index} style={[styles.tab, index === activeTabIndex && styles.tabActive]} onPress={() => handleTabPress(index)}>
                    <Typography title={tab.title} type='body-r' color={Colors.gray[600]} />
                </TouchableOpacity>
            ));
        };
    }

    const ActiveScreen = tabs[activeTabIndex].component;
    const activeScreenProps = tabs[activeTabIndex].props || {};

    return (
        <View>
            {
                tabs.length > 5 ?
                    (
                        <View style={{ ...styles.tabsContainer }}>{renderTabs()}</View>
                    ) :
                    (
                        <View style={{ ...styles.tabsContainer }}>{renderTabs()}</View>
                    )
            }
            <ActiveScreen {...activeScreenProps} />
        </View>
    )
}