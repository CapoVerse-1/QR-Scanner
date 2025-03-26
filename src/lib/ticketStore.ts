export interface Ticket {
  id: string;
  qrCode: string;
  createdAt: string;
  validated: boolean;
  validatedAt?: string;
}

// Local storage keys
const VALID_TICKETS_KEY = 'validTickets';
const VALIDATED_TICKETS_KEY = 'validatedTickets';

// Helper to safely access localStorage (since it's not available during SSR)
const getLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage;
  }
  return null;
};

// Get all valid tickets
export const getValidTickets = (): Ticket[] => {
  const storage = getLocalStorage();
  if (!storage) return [];
  
  const tickets = storage.getItem(VALID_TICKETS_KEY);
  return tickets ? JSON.parse(tickets) : [];
};

// Get all validated tickets
export const getValidatedTickets = (): Ticket[] => {
  const storage = getLocalStorage();
  if (!storage) return [];
  
  const tickets = storage.getItem(VALIDATED_TICKETS_KEY);
  return tickets ? JSON.parse(tickets) : [];
};

// Add a new valid ticket
export const addValidTicket = (qrCode: string): Ticket => {
  const storage = getLocalStorage();
  if (!storage) throw new Error('Local storage not available');
  
  const ticket: Ticket = {
    id: crypto.randomUUID(),
    qrCode,
    createdAt: new Date().toISOString(),
    validated: false
  };
  
  const tickets = getValidTickets();
  storage.setItem(VALID_TICKETS_KEY, JSON.stringify([...tickets, ticket]));
  
  return ticket;
};

// Validate a ticket
export const validateTicket = (qrCode: string): Ticket | null => {
  const storage = getLocalStorage();
  if (!storage) throw new Error('Local storage not available');
  
  // Check if already validated
  const validatedTickets = getValidatedTickets();
  if (validatedTickets.some(t => t.qrCode === qrCode)) {
    return null; // Already validated
  }
  
  // Find in valid tickets
  const validTickets = getValidTickets();
  const ticketIndex = validTickets.findIndex(t => t.qrCode === qrCode);
  
  if (ticketIndex === -1) {
    return null; // Not found
  }
  
  // Mark as validated
  const ticket = { 
    ...validTickets[ticketIndex],
    validated: true,
    validatedAt: new Date().toISOString()
  };
  
  // Remove from valid tickets
  const updatedValidTickets = [
    ...validTickets.slice(0, ticketIndex),
    ...validTickets.slice(ticketIndex + 1)
  ];
  storage.setItem(VALID_TICKETS_KEY, JSON.stringify(updatedValidTickets));
  
  // Add to validated tickets
  storage.setItem(VALIDATED_TICKETS_KEY, JSON.stringify([...validatedTickets, ticket]));
  
  return ticket;
};

// Delete a valid ticket
export const deleteValidTicket = (id: string): boolean => {
  const storage = getLocalStorage();
  if (!storage) throw new Error('Local storage not available');
  
  const tickets = getValidTickets();
  const updatedTickets = tickets.filter(t => t.id !== id);
  
  if (updatedTickets.length === tickets.length) {
    return false; // No ticket was deleted
  }
  
  storage.setItem(VALID_TICKETS_KEY, JSON.stringify(updatedTickets));
  return true;
}; 