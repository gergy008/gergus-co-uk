// ============================================================================
// IMPORTS
// ============================================================================

// React hooks for managing component state and side effects
import { useState, useEffect, useRef } from 'react'

// HeroUI v3 Components:
// - Button: Interactive button component with built-in styling and variants
import { Button } from "@heroui/react"

// next-themes: Manages dark/light theme switching
// - useTheme: Hook that provides current theme and setTheme function
import { useTheme } from 'next-themes'

// Next.js Head component for managing page metadata (title, meta tags, etc.)
import Head from 'next/head'

// hCaptcha component for spam protection
import HCaptcha from "@hcaptcha/react-hcaptcha"

// Custom navigation component
import Nav from '../components/Nav'

// ============================================================================
// COMPONENT: Contact Page
// ============================================================================
export default function Contact() {
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
  // CAPTCHA STATE
  // ==========================================================================
  // State for hCaptcha token and email
  const [token, setToken] = useState(null)
  const [email, setEmail] = useState("")
  const captchaRef = useRef(null)

  // Mark component as mounted on client-side only
  // This ensures theme-dependent content doesn't cause hydration mismatches
  useEffect(() => {
    setMounted(true)
  }, [])

  // ==========================================================================
  // CAPTCHA HANDLERS
  // ==========================================================================
  // Called when hCaptcha loads
  function onLoad() {
    console.log("hCaptcha Loaded")
  }

  // Called when captcha is verified - sends token to server for validation
  async function onCaptchaChange() {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({ captcha: token }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      
      if (response.ok) {
        // If the response is ok then show the email returned
        console.log("hCaptcha was a success")
        response.json().then((json) => {
          console.log(json)
          setEmail(json.email)
        })
      } else {
        // Else throw an error with the message returned from the API
        const error = await response.json()
        throw new Error(error.message)
      }
    } catch (error) {
      console.error(error?.message || "Something went wrong")
    } finally {
      // Reset the hCaptcha when the request has failed or succeeded
      // so that it can be executed again if user submits another email.
      captchaRef.current.resetCaptcha()
      setToken(null)
    }
  }

  // Form submission handler
  function onSubmit(e) {
    e.preventDefault()

    // This reaches out to the hCaptcha JS API and runs the
    // execute function on it. You can use other functions as
    // documented here: https://docs.hcaptcha.com/configuration#jsapi
    if (token) {
      // Token set already, verifying...
      onCaptchaChange()
    } else {
      // No token, forcing challenge...
      captchaRef.current.execute()
    }
  }

  // ==========================================================================
  // RENDER
  // ==========================================================================
  return (
    <>
      {/* Page metadata - appears in browser tab and search results */}
      <Head>
        <title>Contact - Steven Gergus</title>
        <meta name="description" content="Steven Gergus | Portfolio Contact - Get in touch and we'll change everything together" />
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
              Contact.
            </h1>
          </div>

          {/* Content section */}
          <div className="mb-8 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-default-700">
                How this page works
              </h3>
              <p className="text-lg text-default-600 mb-4">
                When you submit the form below, a RESTful request is made to a Next.js server-side function containing
                a token generated by hCaptcha. This is sent from the server to hCaptcha, validated, then a response 
                sent back to this app confirming the request was successful. The email address is never sent to the 
                client until this token is verified.
              </p>
            </div>

            <div>
              <noscript>Javascript is required to protect against spam.</noscript>
              <h4 className="text-lg font-semibold mb-4 text-default-700">
                Please complete the challenge below to reveal email address. hCaptcha is used to protect your privacy.
              </h4>
              
              <form onSubmit={onSubmit} className="mb-4">
                {mounted && (
                  <HCaptcha
                    sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
                    onLoad={onLoad}
                    onVerify={setToken}
                    ref={captchaRef}
                    theme={theme}
                  />
                )}
                <div className="mt-4">
                  <Button color="warning" type="submit">
                    Reveal email address
                  </Button>
                </div>
              </form>
              
              {email !== "" ? (
                <h4 className="text-lg font-semibold mb-2 text-default-700">
                  My email address is:{" "}
                  <a 
                    href={`mailto:${email}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {email}
                  </a>
                </h4>
              ) : (
                <h4 className="text-lg font-semibold mb-2 text-default-600">
                  Please complete the challenge
                </h4>
              )}
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
