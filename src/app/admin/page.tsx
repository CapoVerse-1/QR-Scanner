'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getValidTickets, getValidatedTickets, addValidTicket, deleteValidTicket, Ticket } from '../../lib/ticketStore';

export default function AdminPage() {
  const [validTickets, setValidTickets] = useState<Ticket[]>([]);
  const [validatedTickets, setValidatedTickets] = useState<Ticket[]>([]);
  const [newQrCode, setNewQrCode] = useState('');
  const [activeTab, setActiveTab] = useState<'valid' | 'validated'>('valid');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    // Load tickets
    loadTickets();
  }, []);

  const loadTickets = () => {
    setValidTickets(getValidTickets());
    setValidatedTickets(getValidatedTickets());
  };

  const handleAddTicket = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newQrCode.trim()) {
      setMessage({ text: 'Please enter a QR code', type: 'error' });
      return;
    }
    
    try {
      addValidTicket(newQrCode.trim());
      setNewQrCode('');
      loadTickets();
      setMessage({ text: 'Ticket added successfully', type: 'success' });
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error adding ticket:', error);
      setMessage({ text: 'Error adding ticket', type: 'error' });
    }
  };

  const handleDeleteTicket = (id: string) => {
    try {
      const success = deleteValidTicket(id);
      if (success) {
        loadTickets();
        setMessage({ text: 'Ticket deleted successfully', type: 'success' });
        
        // Clear message after 3 seconds
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ text: 'Ticket not found', type: 'error' });
      }
    } catch (error) {
      console.error('Error deleting ticket:', error);
      setMessage({ text: 'Error deleting ticket', type: 'error' });
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch {
      return dateString;
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
        <h1 className="text-2xl font-semibold mx-auto pr-6">Admin Panel</h1>
      </div>

      {message && (
        <div className={`p-3 mb-4 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message.text}
        </div>
      )}

      <div className="ios-card mb-6">
        <h2 className="text-lg font-medium mb-3">Add New Ticket</h2>
        <form onSubmit={handleAddTicket} className="flex space-x-2">
          <input
            type="text"
            value={newQrCode}
            onChange={(e) => setNewQrCode(e.target.value)}
            placeholder="Enter QR code link"
            className="ios-input flex-1"
          />
          <button type="submit" className="ios-btn whitespace-nowrap">
            Add Ticket
          </button>
        </form>
      </div>

      <div className="ios-card">
        <div className="flex border-b">
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'valid' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('valid')}
          >
            Valid Tickets ({validTickets.length})
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'validated' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('validated')}
          >
            Validated Tickets ({validatedTickets.length})
          </button>
        </div>

        <div className="mt-4">
          {activeTab === 'valid' ? (
            <div className="space-y-3">
              {validTickets.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No valid tickets found</p>
              ) : (
                validTickets.map((ticket) => (
                  <div key={ticket.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div className="truncate mr-2 flex-1">
                      <div className="font-medium">{ticket.qrCode}</div>
                      <div className="text-xs text-gray-500">Added: {formatDate(ticket.createdAt)}</div>
                    </div>
                    <button
                      onClick={() => handleDeleteTicket(ticket.id)}
                      className="text-red-500 p-1 hover:bg-red-50 rounded-full"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {validatedTickets.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No validated tickets found</p>
              ) : (
                validatedTickets.map((ticket) => (
                  <div key={ticket.id} className="p-3 border rounded-lg">
                    <div className="font-medium truncate">{ticket.qrCode}</div>
                    <div className="text-xs text-gray-500 flex justify-between mt-1">
                      <span>Added: {formatDate(ticket.createdAt)}</span>
                      <span>Validated: {formatDate(ticket.validatedAt || '')}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 