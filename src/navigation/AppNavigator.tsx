import { NavigationContainer } from "@react-navigation/native";

import PrivateNavigator from "./PrivateNavigator";
import PublicNavigator from "./PublicNavigator";
import { useAppSelector } from "../store/hooks";

export default function AppNavigator() {
	const token = useAppSelector((state) => state.auth.credentials.token);

	return (
		<NavigationContainer>
			{!token ? <PrivateNavigator /> : <PublicNavigator />}
		</NavigationContainer>
	);
}
