import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Core system colors
        border: "hsl(var(--card-border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--input-border-focus))",
        background: {
          DEFAULT: "hsl(var(--background))",
          secondary: "hsl(var(--background-secondary))",
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          secondary: "hsl(var(--foreground-secondary))",
          muted: "hsl(var(--foreground-muted))",
        },
        // Popover (dropdowns/menus)
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        
        // Brand colors
        brand: {
          DEFAULT: "hsl(var(--brand-orange))",
          light: "hsl(var(--brand-orange-light))",
          dark: "hsl(var(--brand-orange-dark))",
        },
        
        // Interactive elements
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
          active: "hsl(var(--primary-active))",
        },
        
        // Status colors
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        error: {
          DEFAULT: "hsl(var(--error))",
          foreground: "hsl(var(--error-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        
        // Card system
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          border: "hsl(var(--card-border))",
        },
        
        // Navigation
        nav: {
          background: "hsl(var(--nav-background))",
          border: "hsl(var(--nav-border))",
          item: "hsl(var(--nav-item))",
          active: "hsl(var(--nav-item-active))",
        },
        
        // Input system
        input: {
          DEFAULT: "hsl(var(--input))",
          border: "hsl(var(--input-border))",
          focus: "hsl(var(--input-border-focus))",
          foreground: "hsl(var(--input-foreground))",
          placeholder: "hsl(var(--input-placeholder))",
        },
      },
      
      // Custom spacing using design tokens
      spacing: {
        '1': 'var(--space-1)',
        '2': 'var(--space-2)',
        '3': 'var(--space-3)',
        '4': 'var(--space-4)',
        '5': 'var(--space-5)',
        '6': 'var(--space-6)',
        '8': 'var(--space-8)',
        '10': 'var(--space-10)',
        '12': 'var(--space-12)',
      },
      
      // Typography scale
      fontSize: {
        'xs': ['var(--text-xs)', { lineHeight: '1.4' }],
        'sm': ['var(--text-sm)', { lineHeight: '1.4' }],
        'base': ['var(--text-base)', { lineHeight: '1.5' }],
        'lg': ['var(--text-lg)', { lineHeight: '1.4' }],
        'xl': ['var(--text-xl)', { lineHeight: '1.4' }],
        '2xl': ['var(--text-2xl)', { lineHeight: '1.3' }],
        '3xl': ['var(--text-3xl)', { lineHeight: '1.2' }],
        '4xl': ['var(--text-4xl)', { lineHeight: '1.1' }],
      },
      
      // Z-index scale
      zIndex: {
        'dropdown': 'var(--z-dropdown)',
        'sticky': 'var(--z-sticky)',
        'fixed': 'var(--z-fixed)',
        'modal-backdrop': 'var(--z-modal-backdrop)',
        'modal': 'var(--z-modal)',
        'popover': 'var(--z-popover)',
        'tooltip': 'var(--z-tooltip)',
      },
      
      // Transition timing
      transitionDuration: {
        'fast': 'var(--transition-fast)',
        'normal': 'var(--transition-normal)',
        'slow': 'var(--transition-slow)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
