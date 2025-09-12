import { ReactNode } from "react";
import {
	Keyboard,
	KeyboardAvoidingView,
	View,
	RefreshControl,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Header from "./Header";
import styles from "./styles";
import Colors from "@theme/Colors";
import Pad from "@components/Pad";
import { BOTTOM_TAB_CONTAINER_HEIGHT } from "@utils/Constants";

interface MainLayoutProps {
	showHeader?: boolean;
	children: ReactNode;
	backgroundColor?: string;
	leftNode?: ReactNode;
	rightNode?: ReactNode;
	rightAction?: () => void;
	enableKeyboardAvoiding?: boolean;
	keyboardAvoidingType?: "view" | "scroll-view";
	isLoading?: boolean;
	loadingTitle?: string;
	hasBottomTabBar?: boolean;
	isRefreshing?: boolean;
	onRefresh?: () => void;
}
interface KeyboardAvoiderProps {
	type: "scroll-view" | "view";
	enableKeyboardAvoiding: boolean;
	children: ReactNode;
	isRefreshing?: boolean;
	onRefresh?: () => void;
}

const KeyboardAvoider = ({
	type,
	children,
	enableKeyboardAvoiding,
	isRefreshing = false,
	onRefresh,
}: KeyboardAvoiderProps) => {
	if (type === "scroll-view") {
		return (
			<KeyboardAwareScrollView
				resetScrollToCoords={{ x: 0, y: 0 }}
				style={styles.container}
				contentContainerStyle={{ flexGrow: 1 }} // allow scroll when content < screen
				keyboardShouldPersistTaps='handled' // lets taps pass through while keyboard open
				enableOnAndroid // actually enable behavior on Android
				enableAutomaticScroll // auto scroll to focused input
				extraScrollHeight={80} // <-- correct prop (was extraHeight)
				showsVerticalScrollIndicator={false}
				scrollEnabled={enableKeyboardAvoiding}
				{...(onRefresh
					? {
							refreshControl: (
								<RefreshControl
									refreshing={isRefreshing}
									onRefresh={onRefresh}
								/>
							),
					  }
					: {})}
				extraHeight={150}
			>
				{children}
			</KeyboardAwareScrollView>
		);
	} else {
		return (
			<KeyboardAvoidingView
				behavior='padding'
				enabled={enableKeyboardAvoiding}
				style={styles.container}
			>
				{children}
			</KeyboardAvoidingView>
		);
	}
};

export default function MainLayout({
	showHeader = true,
	children,
	backgroundColor = Colors.appBackground,
	leftNode,
	rightNode,
	rightAction,
	enableKeyboardAvoiding = true,
	keyboardAvoidingType = "view",
	isLoading = false,
	loadingTitle = "",
	hasBottomTabBar = false,
	isRefreshing = false,
	onRefresh,
}: MainLayoutProps) {
	return (
		<View
			onStartShouldSetResponder={() => {
				Keyboard.dismiss();
				return false;
			}}
			style={[styles.mainLayoutContainer, { backgroundColor }]}
		>
			<KeyboardAvoider
				enableKeyboardAvoiding={enableKeyboardAvoiding}
				type={keyboardAvoidingType}
				isRefreshing={isRefreshing}
				onRefresh={onRefresh}
			>
				<Pad size={5} />
				{showHeader ? (
					<Header
						leftNode={leftNode}
						rightNode={rightNode}
						rightAction={rightAction}
					/>
				) : null}
				{children}
				{hasBottomTabBar ? <Pad size={BOTTOM_TAB_CONTAINER_HEIGHT} /> : null}
			</KeyboardAvoider>
		</View>
	);
}
