import React from "react";
import { Text, View, Pressable, Image } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import styles from "./styles";
import ComponentImages from "../../../assets/images/components";
import { Typography } from "@components/Forms";

const Icon = ({
	routeName,
	isActive,
}: {
	routeName: string;
	isActive: boolean;
}) => {
	switch (routeName) {
		case "Savings":
			return (
				<Image
					source={ComponentImages.BottomNav.SavingsIcon}
					style={[styles.tabIcon, isActive && styles.activeIcon]}
				/>
			);
		case "History":
			return (
				<Image
					source={ComponentImages.BottomNav.TransactionIcon}
					style={[styles.tabIcon, isActive && styles.activeIcon]}
				/>
			);
		case "Support":
			return (
				<Image
					source={ComponentImages.BottomNav.SupportIcon}
					style={[styles.tabIcon, isActive && styles.activeIcon]}
				/>
			);
		case "More":
			return (
				<Image
					source={ComponentImages.BottomNav.MoreIcon}
					style={[styles.tabIcon, isActive && styles.activeIcon]}
				/>
			);

		default:
			return null;
	}
};

const TabItem = ({
	route,
	index,
	navigation,
	state,
}: {
	route: BottomTabBarProps["state"]["routes"][number];
	index: number;
	navigation: BottomTabBarProps["navigation"];
	state: BottomTabBarProps["state"];
}) => {
	const label = route.name;
	const isActive = state.index === index;
	const isHomeTab = label === "Home";
	const isComingSoon = label === "Savings";

	const onPress = () => {
		const event = navigation.emit({
			type: "tabPress",
			target: route.key,
			canPreventDefault: true,
		});

		if (!isActive && !event.defaultPrevented && !isComingSoon) {
			navigation.navigate(route.name);
		}
	};

	const onLongPress = () => {
		navigation.emit({
			type: "tabLongPress",
			target: route.key,
		});
	};

	if (isHomeTab) {
		return null;
	}

	return (
		<Pressable
			onLongPress={onLongPress}
			onPress={onPress}
			style={[styles.tabItem]}
		>
			{isComingSoon ? (
				<Typography
					title='Coming Soon!'
					type='label-r'
					style={styles.comingSoonText}
				/>
			) : null}
			<View>
				<Icon routeName={label} isActive={isActive} />
			</View>
			<Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
				{label}
			</Text>
		</Pressable>
	);
};

export default function BottomTabBar({ state, navigation }: BottomTabBarProps) {
	console.log(state.routes);
	console.log(state.index);
	if (state.index === 4) return null;
	if (
		!!state.routes[state.index].state?.index ||
		!!state.routes[state.index].params
	)
		return null;

	return (
		<View style={[styles.container]}>
			{state.routes.map((route, index) =>
				index === 2 ? (
					<Pressable
						key={index}
						style={styles.homeTabItemContainer}
						onPress={() => navigation.navigate("Home")}
					>
						<View style={styles.homeTabItemInnerContainer}>
							<View style={styles.homeIconWrapper}>
								<Image
									source={ComponentImages.BottomNav.HomeIcon}
									style={styles.tabIcon}
								/>
							</View>
						</View>
					</Pressable>
				) : (
					<TabItem
						index={index}
						route={route}
						navigation={navigation}
						state={state}
						key={index}
					/>
				)
			)}
		</View>
	);
}
