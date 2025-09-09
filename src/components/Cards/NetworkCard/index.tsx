import {View} from 'react-native';
import CustomCard from '../CustomCard';
import {Typography} from '../../Forms';
import {styles} from './styles';
import {CircularProgressBar} from '@components/Miscellaneous';

// Types for individual card items
interface CardTypes {
  percent: number;
  cardName: string;
}

// Types for each network item
interface NetworkItemsProps {
  percent?: number;
  bankName: string;
  description?: string;
  cardTypes?: CardTypes[];
}

interface NetworkCardProps {
  networkItems: NetworkItemsProps[];
  networkcardType: 'default' | 'cards';
}

export default function NetworkCard({
  networkItems,
  networkcardType,
}: NetworkCardProps) {
  const getEmoji = (percent: number): string => {
    switch (true) {
      case percent === 100:
        return '😄';
      case percent >= 60:
        return '😊';
      case percent >= 35 && percent <= 59:
        return '🤔';
      case percent > 10 && percent < 35:
        return '😠';
      case percent <= 10:
        return '😡';
      default:
        return '🤔';
    }
  };

  return (
    <>
      {networkItems.map((item, index) => (
        <CustomCard
          key={index}
          visible
          customContainerStyle={styles.cardContainer}>
          {networkcardType === 'default' && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{gap: 12, flexDirection: 'row', alignItems: 'center'}}>
                <CircularProgressBar
                  strokeWidth={7}
                  progress={item.percent || 0}
                  radius={30}
                  progressBarType={
                    item.percent || 0 >= 50 ? 'success' : 'danger'
                  }
                />

                <View>
                  <Typography title={item.bankName} type="body-sb" />
                  {item.description && (
                    <Typography title={item.description} type="body-r" />
                  )}
                </View>
              </View>

              <View>
                <Typography title={getEmoji(item.percent || 0)} />
              </View>
            </View>
          )}

          {networkcardType === 'cards' && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignSelf: 'flex-start',
                alignItems: 'center',
              }}>
              <View>
                <Typography title={item.bankName} type="body-sb" />
              </View>
              <View style={styles.verticalLine} />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 12,
                }}>
                {item.cardTypes?.map((card, cardIndex) => (
                  <View
                    key={cardIndex}
                    style={{
                      alignItems: 'center',
                      marginHorizontal: 10,
                      gap: 10,
                    }}>
                    <Typography title={card.cardName} type="body-sb" />

                    <CircularProgressBar
                      strokeWidth={5}
                      progress={card.percent || 0}
                      radius={25}
                      progressBarType={
                        item.percent || 0 >= 50 ? 'success' : 'danger'
                      }
                    />

                    <Typography title={getEmoji(card.percent || 0)} />
                  </View>
                ))}
              </View>
            </View>
          )}
        </CustomCard>
      ))}
    </>
  );
}
