// ============================================================================
// IMPORTS
// ============================================================================

// React hooks for managing component state and side effects
import { useState, useEffect } from 'react'

// next-themes: Manages dark/light theme switching
// - useTheme: Hook that provides current theme and setTheme function
import { useTheme } from 'next-themes'

// Next.js Head component for managing page metadata (title, meta tags, etc.)
import Head from 'next/head'

// Next.js Link component for client-side navigation
import Link from 'next/link'

// Custom navigation component
import Nav from '../components/Nav'

// ============================================================================
// COMPONENT: About Page
// ============================================================================
export default function About() {
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
  // RENDER
  // ==========================================================================
  return (
    <>
      {/* Page metadata - appears in browser tab and search results */}
      <Head>
        <title>About - Steven Gergus</title>
        <meta
          name="description"
          content="Steven Gergus | Portfolio About Me - Learn more about me"
        />
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
              About me.
            </h1>
          </div>

          {/* Content section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-12 text-default-700">
              My name is Steven Gergus, I live in Bolton, Greater Manchester, UK.
            </h3>
            
            <div className="space-y-6 text-default-600">
              <p className="text-lg">
                I don't really have a name preference. I've typically been called Steve in a 
                work environment, and Gergy by friends.
              </p>
              <p className="text-lg">
                I've always been a problem solver and a creative thinker, and I've loved to 
                code as long as I can remember. I&apos;ve <i>also</i> always wanted to work in software 
                development but the one problem I've yet to solve is getting my foot in 
                the door. Throughout my life, I would often hear this phrase from people:
              </p>
              
              <h4 className="text-xl font-medium mb-8 gradient-red-yellow">
                <i>
                  <q>Why are you here? Why don&apos;t you work in IT?</q>
                </i>
              </h4>
              
              <p className="text-lg">
                Right now, I'm a Product Information Specialist at Sherwin-Williams. I'm 
                responsible for ensuring that the product information is accurate and up 
                to date and also responsible for ensuring products are available to 
                customers in Europe. I&apos;m so lucky to work here. Sherwin is excellent 
                at understanding diversity and differences in people. My benefit to them is that I'm a complete knowledge sponge.
              </p>
              <p className="text-lg">
                Most of day-to-day involves transporting data between our numerous ERPs—but 
                that said, solutions I've provided for Sherwin-Williams include our internal 
                high-performance flooring catalogue; significant overhaul of our Pathfinder 
                hub for important documents and pricing, and I make continuous improvements to 
                our New Product Introduction (NPI) Approval app.
              </p>
              
              <h3 className="text-xl font-semibold text-default-700">Where did it all start?</h3>
              
              <p className="text-lg">
                To put it very short— I made my first game in Roblox using Lua in 2008 aged 13, 
                and I made my first PHP website in 2009 aged 14. My website allowed my classmates 
                to play flash games, I hand-made and sold vouchers on my breaks which could 
                be redeemed to access certain games. If my domain was banned, I'd have to
                register a new .info domain and move everything to the new website overnight.
              </p>
              <p className="text-lg underline">
                <a
                    className="text-blue-500 underline"
                    href="https://web.archive.org/web/20090828042157/http://www.gergy.info/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Take a small look at the remains of my first ever website on
                    archive.org
                </a>
              </p>
              <h3 className="text-xl font-semibold text-default-700">What am I doing now?</h3>
              <p className="text-lg">
                I'm currently back coding as a hobby again, and I'm loving it. Right now I'm developing using 
                React, Next.js, Tailwind CSS, and TypeScript. I'm still fairly proficient in PHP, C# and 
                Objective-C - Learning those languages throughout the years provided me with a 
                diverse skill set that I can use to my advantage when picking up new technologies or applying 
                existing skills to new projects.
              </p>
              <p className="text-lg">
                I'd say my best skill overall is my ability to pick out, interpret and solve bugs and errors.
                I learned PHP without any formal training; so I've had no choice but to learn to think logically and 
                critically to solve problems. It wasn't so easy to get help with errors and bugs when you're a kid, 
                on your own, with no one to ask for help. Patience and perseverance is a skill that I've carried with me throughout my life.
              </p>
              <p className="text-lg">
                While I'm happy in my current role, I'm always looking for new challenges and opportunities to grow. If you'd like to get in touch please{" "}
                <Link href="/contact" className="text-blue-500 hover:underline" style={{ textDecoration: 'underline' }}>
                  contact me.
                </Link>
              </p>
              
              <p className="text-lg mt-8">Thanks for reading!</p>
              <p className="text-lg">~Steve</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full container-70 mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
          Copyleft (ɔ) 2026 Steven Gergus. <a href="https://github.com/gergy008/gergus-co-uk" target="_blank" rel="noreferrer" className="hover:underline">Source code freely available</a> under licence.
        </p>
      </footer>
    </>
  )
}
