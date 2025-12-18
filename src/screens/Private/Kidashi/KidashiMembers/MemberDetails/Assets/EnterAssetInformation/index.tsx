import React, { useState } from "react";
import { View, TextInput, Pressable, Image } from "react-native";
import SafeAreaWrapper from "@components/Layout/SafeAreaWrapper";
import { Button, Typography, Dropdown } from "@components/Forms";
import { styles } from "./style";
import Divider from "@components/Miscellaneous/Divider";
import { MainLayout, Row } from "@components/Layout";
import { addCommas, removeCommas, scale, scaleHeight } from "@utils/Helpers";
import Colors from "@theme/Colors";
import ScreenImages from "@assets/images/screens";
import { KeyboardAvoider } from "@components/Layout/KidashiLayout";
import Pad from "@components/Pad";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MembersStackParamList } from "@navigation/types";
import { KIDASHI_TYPES } from "@utils/Constants";
import useToast from "@hooks/useToast";

interface AssetItem {
	id: string;
	name: string;
	price: string;
}
type EnterAssetInformationProps = NativeStackScreenProps<
	MembersStackParamList,
	"EnterAssetInformation"
>;
const EnterAssetInformation = ({ navigation }: EnterAssetInformationProps) => {
	const { showToast } = useToast();

	const [items, setItems] = useState<AssetItem[]>([
		{ id: "1", name: "", price: "" },
	]);
	const [selectedKidashiType, setSelectedKidashiType] = useState<{
		label: string;
		value: string;
	} | null>(null);

	const addItem = () => {
		const newItem: AssetItem = {
			id: Date.now().toString(),
			name: "",
			price: "",
		};
		setItems([...items, newItem]);
	};

	const removeItem = (id: string) => {
		if (items.length > 1) {
			setItems(items.filter((item) => item.id !== id));
		}
	};

	const updateItem = (id: string, field: "name" | "price", value: string) => {
		setItems(
			items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
		);
	};

	const sanitizePriceInput = (input: string) => {
		let sanitized = input.replace(/[^0-9.]/g, "");
		const firstDotIndex = sanitized.indexOf(".");
		if (firstDotIndex !== -1) {
			sanitized =
				sanitized.slice(0, firstDotIndex + 1) +
				sanitized.slice(firstDotIndex + 1).replace(/\./g, "");
			const [intPart, decPart = ""] = sanitized.split(".");
			sanitized = `${intPart}.${decPart.slice(0, 2)}`;
		}
		return sanitized;
	};

	const normalizeToTwoDecimals = (input: string) => {
		if (input === "") return "";
		const num = Number(input);
		if (isNaN(num)) return "";
		return num.toFixed(2);
	};

	const proceed = () => {
		const total = items.reduce(
			(sum, it) => sum + (parseFloat(it.price) || 0),
			0
		);
		if (total > 20000) {
			showToast("danger", "Woman can't request asset above ₦20,000");
			return;
		}
		navigation.navigate("ReviewAssetRequest", {
			items: items.filter((i) => i.name.trim() !== "" && i.price !== ""),
			productCode: "KIDASHI_DAILY",
		});
	};

	return (
		<SafeAreaWrapper title='Enter Asset Information' canScroll={true}>
			<Pad size={20} />
			<Typography title='Enter Asset Information' style={styles.screenTitle} />
			{/* <Typography
				title='Select Repayment type and Add the items your member is requesting and their prices'
				type='body-sr'
				style={styles.screenSubTitle}
			/> */}
			<Divider gapY={scaleHeight(12)} gapTop={scaleHeight(20)} />

			{/* <Dropdown
				label='Select Kidashi Type'
				selectedOption={selectedKidashiType}
				options={KIDASHI_TYPES}
				onSelect={(option) => setSelectedKidashiType(option)}
				placeholder='Select type'
			/> */}
			<Typography
				title='Kidashi Daily'
				type='body-sr'
				style={styles.screenSubTitle}
			/>
			<Divider gapY={scaleHeight(12)} />

			<View style={styles.itemListContainer}>
				<Row justifyContent='space-between' alignItems='center' gap={4}>
					<Row>
						<Typography title='Item list' type='body-sb' />
						<View style={styles.itemCountBadge}>
							<Typography
								title={items.length.toString()}
								type='body-sb'
								color={Colors.white}
							/>
						</View>
					</Row>
					<Pressable onPress={addItem} style={styles.addMoreButton}>
						<Image
							source={ScreenImages.kidashiMemberDetails.plusIcon}
							style={styles.plusIcon}
						/>
						<Typography
							title='Add more item'
							type='body-sb'
							color={Colors.primary[600]}
						/>
					</Pressable>
				</Row>
			</View>

			<Divider gapBottom={scaleHeight(16)} />
			{items.map((item, index) => (
				<View key={item.id} style={styles.itemRow}>
					<Typography
						title={`Item #${index + 1}`}
						type='body-sb'
						style={styles.itemLabel}
					/>
					<Row gap={scale(8)} alignItems='center'>
						<TextInput
							style={styles.itemInput}
							placeholder='Enter item'
							placeholderTextColor={Colors.gray["400"]}
							value={item.name}
							onChangeText={(value) => updateItem(item.id, "name", value)}
						/>
						<View style={styles.priceInputContainer}>
							<Typography title='₦' type='body-sb' style={styles.nairaPrefix} />
							<TextInput
								style={styles.priceInput}
								placeholder='0.00'
								placeholderTextColor={Colors.gray["400"]}
								value={addCommas(item.price)}
								onChangeText={(value) =>
									updateItem(item.id, "price", removeCommas(value))
								}
								keyboardType='decimal-pad'
							/>
						</View>
						<Pressable
							onPress={() => (index === 0 ? undefined : removeItem(item.id))}
							style={styles.deleteButton}
							disabled={index === 0}
						>
							<Image
								source={ScreenImages.kidashiMemberDetails.trashIcon}
								style={[
									styles.trashIcon,
									index === 0 && styles.trashIconDisabled,
								]}
							/>
						</Pressable>
					</Row>
				</View>
			))}
			<Divider gapY={scaleHeight(16)} gapX={scale(-16)} />
			<Button title='Next' onPress={proceed} />
		</SafeAreaWrapper>
	);
};

export default EnterAssetInformation;
