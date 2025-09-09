import React from 'react';
import { Image, ImageURISource } from 'react-native';
import { Typography } from '../../Forms';
import { StackNavigationProp } from '@react-navigation/stack';
import { PrivateNavigatorParamList } from '../../../navigation/types';
import { styles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface BillCategory {
    name: string;
    icon: ImageURISource;
    description: string;
}

interface IBillPaymentCardProps {
    navigation?: StackNavigationProp<PrivateNavigatorParamList>;
    billCategory: BillCategory;
}

const BillPaymentCard: React.FC<IBillPaymentCardProps> = ({ billCategory }) => {

    const formatScreenName = (name: string) => {
        return name.replace(/\s+/g, '') + 'Screen';
    };

    // const handleNavigation = (item: BillItem) => {
    //     const screenName = formatScreenName(item.name);
    //     navigation?.navigate(screenName);
    // };

    return (
        <TouchableOpacity style={styles.category} >
            <Typography title={billCategory.name} type='body-b'/>
            <Image source={billCategory.icon} style={styles.categoryIcon}/>
            <Typography title={billCategory.description} type='body-r' style={{textAlign: 'center'}}/>
        </TouchableOpacity>
    );
};


export default BillPaymentCard;
