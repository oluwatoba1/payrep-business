import {Dimensions, StyleSheet} from 'react-native';
import {PNR, PNSB} from '../../../theme/Fonts';
import {scale, scaleHeight} from '../../../utils/Helpers';
import Colors from '../../../theme/Colors';
import {MAIN_LAYOUT_HORIZONTAL_PADDING, width} from '../../../utils/Constants';

const styles = StyleSheet.create({
  disputeContainer: {
    flexDirection: 'column',
    gap: scale(12),
  },
  headerText: {
    textAlign: 'left',
    color: Colors.gray[600],
  },
  disputeCardsContainer: {
    gap: scale(12),
    width: '100%',
    // alignItems: 'flex-start'
  },
  emptyDisputesContainer: {
    marginTop: scale(32),
    alignItems: 'center',
  },
  emptyBox: {
    width: scale(64),
    height: scale(64),
  },
  emptyTx: {
    color: Colors.gray[400],
    textAlign: 'center',
  },

  disputeCard: {
    gap: scale(12),
    alignItems: 'flex-start',
  },
  disputeCardContainer: {
    width: scale(195),
    padding: scale(16),
    borderWidth: scale(0.2),
    borderColor: Colors.gray[300],
    alignItems: 'flex-start',
    borderRadius: scale(8),
    backgroundColor: Colors.white,
    gap: scale(16),
    flexShrink: scale(0),
  },
  disputeDetailsContainer: {
    alignItems: 'flex-start',
    gap: scale(2),
    alignSelf: 'stretch',
  },
  disputeTrackingID: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: scale(4),
    alignSelf: 'stretch',
  },
  disputeDate: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: scale(4),
    alignSelf: 'stretch',
  },
  disputeItemContainer: {
    gap: scale(12),
  },
  viewMoreText: {
    textAlign: 'right',
  },
  arrowIcon: {
    width: scale(24),
    height: scaleHeight(24)
  },
  more: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'flex-end',
    gap: scale(4)
  }
});

export default styles;
