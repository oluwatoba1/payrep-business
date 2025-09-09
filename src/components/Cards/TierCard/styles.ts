import { StyleSheet } from 'react-native';
import { scale, scaleHeight } from '../../../utils/Helpers';
import Colors from '../../../theme/Colors';

export const styles = StyleSheet.create({
    cardContainer: {
        padding: scaleHeight(16),
        marginTop: scaleHeight(24),
        backgroundColor: Colors.white,
        borderRadius: scaleHeight(8),
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        gap: scaleHeight(16)
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: scaleHeight(8),
    },
    tierRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: scale(8),
    },
    starIcon: {
        width: scale(16),
        height: scaleHeight(16),
        marginRight: scale(2),
    },
    lightCard: {
        backgroundColor: Colors.white,
    },
    blurredCard: {
        backgroundColor: Colors.gray[50],
        opacity: 0.5,
    },
});