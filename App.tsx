import { useEffect, useState } from "react";
import { StatusBar, StyleSheet, Platform, View, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NetInfo from "@react-native-community/netinfo";

import { AppNavigator } from "./src/navigation";
import { Toast } from "./src/components/Miscellaneous";
import Colors from "./src/theme/Colors";

function ConnectivityBanner() {
	const [isConnected, setIsConnected] = useState(true);

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			setIsConnected(!!state?.isConnected);
		});
		return () => unsubscribe();
	}, []);

	if (isConnected) return null;

	return (
		<View style={styles.bannerContainer}>
			<Text style={styles.bannerText}>No Internet Connection</Text>
		</View>
	);
}

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
			<ConnectivityBanner />
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	bannerContainer: {
		width: "100%",
		backgroundColor: Colors.danger.base,
		padding: 10,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
	},
	bannerText: {
		color: Colors.white,
		fontWeight: "bold",
	},
});
