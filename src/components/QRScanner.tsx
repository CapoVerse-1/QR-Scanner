'use client';

import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface QRScannerProps {
  onScan: (qrCode: string) => void;
  fps?: number;
  qrBox?: number;
}

export default function QRScanner({ onScan, fps = 10, qrBox = 250 }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize scanner
    scannerRef.current = new Html5Qrcode('qr-reader');
    
    return () => {
      if (scannerRef.current && isScanning) {
        scannerRef.current.stop().catch(err => console.error('Error stopping scanner:', err));
      }
    };
  }, []);

  const startScanner = async () => {
    setError(null);
    
    if (!scannerRef.current) {
      setError('Scanner not initialized');
      return;
    }
    
    try {
      const qrCodeSuccessCallback = (decodedText: string) => {
        onScan(decodedText);
        // Don't stop scanning automatically
      };
      
      const qrCodeErrorCallback = (errorMessage: string) => {
        // This is called when QR detection fails, but we don't need to show these errors
        // console.error('QR Error:', errorMessage);
      };
      
      const config = { fps, qrbox: qrBox };
      await scannerRef.current.start(
        { facingMode: "environment" },
        config,
        qrCodeSuccessCallback,
        qrCodeErrorCallback
      );
      
      setIsScanning(true);
    } catch (err) {
      setError('Error accessing camera: ' + (err instanceof Error ? err.message : String(err)));
      console.error('Error starting scanner:', err);
    }
  };
  
  const stopScanner = async () => {
    if (scannerRef.current && isScanning) {
      try {
        await scannerRef.current.stop();
        setIsScanning(false);
      } catch (err) {
        console.error('Error stopping scanner:', err);
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div
        id="qr-reader"
        ref={containerRef}
        className="w-full max-w-md overflow-hidden rounded-xl"
        style={{ height: qrBox }}
      />
      
      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <div className="mt-6 flex space-x-3">
        {!isScanning ? (
          <button
            onClick={startScanner}
            className="ios-btn bg-blue-500 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            Start Camera
          </button>
        ) : (
          <button
            onClick={stopScanner}
            className="ios-btn bg-gray-500 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-8h1V4h-1v1zm1 3V6h-1v2h1zm-1 1h1v2h-1V9zm-6 2h4v-2H7v2zm-2 3h12V5H5v9z" clipRule="evenodd" />
            </svg>
            Stop Camera
          </button>
        )}
      </div>
    </div>
  );
} 