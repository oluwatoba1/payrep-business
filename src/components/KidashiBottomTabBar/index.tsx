import React from "react";
import { Text, View, Pressable, Image } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import styles from "./styles";
import ComponentImages from "../../../assets/images/components";

const Icon = ({
	routeName,
	isActive,
}: {
	routeName: string;
	isActive: boolean;
}) => {
	switch (routeName) {
		case "Home":
			return (
				<Image
					source={ComponentImages.kidashiBottomNavigator.home}
					style={[styles.tabIcon, isActive && styles.activeIcon]}
				/>
			);
		case "Trust Circles":
			return (
				<Image
					source={ComponentImages.kidashiBottomNavigator.trustCircles}
					style={[styles.tabIcon, isActive && styles.activeIcon]}
				/>
			);
		case "Members":
			return (
				<Image
					source={ComponentImages.kidashiBottomNavigator.members}
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
	const label = route.name.replace("Kidashi", "");
	const isActive = state.index === index;

	const onPress = () => {
		const event = navigation.emit({
			type: "tabPress",
			target: route.key,
			canPreventDefault: true,
		});

		if (!isActive && !event.defaultPrevented) {
			navigation.navigate(route.name);
		}
	};

	const onLongPress = () => {
		navigation.emit({
			type: "tabLongPress",
			target: route.key,
		});
	};

	return (
		<Pressable
			onLongPress={onLongPress}
			onPress={onPress}
			style={[styles.tabItem]}
		>
			<View>
				<Icon routeName={label} isActive={isActive} />
			</View>
			<Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
				{label}
			</Text>
		</Pressable>
	);
};

export default function KidashiBottomTabBar({
	state,
	navigation,
}: BottomTabBarProps) {
	const kidashiBottomNavigationRoutesList = [
		"KidashiDashboard",
		"TrustCircles",
		"KidashiMembers",
		"Members",
	];

	const bottomTabResolver = (): boolean => {
		const currentRoute = state.routes[state.index];

		console.log("---------->>>>>", currentRoute);

		if (
			(!currentRoute.state?.routes ||
				currentRoute.state?.index === undefined) &&
			!currentRoute.params
		)
			return true;

		const landingScreen = kidashiBottomNavigationRoutesList.includes(
			(currentRoute.state?.routes[currentRoute.state?.index || 0] as any)?.name
		);

		return (
			landingScreen ||
			kidashiBottomNavigationRoutesList.includes(
				(currentRoute.params as any)?.screen
			)
		);
	};

	if (!bottomTabResolver()) return null;

	return (
		<View style={[styles.container]}>
			{state.routes.map((route, index) => (
				<TabItem
					index={index}
					route={route}
					navigation={navigation}
					state={state}
					key={index}
				/>
			))}
		</View>
	);
}
