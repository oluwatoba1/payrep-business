import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, BackHandler, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

import { MainLayout } from "@components/Layout";
import { Typography } from "@components/Forms";
import IconImages from "@assets/images/appIcons";
import { ProfileStackParamList } from "@navigation/types";
import { ProfileStep } from "@components/Miscellaneous";
import { UserProfileCard } from "@components/Cards";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { styles } from "./styles";
import useToast from "@hooks/useToast";
import { setCredentials } from "@store/slices/authSlice";
import Colors from "@theme/Colors";

interface IStep {
	title: string;
	description: string;
	stage: number;
	screen: keyof ProfileStackParamList;
}

const profileCompletion = {
	tierStage: "Tier 1 Account",
	body: "In compliance with CBN policies, kindly fill all up the informations",
	dailyLimit: "20,000",
	balanceLimit: "Unlimited",
};

let stages = [
	"PASSWORD_REGISTRATION",
	"BVN_VERIFICATION",
	"LOCATION",
	"IDENTIFICATION",
	"PEP",
	"SOURCE_OF_INCOME",
	"BUSINESS_INFORMATION",
	"PIN",
	"ATTESTATION",
];

let stagesDescription = [
	"",
	"Verify your BVN/NIN to link your identity and prevent fraud.",
	"Confirm your current location to meet regulatory requirements.",
	"Upload a valid government-issued ID to confirm your identity.",
	"Tell us if you’re a Politically Exposed Person (PEP).",
	"Provide details about how you earn to comply with anti-money laundering laws.",
	"Share your business details if you're registering as a business owner.",
	"Set a secure 4-digit PIN to protect your transactions.",
	"Review and accept our terms to complete your registration.",
];

let screens = [
	"ProfileSetupIntro",
	"KycVerification",
	"LocationDetails",
	"MeansOfIdentification",
	"Pep",
	"SourceOfIncome",
	"BusinessInformation",
	"Pin",
	"Attestation",
];

type ProfileCompletionIntroProps = StackScreenProps<
	ProfileStackParamList,
	"ProfileCompletionIntro"
>;

export default function ProfileCompletionIntro({
	navigation: { navigate },
}: ProfileCompletionIntroProps) {
	const dispatch = useAppDispatch();
	const customer = useAppSelector((state) => state.customer.customer);

	console.log("customer------>", customer);

	const stage = customer?.stage || "PASSWORD_REGISTRATION";

	const { showToast } = useToast();

	const [profileSetupMap, setProfileSetupMap] = useState<
		Record<string, number>
	>({});
	const [steps, setSteps] = useState<IStep[]>([]);

	const generateProfileSetupMap = () => {
		const map: Record<string, number> = {};
		if (customer?.type !== "corporate") {
			stages = stages.filter((stage) => stage !== "BUSINESS_INFORMATION");
		}
		stages.forEach((stage, index) => {
			map[stage] = index;
		});
		setProfileSetupMap(map);
		generateSteps(stages, map);
	};

	const generateSteps = (stages: string[], map: Record<string, number>) => {
		if (customer?.type !== "corporate") {
			screens = screens.filter((screen) => screen !== "BusinessInformation");
			stagesDescription = stagesDescription.filter((_, index) => index !== 6);
		}
		const steps: IStep[] = [];
		stages.forEach((stage, index) => {
			const title = stage.split("_").join(" ");
			steps.push({
				title,
				description: stagesDescription[index],
				stage: index,
				screen: screens[map[stage]] as keyof ProfileStackParamList,
			});
		});
		setSteps(steps);
	};

	const handleNavigation = (step: IStep) => {
		if ((profileSetupMap[stage] || 0) + 1 === step.stage) {
			navigate(step.screen as keyof ProfileStackParamList);
		} else if ((profileSetupMap[stage] || 0) === step.stage) {
			showToast("warning", "This step has already been completed");
		} else {
			showToast("warning", "The previous step is not yet completed");
		}
	};

	useFocusEffect(
		useCallback(() => {
			const backAction = () => {
				Alert.alert("Hold on!", "Are you sure you want to logout?", [
					{ text: "Cancel", onPress: () => null, style: "cancel" },
					{
						text: "YES",
						onPress: () =>
							dispatch(setCredentials({ token: null, user_id: null })),
					},
				]);
				return true; // Prevent default behavior
			};

			const backHandler = BackHandler.addEventListener(
				"hardwareBackPress",
				backAction
			);

			return () => backHandler.remove(); // Cleanup
		}, [])
	);

	useEffect(() => {
		customer && generateProfileSetupMap();
	}, [customer]);

	return (
		<MainLayout
			rightTitle='Complete Profile'
			keyboardAvoidingType='scroll-view'
			backAction={() => {}}
		>
			<View style={styles.userCardContainer}>
				<UserProfileCard
					profileImage={
						!!customer?.image
							? { uri: customer.image }
							: IconImages.users.defaultUser
					}
					username={
						(customer?.first_name || "") + " " + (customer?.surname || "")
					}
					mobileNumber={customer?.mobile_number || ""}
				/>
			</View>
			<View style={styles.cardContent}>
				<View>
					<Typography
						title={profileCompletion.tierStage}
						type='subheading-sb'
					/>
					<Typography title={profileCompletion.body} type='body-r' />
				</View>
				<View style={styles.limitContainer}>
					<View style={styles.limitItem}>
						<Typography
							type='label-r'
							title='Daily Limit: '
							style={styles.limitText}
						/>
						<Typography
							type='label-r'
							title={profileCompletion.dailyLimit}
							style={styles.limitText}
						/>
					</View>
					<View style={styles.limitItem}>
						<Typography
							type='label-r'
							title='Balance Limit: '
							style={styles.limitText}
						/>
						<Typography
							type='label-r'
							title={profileCompletion.balanceLimit}
							style={styles.limitText}
						/>
					</View>
				</View>

				{steps.length ? (
					[...steps]
						.slice(1)
						.map((step, index) => (
							<ProfileStep
								key={index}
								index={index + 1}
								title={step.title}
								description={step.description}
								completed={(profileSetupMap[stage] || 0) >= step.stage}
								isLastStep={index === steps.length - 1}
								handleNavigation={() => handleNavigation(step)}
							/>
						))
				) : (
					<ActivityIndicator size={18} color={Colors.black} />
				)}
			</View>
		</MainLayout>
	);
}
