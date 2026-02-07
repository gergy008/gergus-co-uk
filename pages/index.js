// ============================================================================
// IMPORTS
// ============================================================================

// React hooks for managing component state and side effects
import { useState, useEffect } from 'react'

// HeroUI v3 Components:
// - Card: Container component for displaying content in a card layout
// - CardHeader: Section at the top of a card (typically for titles)
// - CardContent: Main body section of a card (replaces CardBody from v2)
// - Button: Interactive button component with built-in styling and variants
import { Card, CardContent, CardHeader, Button } from "@heroui/react"

// next-themes: Manages dark/light theme switching
// - useTheme: Hook that provides current theme and setTheme function
import { useTheme } from 'next-themes'

// Next.js Head component for managing page metadata (title, meta tags, etc.)
import Head from 'next/head'

// Next.js Image component for optimized images
import Image from 'next/image'

// Custom navigation component
import Nav from '../components/Nav'

// ============================================================================
// COMPONENT: Home Page
// ============================================================================
export default function Home() {
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

  // ==========================================================================
  // OG IMAGE STATE
  // ==========================================================================
  // State to store the dynamically fetched OG image URL from IsThereADropToday.com
  const [ogImageUrl, setOgImageUrl] = useState('https://isthereadroptoday.com/api/og/No.')

  // Mark component as mounted on client-side only
  // This ensures theme-dependent content doesn't cause hydration mismatches
  useEffect(() => {
    setMounted(true)
    
    // Fetch the OG image URL from our API route
    fetch('/api/og-image')
      .then(res => res.json())
      .then(data => {
        if (data.ogImageUrl) {
          setOgImageUrl(data.ogImageUrl)
        }
      })
      .catch(error => {
        console.error('Error fetching OG image URL:', error)
        // Keep the fallback URL if fetch fails
      })
  }, [])

  // ==========================================================================
  // RENDER
  // ==========================================================================
  return (
    <>
      {/* Page metadata - appears in browser tab and search results */}
      <Head>
        <title>HeroUI Next.js App</title>
        <meta name="description" content="A fresh HeroUI boilerplate" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation bar component */}
      <Nav />

      {/* Background SVG elements - positioned mostly centered, veering slightly left and right */}
      {/* Moved outside main to ensure fixed sizing independent of page content */}
      {/* Fixed pixel sizes prevent shrinking when viewport changes */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Left background SVG - centered with slight left offset, animated */}
        {/* Nested structure: outer div handles rotation, inner handles breathing */}
        <div className="absolute left-1/2 top-1/2 animate-float-1">
          <img 
            src="/backblot1.svg" 
            alt="" 
            className="opacity-50 dark:opacity-40 animate-breathe-1"
            style={{ width: '800px', height: 'auto' }}
          />
        </div>
        {/* Right background SVG - centered with slight right offset, animated */}
        {/* Nested structure: outer div handles rotation, inner handles breathing */}
        <div className="absolute left-1/2 top-1/2 animate-float-2">
          <img 
            src="/backblot2.svg" 
            alt="" 
            className="opacity-50 dark:opacity-40 animate-breathe-2"
            style={{ width: '800px', height: 'auto' }}
          />
        </div>
      </div>

      {/* Main page content */}
      <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 pt-24 relative">
        {/* Container with responsive width: 100% on mobile, 70% on desktop */}
        <div className="w-full container-70 mx-auto relative z-10">
          
          {/* Page header section */}
          <div className="mb-16 px-10">
            {/* 
              H1 with red-to-yellow gradient text:
              - gradient-red-yellow: Custom CSS class with exact gradient from previous site
              - linear-gradient(45deg, #ef4444 -50%, #eab308 50%): 45-degree diagonal gradient
              - Red (#ef4444) to Yellow (#eab308) with custom color stops
            */}
            <h1 className="text-5xl font-extrabold mb-4 gradient-red-yellow">
              Hello.
            </h1>
            {/* text-default-500: HeroUI's default secondary text color */}
            <p className="text-lg font-semibold text-default-500">
              I'm Steven Gergus, a software developer from Greater Manchester, UK.
            </p>
          </div>
          {/* text-default-500: HeroUI's default secondary text color */}
          <p className="text-lg text-default-500 mb-8">
            Here are some of my projects:
          </p>

          {/* Card grid: 1 column on mobile, 2 columns on medium+ screens */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            
            {/* ==============================================================
                CARD EXAMPLE 1: Basic Card Structure
                ==============================================================
                HeroUI Card components:
                - Card: Main container (automatically styled with HeroUI theme)
                - CardHeader: Top section for titles/headers
                - CardContent: Main body section for content
            */}
            <Card className="bg-orange-800/60">
              <Card.Header>
                <Card.Title className="text-lg font-semibold">
                  This website
                </Card.Title>
              </Card.Header>
              <Card.Content>
                <p className="text-sm mb-1 text-default-500 text-left">
                  My personal website, built with Next.js, HeroUI and Tailwind CSS.
                </p>
                <p className="text-sm mb-1 text-default-500 text-left">
                  I'm experimenting with new technologies, rapidly prototyping new ideas, and building up a portfolio of my work.
                </p>
                <p className="text-sm mb-1 text-default-500 text-left">
                  My website is hosted on Vercel, and the source code is freely available on GitHub.
                </p>
                <p className="text-sm mb-1 text-default-500 text-left">
                  Check the page footer for a link to the source code on GitHub.
                </p>
              </Card.Content>
            </Card>
            

            {/* ==============================================================
                CARD EXAMPLE 2: Basic Card Structure
                ==============================================================
            */}
            <Card className="bg-cyan-800/60">
              <Card.Header>
                <Card.Title className="text-lg">
                  IsThereADropToday.com
                </Card.Title>
              </Card.Header>
              <Card.Content>
                <p className="text-sm mb-1 text-default-500 text-left">
                  The Pokémon company is notorious for dropping new TCG sets and restocks randomly 
                  and unpredictably; I created IsThereADropToday.com to aggregate information and 
                  attempt to predict drops.
                </p>
                <p className="text-sm mb-1 text-default-500 text-left">
                  Therefore, <b>IsThereADropToday.com</b> is a small passion project of mine
                </p>
                <p className="text-sm text-default-500 text-left">
                  Here's the current prediction:
                </p>
                {/* OG image from IsThereADropToday.com - dynamically fetched and clickable */}
                <div className="mb-4 rounded-lg overflow-hidden">
                  <a 
                    href="https://isthereadroptoday.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <Image 
                      src={ogImageUrl}
                      alt="IsThereADropToday.com preview"
                      width={1200}
                      height={630}
                      className="w-full h-auto"
                      unoptimized
                    />
                  </a>
                </div>
                <p className="text-sm mb-1 text-default-500 text-left">
                  It's not really that accurate, but it's a fun project to work on. I hope to 
                  develop smarter algorithms and predictions as time goes on.
                </p>
              </Card.Content>
            </Card>
            
            {/* ==============================================================
                CARD EXAMPLE 3: Basic Card Structure
                ==============================================================
                HeroUI Card components:
                - Card: Main container (automatically styled with HeroUI theme)
                - CardHeader: Top section for titles/headers
                - CardContent: Main body section for content
            */}
            <Card className="bg-green-800/60">
              <Card.Header>
                <Card.Title className="text-lg font-semibold">
                  Barcodes & scanners
                </Card.Title>
              </Card.Header>
              <Card.Content>
                <p className="text-sm mb-1 text-default-500 text-left">
                  Work got me strangely interested in barcodes and QR codes; so I'm testing out 
                  some new technologies and ideas.
                </p>
                <p className="text-sm mb-1 text-default-500 text-left">
                  I'm responsible for the relabelling of our entire warehouse—I made 
                  sure new labels are bigger, clearer and colourful enough to significantly 
                  reduce human error.
                </p>
                <p className="text-sm mb-1 text-default-500 text-left">
                  I'm not sure how or why, but I know there's a massive efficiency improvement 
                  to be had by using barcodes and scanners somewhere in my life, and for some 
                  reason I think it's got something to do with the mass of Pokémon cards 
                  I've got lying around.
                </p>
              </Card.Content>
            </Card>
            
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="w-full container-70 mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
          Copyleft (ɔ) 2026 Steven Gergus. <a href="https://github.com/gergy008/gergus-co-uk" style={{ textDecoration: 'underline' }}
          target={"_blank"} rel="noreferrer">Source code freely available</a> under licence.
        </p>
      </footer>
    </>
  )
}
