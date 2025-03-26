'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">QR Ticket Validator</h1>
          <p className="mt-2 text-gray-600">Scan and validate tickets efficiently</p>
        </div>
        
        <div className="mt-10 space-y-4">
          <Link href="/scan" className="ios-btn w-full flex justify-center items-center space-x-2 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V4zm-8 8a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" clipRule="evenodd" />
            </svg>
            <span>Scan QR Code</span>
          </Link>
          
          <Link href="/admin" className="ios-btn w-full flex justify-center items-center space-x-2 py-3 bg-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a1 1 0 10-2 0 7.978 7.978 0 003.908 6.875A5.971 5.971 0 0010 18a5.971 5.971 0 003.908-1.125A7.978 7.978 0 0017 10a1 1 0 10-2 0 5.986 5.986 0 00-.454 2.916A5 5 0 0010 11z" clipRule="evenodd" />
            </svg>
            <span>Admin Panel</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 