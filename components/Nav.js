// ============================================================================
// IMPORTS
// ============================================================================

// React hooks for managing component state and side effects
import { useState, useEffect } from 'react'

// Next.js Link component for client-side navigation (faster than regular <a> tags)
import Link from 'next/link'

// next-themes: Manages dark/light theme switching
// - useTheme: Hook that provides current theme and setTheme function
import { useTheme } from 'next-themes'

// HeroUI v3 Components:
// - Button: Interactive button component with built-in styling and variants
import { Button } from "@heroui/react"

// Gravity UI Icons:
// - Sun: Sun icon for light mode
// - Moon: Moon icon for dark mode
import { Sun, Moon } from "@gravity-ui/icons"

// ============================================================================
// COMPONENT: Navigation Bar
// ============================================================================
export default function Nav() {
  // ==========================================================================
  // THEME MANAGEMENT
  // ==========================================================================
  // useTheme hook from next-themes provides:
  // - theme: Current theme ('light', 'dark', or 'system')
  // - setTheme: Function to change the theme
  const { theme, setTheme } = useTheme()
  
  // ==========================================================================
  // HYDRATION SAFETY
  // ==========================================================================
  // mounted state prevents hydration errors:
  // - During server-side rendering, theme is undefined
  // - On client, theme becomes available after hydration
  // - We only show theme-dependent content after component mounts
  const [mounted, setMounted] = useState(false)

  // Mark component as mounted on client-side only
  // This ensures theme-dependent content doesn't cause hydration mismatches
  useEffect(() => {
    setMounted(true)
  }, [])

  // ==========================================================================
  // EVENT HANDLERS
  // ==========================================================================
  // Toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  // ==========================================================================
  // RENDER
  // ==========================================================================
  return (
    <nav style={{
      // Fixed positioning: stays at top of page when scrolling
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      // High z-index ensures nav stays above other content
      zIndex: 50,
      // Transparent background with blur effect (glassmorphism style)
      backgroundColor: 'transparent',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)' // Safari support
    }}>
      {/* Container with responsive width: matches page content width */}
      <div className="container-70" style={{ margin: '0 auto', padding: '0 1rem' }}>
        {/* Flexbox container for nav items */}
        <div style={{
          display: 'flex',
          alignItems: 'center',      // Vertically center items
          justifyContent: 'space-between', // Space between logo and nav items
          height: '64px'            // Fixed nav height
        }}>
          
          {/* ==============================================================
              SITE LOGO/BRAND
              ==============================================================
              Link to homepage with custom styling
          */}
          {/* 
            Logo link with hover effect:
            - hover:opacity-70: More dramatic opacity change (70% instead of 80%)
            - hover:underline: Adds underline on hover for consistency
            - transition-all: Smooth transition for all properties
            - duration-200: Transition duration of 200ms
          */}
          <Link 
            href="/" 
            className="text-xl font-semibold text-decoration-none hover:opacity-70 hover:underline transition-all duration-200"
            style={{ color: 'inherit' }}  // Inherits text color from theme
          >
            Gergus.co.uk
          </Link>
          
          {/* ==============================================================
              NAVIGATION ITEMS (Right Side)
              ==============================================================
              Container for navigation links and theme toggle
          */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'  // Space between nav items
          }}>
            
            {/* About Me Link */}
            {/* 
              Enhanced hover effect for better visibility:
              - hover:opacity-70: More dramatic opacity change (70% instead of 80%)
              - hover:underline: Adds underline on hover for clear visual feedback
              - transition-all: Smooth transition for all properties
              - duration-200: Transition duration of 200ms
            */}
            <Link 
              href="/about" 
              className="text-decoration-none hover:opacity-70 hover:underline transition-all duration-200"
            >
              About me
            </Link>
            
            {/* Contact Link */}
            <Link 
              href="/contact" 
              className="text-decoration-none hover:opacity-70 hover:underline transition-all duration-200"
            >
              Contact
            </Link>
            
            {/* ==============================================================
                THEME TOGGLE BUTTON
                ==============================================================
                HeroUI Button with icon-only styling:
                - isIconOnly: Makes button square, sized for icon content
                - variant="light": Subtle background, less prominent styling
                - onPress: Handler for button clicks (preferred over onClick)
                - aria-label: Accessibility label for screen readers
                
                Only renders after component mounts to prevent hydration errors
            */}
            {mounted && (
              <Button
                variant="tertiary"
                isIconOnly          // Button is sized for icon (no text)
                onPress={toggleTheme} // Click handler (HeroUI uses onPress, not onClick)
                aria-label="Toggle theme" // Accessibility: describes button purpose
              >
                {/* 
                  Gravity UI icons change based on current theme:
                  - When theme is 'dark', show Sun icon (to switch to light)
                  - When theme is 'light', show Moon icon (to switch to dark)
                  - className="w-5 h-5": Sets icon size to 20px (1.25rem)
                */}
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>
            )}
            
          </div>
        </div>
      </div>
    </nav>
  )
}
