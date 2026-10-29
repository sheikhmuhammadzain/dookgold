# dook gold - Cryptocurrency Wallet

A pixel-perfect React clone of Dook Gold (Android) rebranded as "dook gold". This is a modern cryptocurrency wallet interface built with React, TypeScript, and Tailwind CSS.

## Features

### Implemented Screens
- **PIN Entry Screen** - Secure 4-digit PIN authentication
- **Wallets Overview** - List of supported cryptocurrencies with live prices
- **Balance Details** - Detailed balance view with portfolio overview  
- **Profile Settings** - User profile and settings menu
- **Profile Details** - Detailed user information and verification status

### Key Components
- **Mobile-First Design** - Optimized for 375px-412px viewport (Android standard)
- **Responsive Layout** - Works on desktop with centered mobile canvas
- **Design System** - Comprehensive design tokens for colors, spacing, typography
- **Modular Components** - Atomic component structure for easy backend integration

## Tech Stack

- **React 18** + TypeScript
- **Vite** - Fast development and build tool
- **Tailwind CSS** - Utility-first styling with custom design tokens
- **Lucide React** - Modern icon library
- **React Router** - Client-side routing

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

## Design System

The app uses a comprehensive design system with:

- **Colors**: Brand orange (#FF9500) with semantic color tokens
- **Typography**: System font stack optimized for mobile
- **Spacing**: 4px baseline grid with consistent spacing scale
- **Components**: Modular atomic components with proper TypeScript interfaces

## Project Structure

```
src/
├── components/
│   ├── ui/           # Base UI components
│   ├── layout/       # Layout components  
│   ├── navigation/   # Navigation components
│   ├── crypto/       # Crypto-specific components
│   └── wallet/       # Wallet-specific components
├── pages/            # Screen components
├── lib/              # Utilities
└── index.css         # Design system tokens
```

## Pixel-Perfect Implementation

This clone matches the original Dook Gold design with:

- **Exact color palette** extracted from screenshots
- **Matching typography** and spacing
- **Identical layouts** and component positioning  
- **Consistent interactions** and micro-animations
- **Mobile-optimized** responsive behavior

## Security Note

This is a **DEMO FRONTEND ONLY**. All data is mock/placeholder data. Never enter real:
- Private keys or seed phrases
- Real authentication credentials
- Actual cryptocurrency addresses

## Backend Integration

The app is architected for easy backend integration with:

- Modular component structure
- TypeScript interfaces for all data models
- Separated business logic from UI components
- RESTful API ready component patterns

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

This project follows the pixel-perfect specification from Dook Gold screenshots. When contributing:

1. Maintain exact visual fidelity to original design
2. Use the established design system tokens
3. Follow TypeScript best practices
4. Test on target mobile viewports (375px-412px)

## License

This project is for educational/demonstration purposes only.