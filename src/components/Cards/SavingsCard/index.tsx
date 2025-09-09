import React, {useState} from 'react';
import {View, Image, TouchableOpacity, Pressable} from 'react-native';
import {styles} from './styles';
import CustomCard from '../CustomCard';
import {HorizontalProgressBar} from '@components/Miscellaneous';
import ScreenImages from '@assets/images/screens';
import {Typography} from '@components/Forms';

interface SavingsCardProps {
  totalSavings: string;
  progress?: number;
  progressBarText?: string;
  progressBarColor?: string;
  progressBarBackgroundColor?: string;
  onWithdraw?: () => void;
  showWithdrawButton?: boolean;
  showProgressBar?: boolean;
  showImage?: boolean;
  showEditButton?: boolean;
  imageSource?: any;
  cardTitle: string;
  customContainerStyle?: {};
  withdrawCustomStyle?: {};
  onSavingsNavigate?: () => void;
  onEditNavigate?: () => void;
}

const SavingsCard: React.FC<SavingsCardProps> = ({
  cardTitle,
  totalSavings,
  progress = 0,
  progressBarText = 'Savings goal',
  progressBarColor = '#CCE3FF',
  progressBarBackgroundColor = '#00387A',
  onWithdraw,
  showWithdrawButton = true,
  showProgressBar = true,
  showImage = true,
  showEditButton = false,
  imageSource,
  customContainerStyle = {},
  withdrawCustomStyle = {},
  onSavingsNavigate,
  onEditNavigate,
}) => {
  const [showBalance, setShowBalance] = useState(false);

  const toggleBalanceVisibility = () => {
    setShowBalance(prevState => !prevState);
  };
  return (
    <View style={styles.container}>
      <CustomCard
        visible
        customContainerStyle={[styles.cardContainer, customContainerStyle]}
        onPress={onSavingsNavigate}>
        <View style={styles.contentContainer}>
          <View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Typography
                title={cardTitle}
                type="body-r"
                style={styles.textWhite}
              />
              {showWithdrawButton && (
                <View style={{flexDirection: 'row', gap: 4}}>
                  <Pressable
                    style={[styles.withdrawButton, withdrawCustomStyle]}
                    onPress={onWithdraw}
                    accessibilityLabel="Withdraw Savings">
                    <Typography title="Withdraw" style={styles.textWhite} />
                  </Pressable>
                  {showEditButton && (
                    <Pressable
                      style={[styles.withdrawButton, withdrawCustomStyle]}
                      onPress={onEditNavigate}
                      accessibilityLabel="Withdraw Savings">
                      <Typography title="Edit" style={styles.textWhite} />
                    </Pressable>
                  )}
                </View>
              )}
            </View>
            <View style={styles.savingsContainer}>
              <View style={styles.savingsAmountContainer}>
                <Typography
                  title={showBalance ? totalSavings : '**************'}
                  type="heading4-b"
                  style={styles.textWhite}
                />
                <TouchableOpacity
                  accessibilityLabel="Toggle Savings Visibility"
                  onPress={toggleBalanceVisibility}>
                  <Image
                    source={
                      showBalance
                        ? ScreenImages.SavingsScreen.hideIcon
                        : ScreenImages.SavingsScreen.showIcon
                    }
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {showProgressBar && (
            <View style={styles.progressBarContainer}>
              <HorizontalProgressBar
                progress={progress}
                text={progressBarText}
                textStyle={styles.textWhite}
                progressBarStyle={[
                  styles.progressBar,
                  {backgroundColor: progressBarColor},
                ]}
                barBackgroundContainerStyle={[
                  styles.progressBarBackground,
                  {backgroundColor: progressBarBackgroundColor},
                ]}
              />
            </View>
          )}
        </View>
      </CustomCard>
      {showImage && imageSource && (
        <Image source={imageSource} style={styles.moneyImage} />
      )}
    </View>
  );
};

export default SavingsCard;
