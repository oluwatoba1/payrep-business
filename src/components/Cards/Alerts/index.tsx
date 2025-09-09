import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import ComponentImages from '../../../../assets/images/components';
import { useEffect, useState } from "react";

interface AlertProps {
    type : string,
    content: string,
}



const Alerts = ({ type, content }: AlertProps) => {
    const [isVisible, setIsVisible] = useState(true);
    

    const handleClose = () => {
        setIsVisible(false);
    };

    switch (type) {
        case 'success':
            let timerId;

            useEffect(() => {
                timerId = setTimeout(() => {
                    handleClose();
                }, 5000); // 5 seconds

                return () => clearTimeout(timerId); 
            }, [handleClose]);
            return isVisible ? (
                <View style={styles.successBody}>
                    <View style={styles.container}>
                        <Image source={ComponentImages.alerts.successIcon} style={styles.icon}></Image>
                        <Text style={styles.successText}>Device Registration Successful</Text>

                    </View>
                    <TouchableOpacity onPress={handleClose}>
                        <Image source={ComponentImages.alerts.closeIcon} style={styles.xicon}></Image>
                    </TouchableOpacity>
                </View>
            ) : null
            break;
        case 'info':
            return isVisible ? (
                <View style={styles.infoBody}>
                    <View style={styles.container}>
                        <Image source={ComponentImages.alerts.infoIcon} style={styles.icon}></Image>
                        <Text style={styles.infoText}>Device Registration Successful</Text>

                    </View>
                    <TouchableOpacity onPress={handleClose}>
                        <Image source={ComponentImages.alerts.closeIcon} style={styles.xicon}></Image>
                    </TouchableOpacity>
                </View>
            ) : null
            break;
        case 'error':
            return isVisible ? (
                <View style={styles.errorBody}>
                    <View style={styles.container}>
                        <Image source={ComponentImages.alerts.errorIcon} style={styles.icon}></Image>
                        <Text style={styles.errorText}>Device Registration Successful</Text>

                    </View>
                    <TouchableOpacity onPress={handleClose}>
                        <Image source={ComponentImages.alerts.closeIcon} style={styles.xicon}></Image>
                    </TouchableOpacity>
                </View>
            ) : null
            break;
        default:
            break;
    }
    
}

export default Alerts;