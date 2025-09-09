import { Pressable, View } from "react-native";
import { Button, TextInput, Typography } from "../../Forms";
import  { ModalWrapper } from "..";
import { modalMainStyles } from "../styles";
import { scaleHeight } from "../../../utils/Helpers";

interface IDisputesModalProps {
    showModal: boolean;
    onClose: () => void;
    title: string;
    onSubmitDispute: () => void;
}

export default function DisputesModal({
    showModal,
    onClose,
    onSubmitDispute,
    title,
}: IDisputesModalProps) {

    const handleDispute = async () => {
        onClose()
        try {
            const success = await onSubmitDispute()
        }catch (error) {

            
        }
    }
    return (
        <ModalWrapper visible={showModal} onClose={onClose} modalContentStyle={{minHeight:scaleHeight(400)}}>
            <View style={modalMainStyles.header}>
                <Typography title={title} />
                <Pressable style={modalMainStyles.onClose} onPress={onClose}>
                    <Typography title='Close' />
                </Pressable>
            </View>

            <View style={modalMainStyles.listContainer}>
                <TextInput 
                    label="Message"
                    placeholder="Message"
                    multiline={true}
                    numberOfLines={5}
                    customTextInputStyle={{minHeight: scaleHeight(120)}} 
                
                />

                <Button title="Submit Dispute" onPress={handleDispute} />
            </View>
        </ModalWrapper>
    );
}
