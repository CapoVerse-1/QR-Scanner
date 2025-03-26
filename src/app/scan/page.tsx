'use client';

import { useState } from 'react';
import Link from 'next/link';
import QRScanner from '../../components/QRScanner';
import { validateTicket } from '../../lib/ticketStore';

export default function ScanPage() {
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    message: string;
    timestamp?: string;
  } | null>(null);

  const handleScan = (qrCode: string) => {
    try {
      const result = validateTicket(qrCode);
      
      if (result) {
        // Valid ticket
        setScanResult({
          success: true,
          message: 'Ticket validated successfully!',
          timestamp: new Date().toLocaleTimeString()
        });
      } else {
        // Invalid or already validated ticket
        setScanResult({
          success: false,
          message: 'Invalid ticket or already validated',
          timestamp: new Date().toLocaleTimeString()
        });
      }
    } catch (error) {
      console.error('Error validating ticket:', error);
      setScanResult({
        success: false,
        message: 'Error validating ticket',
        timestamp: new Date().toLocaleTimeString()
      });
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="mb-6 flex items-center">
        <Link href="/" className="text-blue-500 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back
        </Link>
        <h1 className="text-2xl font-semibold mx-auto pr-6">Scan QR Code</h1>
      </div>

      <div className="ios-card max-w-md mx-auto">
        <QRScanner onScan={handleScan} />
        
        {scanResult && (
          <div className={`mt-6 p-4 rounded-xl ${scanResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            <div className="flex items-center">
              {scanResult.success ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <span className="font-medium">{scanResult.message}</span>
            </div>
            {scanResult.timestamp && (
              <div className="text-sm opacity-75 mt-1">
                {scanResult.timestamp}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 