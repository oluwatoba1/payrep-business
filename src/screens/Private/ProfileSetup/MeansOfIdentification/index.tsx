import { Fragment, useCallback } from "react";
import { BackHandler } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useFocusEffect } from "@react-navigation/native";
import { types } from "@react-native-documents/picker";

import { MainLayout, Row } from "@components/Layout";
import { Button, FileUploader, Radio, Typography } from "@components/Forms";

import Pad from "@components/Pad";
import { ProfileStackParamList } from "@navigation/types";
import useToast from "@hooks/useToast";
import { DEFAULT_ERROR_MESSAGE, IDCardTypes } from "@utils/Constants";
import { useUploadMeansofIdentificationMutation } from "@store/apis/complianceApi";
import useDocumentValidation from "./validators";
import { chunkArray } from "@utils/Helpers";
import styles from "./styles";

type MeansOfIdentificationProps = StackScreenProps<
	ProfileStackParamList,
	"MeansOfIdentification"
>;

export default function MeansOfIdentification({
	navigation: { navigate },
}: MeansOfIdentificationProps) {
	const { showToast } = useToast();
	const { formData, validateForm, setFile, setDocumentType } =
		useDocumentValidation(showToast);

	const [uploadMeansofIdentification, { isLoading }] =
		useUploadMeansofIdentificationMutation();

	const submit = async () => {
		const fd = new FormData();

		fd.append("file", {
			uri: formData.file[0].uri,
			name: formData.file[0].name,
			type: formData.file[0].type,
		});
		fd.append("document_class", "identification");
		fd.append("document_type", formData.documentType);

		try {
			const { status, message } = await uploadMeansofIdentification(
				fd
			).unwrap();
			if (status) {
				navigate("Pep");
			} else {
				showToast("danger", message);
			}
		} catch (error: ErrorResponse | any) {
			showToast(
				"danger",
				error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
			);
		}
	};

	useFocusEffect(
		useCallback(() => {
			const backAction = () => {
				navigate("ProfileCompletionIntro");
				return true; // Prevent default behavior
			};

			const backHandler = BackHandler.addEventListener(
				"hardwareBackPress",
				backAction
			);

			return () => backHandler.remove(); // Cleanup
		}, [])
	);

	return (
		<MainLayout
			backAction={() => navigate("ProfileCompletionIntro")}
			keyboardAvoidingType='scroll-view'
			isLoading={isLoading}
		>
			<Typography title='Identification Card' type='heading4-sb' />
			<Typography
				type='body-r'
				title="Please upload a photo of a valid ID to upload. Accepted forms include: international passport, driver's license, voter's card, or national ID card. This helps us verify that your ID matches your photo."
			/>

			<Pad size={16} />

			<Typography title='Choose your ID card type' type='body-sb' />

			<Pad size={8} />

			{chunkArray(IDCardTypes, 2).map((chunk, i) => (
				<Fragment key={i}>
					<Row justifyContent='space-between'>
						{chunk.map((type, j) => (
							<Row
								key={`${i}-${j}`}
								gap={16}
								containerStyle={styles.idCardContainer}
							>
								<Radio
									label={type.label}
									value={formData.documentType === type.value}
									onPress={() => setDocumentType(type.value)}
								/>
							</Row>
						))}
					</Row>
					<Pad size={16} />
				</Fragment>
			))}

			<FileUploader
				file={formData.file.length > 0 ? formData.file[0] : null}
				onChoose={setFile}
				type={[types.images]}
				notifier={(message) => showToast("warning", message)}
			/>

			<Button title='Save' onPress={() => validateForm(submit)} />
			<Pad size={40} />
		</MainLayout>
	);
}
