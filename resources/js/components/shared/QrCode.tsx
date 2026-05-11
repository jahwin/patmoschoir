// import { QRCodeSVG } from 'qrcode.react';

interface QrCodeProps {
  value: string;
  size?: number;
  level?: 'L' | 'M' | 'Q' | 'H';
  includeMargin?: boolean;
  marginSize?: number;
  bgColor?: string;
  fgColor?: string;
  className?: string;
}

function QrCode({ 
  value, 
  size = 200, 
  level = 'M', 
  includeMargin = true, 
  marginSize = 2,
  bgColor = '#ffffff',
  fgColor = '#000000',
  className = '',
}: QrCodeProps) {

  return (
    <></>
    // <QRCodeSVG
    //   value={value}
    //   size={size}
    //   level={level}
    //   includeMargin={includeMargin}
    //   marginSize={marginSize}
    //   bgColor={bgColor}
    //   minVersion={3}
    //   fgColor={fgColor}
    //   className={className}
    // />
  );
}

export default QrCode;
