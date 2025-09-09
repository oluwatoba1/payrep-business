import { StatusBar, StyleSheet, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppNavigator } from "./src/navigation";
import { Toast } from "./src/components/Miscellaneous";

export default function App() {
	const insets = useSafeAreaInsets();
	return (
		<GestureHandlerRootView
			style={{
				...styles.container,
				paddingTop: 0,
				paddingLeft: insets.left,
				paddingRight: insets.right,
				paddingBottom: Platform.OS === "android" ? insets.bottom : 0,
			}}
		>
			<StatusBar
				translucent
				backgroundColor='transparent'
				barStyle='dark-content'
				animated
			/>
			<Toast />
			<AppNavigator />
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
