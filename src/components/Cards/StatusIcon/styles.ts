import { StyleSheet } from "react-native";
import { scale } from "../../../utils/Helpers";

const styles = StyleSheet.create({
    success: {
        width: scale(48),
        height: scale(48),
        padding: scale(12),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(32),
        backgroundColor: 'rgba(2, 171, 117, 0.15)',
    },
    pending: {
        width: scale(48),
        height: scale(48),
        padding: scale(12),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(32),
        backgroundColor: 'rgba(245, 158, 11, 0.15)',
    },
    error: {
        width: scale(48),
        height: scale(48),
        padding: scale(12),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(32),
        backgroundColor: 'rgba(239, 68, 68, 0.15)',
    },
    empty: {
        width: scale(48),
        height: scale(48),
        padding: scale(12),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(32),
        backgroundColor: 'rgba(239, 240, 240, 0.15)',
    },
    icon: {
        width: scale(24),
        height: scale(24),
        flexShrink: 0,
    },
})

export default styles;