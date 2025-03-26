# QR Ticket Validator

A modern QR code ticket validation system built with Next.js that allows scanning and validation of tickets via QR codes.

## Features

- Scan QR codes using device camera
- Validate tickets against a predefined list
- Admin panel to manage valid/validated tickets
- iOS-inspired design with smooth animations
- Mobile-friendly interface

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/qr-scanner.git
cd qr-scanner
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Deployment

The application is designed to be deployed on Vercel:

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Deploy the application

## How It Works

- The admin can add QR code links through the admin panel
- Each link represents a valid ticket
- When a QR code is scanned, it checks if it's in the valid tickets list
- If valid, it moves to the validated tickets section
- Validated tickets cannot be scanned again

## License

MIT 