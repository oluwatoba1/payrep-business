import {useCallback} from 'react';
import {BackHandler} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import {MainLayout} from '@components/Layout';
import {Typography} from '@components/Forms';
import SavingsCard from '@components/Cards/SavingsCard';
import {mainSavingsStyles} from '../styles';
import ScreenImages from '@assets/images/screens';
import {SavingDescriptionCard} from '@components/Cards';
import {StackScreenProps} from '@react-navigation/stack';
import {BottomTabParamList, SavingsStackParamList} from '@navigation/types';
import Pad from '@components/Pad';

type SavingsScreenProps = StackScreenProps<SavingsStackParamList>;

export default function SavingsScreen({
  navigation: {navigate, goBack},
}: SavingsScreenProps) {
  const hasEasySavings = false;
  const isAutomatedSavings = true;

  const {reset} = useNavigation<BottomTabNavigationProp<BottomTabParamList>>();

  const handleAddEasyNavigate = () => {
    navigate('AddEasySavingsScreen');
  };

  const handleAutomatedSavingsNavigate = () => {
    navigate('AutomatedSavingsScreen');
  };

  const handleLockedSavingsNavigate = () => {
    navigate('LockedSavingsScreen');
  };

  const handleNavigateWithdrawList = () => {
    navigate('WithdrawSavingsListsScreen');
  };

  const handleTotalSavingsNavigate = () => {
    navigate('TotalSavingsScreen');
  };

  const handleEasySavingsListNavigate = () => {
    navigate('EasySavingsListScreen');
  };

  const handleEditEasySavingsNavigate = () => {
    navigate('EditEasySavingsScreen');
  };

  const handleAutoEasySavingsWithdrawNavigate = () => {
    navigate('AutomatedSavingsWithdrawScreen');
  };

  const handleAutoEasySavingsListNavigate = () => {
    navigate('AutoEasySavingsListScreen');
  };

  const navigateToHome = () => {
    reset({
      index: 0,
      routes: [
        {
          name: 'Home',
          state: {
            index: 0,
            routes: [{name: 'Dashboard'}],
          },
        },
      ],
    });
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        navigateToHome,
      );

      return () => backHandler.remove(); // Cleanup
    }, []),
  );

  return (
    <MainLayout
      backAction={navigateToHome}
      keyboardAvoidingType="scroll-view"
      hasBottomTabBar={true}>
      <Typography title="Savings" />
      <Pad size={16} />
      <Typography
        title="Kick off your savings journey and tailor them to match your goals and preferences."
        type="body-r"
      />
      <SavingsCard
        totalSavings="N489,000"
        progress={50}
        progressBarText="Savings goal"
        progressBarColor="#CCE3FF"
        progressBarBackgroundColor="#00387A"
        onWithdraw={handleNavigateWithdrawList}
        showWithdrawButton={false}
        showProgressBar={false}
        showImage={false}
        imageSource={ScreenImages.SavingsScreen.money}
        cardTitle="Total Savings"
        onSavingsNavigate={handleTotalSavingsNavigate}
      />
      <Typography title="Savings Plan" />
      {hasEasySavings ? (
        <SavingsCard
          totalSavings="N489,000"
          progress={50}
          progressBarText="Savings goal"
          progressBarColor="#F9E2D2"
          progressBarBackgroundColor="#6C350F"
          showWithdrawButton={false}
          showProgressBar={true}
          showImage={false}
          cardTitle="Easy Savings"
          customContainerStyle={mainSavingsStyles.easySavingsCard}
          onSavingsNavigate={handleEditEasySavingsNavigate}
          onWithdraw={handleEasySavingsListNavigate}
          withdrawCustomStyle={mainSavingsStyles.easySavingsWithdraw}
        />
      ) : (
        <SavingDescriptionCard
          title="Easy Savings"
          description="Customize your savings to suit your needs-whether it's for personal goals, a vacation, or emergencies."
          interestRate="13% interest Per Annum"
          backgroundColor="#8B4513"
          badgeColor="#6C350F"
          imageSource={ScreenImages.SavingsScreen.piggyVestImage}
          imagePosition="bottom"
          onNavigate={handleAddEasyNavigate}
          // actionButtonBackgroundColor={[styles.easySavingActionButtonBackground, styles.actionButton]}
          // actionButtonTextColor={styles.easySavingActionButtonTextColor}
        />
      )}

      {isAutomatedSavings ? (
        <SavingsCard
          totalSavings="N489,000"
          progress={50}
          progressBarText="Savings goal"
          progressBarColor="#66B2B2"
          progressBarBackgroundColor="#005C5C"
          showWithdrawButton={false}
          showProgressBar={true}
          showImage={false}
          cardTitle="Auto-Easy Savings"
          customContainerStyle={mainSavingsStyles.automatedSavingsCard}
          withdrawCustomStyle={mainSavingsStyles.automatedSavingsWithdraw}
          onWithdraw={handleAutoEasySavingsWithdrawNavigate}
          onSavingsNavigate={handleAutoEasySavingsListNavigate}
        />
      ) : (
        <SavingDescriptionCard
          title="Auto-Easy Savings"
          description="Set up automated savings to reach your goals faster."
          interestRate="13% interest Per Annum"
          backgroundColor="#008080"
          badgeColor="#005C5C"
          imageSource={ScreenImages.SavingsScreen.piggyImage}
          imagePosition="bottom"
          onNavigate={handleAutomatedSavingsNavigate}
          // actionButtonBackgroundColor={[styles.automatedSavingActionButtonBackground, styles.actionButton]}
          // actionButtonTextColor={styles.automatedSavingActionButtonTextColor}
        />
      )}
      <SavingDescriptionCard
        title="Locked Savings"
        description="Lock your savings to avoid temptation and earn more interest."
        interestRate="13% interest Per Annum"
        backgroundColor="#4B0082"
        badgeColor="#35005C"
        imageSource={ScreenImages.SavingsScreen.purpleMoney}
        imagePosition="bottom"
        onNavigate={handleLockedSavingsNavigate}
        // actionButtonBackgroundColor={[styles.lockedSavingActionButtonBackground, styles.actionButton]}
        // actionButtonTextColor={styles.automatedSavingActionButtonTextColor}
      />
    </MainLayout>
  );
}
