import React from 'react';

interface DialPadProps {
  onDigitPress: (digit: string) => void;
}

export function DialPad({ onDigitPress }: DialPadProps) {
  const digits = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '#']
  ];
  
  const getSubText = (digit: string) => {
    const subTextMap: Record<string, string> = {
      '1': '',
      '2': 'ABC',
      '3': 'DEF',
      '4': 'GHI',
      '5': 'JKL',
      '6': 'MNO',
      '7': 'PQRS',
      '8': 'TUV',
      '9': 'WXYZ',
      '0': '+',
      '*': '',
      '#': ''
    };
    
    return subTextMap[digit] || '';
  };
  
  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-xs mx-auto">
      {digits.map((row, rowIndex) => (
        <React.Fragment key={`row-${rowIndex}`}>
          {row.map((digit) => (
            <button
              key={digit}
              onClick={() => onDigitPress(digit)}
              className="flex flex-col items-center justify-center bg-neutral-200 hover:bg-neutral-300 rounded-full w-16 h-16 text-center"
            >
              <span className="text-2xl font-medium text-neutral-900">{digit}</span>
              <span className="text-[10px] text-neutral-500 mt-1">{getSubText(digit)}</span>
            </button>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
