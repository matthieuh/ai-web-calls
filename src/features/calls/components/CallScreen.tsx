import { useState, useEffect } from 'react';
import { useTwilioVoice } from '../hooks/useTwilioVoice';
import { CallButton } from './CallButton';
import { DialPad } from './DialPad';

interface CallScreenProps {
  initialPhoneNumber?: string;
  onClose: () => void;
}

export function CallScreen({ initialPhoneNumber = '', onClose }: CallScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
  const [showDialPad, setShowDialPad] = useState(!initialPhoneNumber);
  const [autoCallTriggered, setAutoCallTriggered] = useState(false);

  console.log('Initial phone number:', initialPhoneNumber);
  
  const {
    isInitializing,
    isReady,
    isConnecting,
    isOnCall,
    error,
    formattedDuration,
    startCall,
    endCall
  } = useTwilioVoice();
  
  // Auto-call when initialPhoneNumber is provided and device is ready
  useEffect(() => {
    console.log('Auto-calling check:', {
      initialPhoneNumber,
      isReady,
      autoCallTriggered,
      isOnCall,
      isConnecting
    });
    if (initialPhoneNumber && isReady && !autoCallTriggered && !isOnCall && !isConnecting) {
      console.log('Auto-calling with phone number:', initialPhoneNumber);
      startCall(initialPhoneNumber);
      setAutoCallTriggered(true);
    }
  }, [initialPhoneNumber, isReady, autoCallTriggered, isOnCall, isConnecting, startCall]);
  
  const handleDigitPress = (digit: string) => {
    setPhoneNumber(prev => prev + digit);
  };
  
  const handleBackspace = () => {
    setPhoneNumber(prev => prev.slice(0, -1));
  };
  
  const handleStartCall = () => {
    console.log('Starting call with phone number:', phoneNumber);
    if (phoneNumber) {
      startCall(phoneNumber);
    }
  };
  
  const handleEndCall = () => {
    endCall();
    if (initialPhoneNumber) {
      onClose();
    } else {
      setPhoneNumber('');
      setShowDialPad(true);
      setAutoCallTriggered(false);
    }
  };
  
  const formatPhoneNumber = (number: string) => {
    // Format phone number as (XXX) XXX-XXXX for US numbers
    if (!number) return '';
    
    // Strip non-numeric characters except +
    const cleaned = number.startsWith('+') 
      ? '+' + number.substring(1).replace(/\D/g, '')
      : number.replace(/\D/g, '');
    
    // Format US numbers
    if (cleaned.length === 10) {
      return `(${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6, 10)}`;
    }
    
    // Format US numbers with country code
    if (cleaned.startsWith('+1') && cleaned.length === 12) {
      return `+1 (${cleaned.substring(2, 5)}) ${cleaned.substring(5, 8)}-${cleaned.substring(8, 12)}`;
    }
    
    // Return as is for international or partial numbers
    return cleaned;
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-between py-12 z-50">
      {/* Status bar */}
      <div className="text-white text-center w-full">
        {isInitializing && <p>Initializing...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
      
      {/* Call info */}
      <div className="flex flex-col items-center justify-center">
        {isOnCall ? (
          <>
            <h2 className="text-white text-2xl font-medium mb-2">
              {formatPhoneNumber(phoneNumber)}
            </h2>
            <p className="text-white text-lg">{formattedDuration}</p>
          </>
        ) : isConnecting ? (
          <>
            <h2 className="text-white text-2xl font-medium mb-2">
              {formatPhoneNumber(phoneNumber)}
            </h2>
            <p className="text-white text-lg">Connecting...</p>
          </>
        ) : (
          <>
            {phoneNumber ? (
              <h2 className="text-white text-3xl font-medium mb-4">
                {formatPhoneNumber(phoneNumber)}
              </h2>
            ) : (
              <h2 className="text-white text-2xl font-medium mb-4">
                Enter a phone number
              </h2>
            )}
          </>
        )}
      </div>
      
      {/* Dial pad */}
      {showDialPad && !isOnCall && !isConnecting && (
        <div className="w-full max-w-md px-4">
          <DialPad onDigitPress={handleDigitPress} />
          
          <div className="flex justify-center mt-6">
            {phoneNumber && (
              <button 
                onClick={handleBackspace}
                className="text-white mr-4 p-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
      
      {/* Call controls */}
      <div className="flex justify-center space-x-8 mt-6">
        {isOnCall ? (
          <div className="flex space-x-8">
            <CallButton 
              variant="mute" 
              onClick={() => {}} 
              ariaLabel="Mute call"
            />
            <CallButton 
              variant="end" 
              onClick={handleEndCall} 
              ariaLabel="End call"
            />
            <CallButton 
              variant="speaker" 
              onClick={() => {}} 
              ariaLabel="Speaker"
            />
          </div>
        ) : isConnecting ? (
          <CallButton 
            variant="end" 
            onClick={handleEndCall} 
            ariaLabel="Cancel call"
          />
        ) : (
          <>
            {!showDialPad && (
              <CallButton 
                variant="keypad" 
                onClick={() => setShowDialPad(true)} 
                ariaLabel="Show keypad"
              />
            )}
            
            {phoneNumber && (
              <CallButton 
                variant="accept" 
                onClick={handleStartCall} 
                disabled={!isReady || !phoneNumber}
                ariaLabel="Start call"
              />
            )}
            
            <CallButton 
              variant="decline" 
              onClick={onClose} 
              ariaLabel="Cancel"
            />
          </>
        )}
      </div>
    </div>
  );
}
