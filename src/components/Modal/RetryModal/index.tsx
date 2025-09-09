import React from 'react';
import { 
  View, 
} from 'react-native';
import { Typography, Button } from '@components/Forms';
import { ModalWrapper } from '..';
import { styles } from './styles';

interface RetryPinModalProps {
  showModal: boolean;
  isLocked: boolean;
  onClose: () => void;
  onRetry: () => void;
  attemptsLeft?: number;
  errorMessage?: string;
}

export default function RetryPinModal({
  showModal,
  onClose,
  onRetry,
  attemptsLeft,
  errorMessage,
  isLocked 
}: RetryPinModalProps) {
  
  // const remainingAttempts = Math.max(0, attemptsLeft);
  // const isLocked = remainingAttempts <= 0;
  
  
  const handleRetry = () => {
    if (!isLocked) {
      onRetry(); 
    }
  };
  
  return (
    <ModalWrapper 
      visible={showModal} 
      onClose={onClose} 
      transparent={true}
      animationType="fade"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <View style={[styles.alertIcon, isLocked && styles.lockedIcon]}>
              <View style={styles.exclamation} />
              <View style={styles.dot} />
            </View>
          </View>
          
          <Typography 
            title={isLocked ? "Account Locked" : "Incorrect PIN"} 
            type="body-sb" 
            style={styles.title} 
          />

          {/* {errorMessage && <Typography title={errorMessage} type="body-sr" />} */}
          
          {isLocked ? (
            <Typography 
              title="You have exceeded the maximum number of attempts. Your account has been locked for security reasons." 
              type="body-sr" 
              style={styles.subtitle} 
            />
          ) : (
            <Typography 
              title={errorMessage || ""} 
              type="body-sr" 
              style={styles.subtitle} 
            />
          )}
        </View>
        
        <View style={styles.buttonContainer}>
          {isLocked ? (
            <Button 
              title="Contact Support" 
              onPress={() => {}} 
              style={styles.supportButton} 
            />
          ) : (
            <>
              <Button 
                title="Try Again" 
                onPress={handleRetry} 
                style={styles.retryButton} 
              />
              
            </>
          )}
        </View>
      </View>
    </ModalWrapper>
  );
}



