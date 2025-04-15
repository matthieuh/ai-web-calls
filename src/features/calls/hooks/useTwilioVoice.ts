import { useState, useEffect, useRef, useCallback } from 'react';
import { Call, Device } from '@twilio/voice-sdk';
import { formatDuration } from '~/utils/formatters';

interface CallState {
  isInitializing: boolean;
  isReady: boolean;
  isConnecting: boolean;
  isOnCall: boolean;
  error: string | null;
  callDuration: number;
  phoneNumber: string | null;
}

export function useTwilioVoice() {
  const [callState, setCallState] = useState<CallState>({
    isInitializing: true,
    isReady: false,
    isConnecting: false,
    isOnCall: false,
    error: null,
    callDuration: 0,
    phoneNumber: null,
  });
  
  const deviceRef = useRef<Device | null>(null);
  const callRef = useRef<Call | null>(null);
  const timerRef = useRef<number | null>(null);
  
  const initializeDevice = useCallback(async () => {
    try {
      setCallState(prev => ({ ...prev, isInitializing: true, error: null }));
      
      const response = await fetch('/api/calls/token');
      const data = await response.json();

      console.log('Twilio token:', data.token);
      
      const device = new Device(data.token, {
        logLevel: 'debug',
        codecPreferences: [Call.Codec.Opus, Call.Codec.PCMU],
      });

      device.register();
      
      device.on('registered', () => {
        console.log('Twilio device is ready for calls');
        setCallState(prev => ({ ...prev, isInitializing: false, isReady: true }));
      });
      
      device.on('error', (error: Error) => {
        console.error('Twilio device error:', error);
        setCallState(prev => ({ 
          ...prev, 
          isInitializing: false, 
          error: error.message || 'An error occurred with the call device' 
        }));
      });
      
      deviceRef.current = device;
    } catch (error) {
      console.error('Error initializing Twilio device:', error);
      setCallState(prev => ({ 
        ...prev, 
        isInitializing: false, 
        error: error instanceof Error ? error.message : 'Failed to initialize call device' 
      }));
    }
  }, []);
  
  const startCall = useCallback(async (phoneNumber: string) => {
    if (!deviceRef.current || !phoneNumber) return;
    
    try {
      setCallState(prev => ({ 
        ...prev, 
        isConnecting: true, 
        error: null,
        phoneNumber 
      }));
      
      const call = await deviceRef.current.connect({
        params: {
          To: phoneNumber,
        }
      });
      
      call.on('accept', () => {
        setCallState(prev => ({ 
          ...prev, 
          isConnecting: false, 
          isOnCall: true 
        }));
        
        timerRef.current = window.setInterval(() => {
          setCallState(prev => ({ ...prev, callDuration: prev.callDuration + 1 }));
        }, 1000);
      });
      
      call.on('disconnect', () => {
        endCallCleanup();
      });
      
      call.on('error', (error) => {
        console.error('Call error:', error);
        setCallState(prev => ({ 
          ...prev, 
          error: error.message || 'An error occurred with the call' 
        }));
        endCallCleanup();
      });
      
      callRef.current = call;
    } catch (error) {
      console.error('Error starting call:', error);
      setCallState(prev => ({ 
        ...prev, 
        isConnecting: false, 
        error: error instanceof Error ? error.message : 'Failed to start call' 
      }));
    }
  }, []);
  
  const endCall = useCallback(() => {
    if (callRef.current) {
      callRef.current.disconnect();
    }
    endCallCleanup();
  }, []);
  
  const endCallCleanup = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    callRef.current = null;
    
    setCallState(prev => ({ 
      ...prev, 
      isConnecting: false, 
      isOnCall: false,
      phoneNumber: null,
    }));
    
    setTimeout(() => {
      setCallState(prev => ({ ...prev, callDuration: 0 }));
    }, 2000);
  }, []);
  
  useEffect(() => {
    console.log('Initializing Twilio device...');
    initializeDevice();
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      if (callRef.current) {
        callRef.current.disconnect();
      }
      
      if (deviceRef.current) {
        deviceRef.current.destroy();
      }
    };
  }, [initializeDevice]);
  

  
  return {
    ...callState,
    formattedDuration: formatDuration(callState.callDuration),
    startCall,
    endCall,
    initializeDevice,
  };
}
