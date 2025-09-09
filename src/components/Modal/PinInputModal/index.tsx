import React, { useState, useEffect } from 'react';
import { 
  View, 
  Image, 
  ImageSourcePropType, 
} from 'react-native';
import { PinPad, Typography } from '@components/Forms';
import { ModalWrapper } from '..';
import { styles } from './styles';

interface PinInputProps {
  title: string;
  image?: ImageSourcePropType;
  showModal: boolean;
  onClose: () => void;
  onProceed: (pin: string) => Promise<boolean>;
  isLoadingPin?: boolean;
}

export default function PinInputModal({
  title,
  image,
  showModal,
  onClose,
  onProceed,
  isLoadingPin = false,

}: PinInputProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false);

  
  
  useEffect(() => {
    if (!showModal) {
      setPin('');
      setError('');
      setIsLoading(false);
    }
  }, [showModal]);
  
  

  const handleProceed = async (newPin: string) => {
    setPin(newPin);
    if (newPin.length === 4 && !isLoading) {
      setIsLoading(true);
      try {
        const success = await onProceed(newPin);
        if (!success) {
          setError('Invalid PIN. Please try again');
          setPin('');
        }
      } catch (error) {
        setError('An error occurred. Please try again');
        setPin('');

      } finally {
        setIsLoading(false);
      }  
    }
    
  };
  // Render PIN dots
  const renderPinDots = () => {
    const dots = [];
    for (let i = 0; i < 4; i++) {
      const isFilled = i < pin.length;
      dots.push(
        <View
          key={i}
          style={[styles.pinDot, isFilled ? styles.pinDotFilled : {}]}
        />,
      );
    }
    return <View style={styles.pinDotsContainer}>{dots}</View>;
  };

  return (
    <ModalWrapper isLoading={isLoading || isLoadingPin} visible={showModal} onClose={onClose} modalContentStyle={{height:600}}>
      <View style={styles.container}>
        <View style={styles.header}>
          {image ? (
            <Image source={image} style={styles.image} />
          ) : (
            <View style={styles.iconContainer}>
              <View style={styles.lockIcon}>
                <View style={styles.lockBody} />
                <View style={styles.lockShackle} />
              </View>
            </View>
          )}

          {/* Title */}
          <Typography title={title} type="body-sb" style={styles.title} />
          {renderPinDots()}
        </View>

        <View style={styles.pinPadContainer}>
          <PinPad 
            codeLength={4} 
            pin={pin} 
            onInput={handleProceed} 
            secure={true}
            pinScale={8}
            error=''
            
          />
        </View>
      </View>
    </ModalWrapper>
  );
}
