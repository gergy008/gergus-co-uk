// ============================================================================
// IMPORTS
// ============================================================================

// React hooks for managing component state and side effects
import { useState, useEffect } from 'react'

// HeroUI v3 Components:
// - Card: Container component for displaying content in a card layout
// - Modal: Dialog component for displaying content in an overlay
// - Button: Interactive button component with built-in styling and variants
import { Card, Modal, Button } from "@heroui/react"

// next-themes: Manages dark/light theme switching
// - useTheme: Hook that provides current theme and setTheme function
import { useTheme } from 'next-themes'

// Next.js Head component for managing page metadata (title, meta tags, etc.)
import Head from 'next/head'

// Custom navigation component
import Nav from '../components/Nav'

// ============================================================================
// COMPONENT: Flagboard Page
// ============================================================================
export default function Flagboard() {
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
  // MODAL STATE
  // ==========================================================================
  // Modal state management - HeroUI v3 doesn't have useDisclosure, use useState instead
  const [isOpen, setIsOpen] = useState(false)
  const [image, setImage] = useState()
  const [modalTitle, setModalTitle] = useState()
  
  // Modal handlers
  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)

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
        <title>Flagboard - Steven Gergus</title>
        <meta name="description" content="Steven Gergus | Portfolio Flagboard - My custom C# solution to an economical challenge" />
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

      {/* Modal for displaying images */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Modal.Header>
          <h2 id="modal-title" className="text-lg font-semibold">
            {modalTitle}
          </h2>
        </Modal.Header>
        <Modal.Body>
          <img src={image} alt={modalTitle} width={1920} height={1080} style={{objectFit: "scale-down"}}/>
        </Modal.Body>
        <Modal.Footer>
          <Button color="error" onPress={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

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
            <h1 className="text-5xl font-bold mb-4 gradient-red-yellow">
              Flagboard project.
            </h1>
          </div>

          {/* Content section */}
          <div className="mb-8 space-y-6">
            <h3 className="text-xl font-semibold mb-4 text-default-700">
              I created this flagboard to make my role more efficient, and to reduce overall costs &amp; paper usage.
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="col-span-1">
                <img 
                  src="/FlagboardShowcase.png" 
                  alt='Flagboard showcase image' 
                  width={1280} 
                  height={300} 
                  style={{objectFit: "scale-down", cursor: "pointer"}}
                  onClick={() => {
                    setImage("/FlagboardShowcase.png")
                    setModalTitle("The software running (without a clubspeed window occupying the corner)")
                    onOpen()
                  }}
                  className="cursor-pointer"
                />
              </div>
            </div>
            
            <p className="text-lg text-default-600">
              I started working at Daytona Motorsport Trafford late 2016 as a Track Marshal. I had been promoted to a Computer Operator (CO), which is a position
              responsible for assisting the Race Director on controlling track safety equipment, monitoring cameras, directing marshals on track via radio, and 
              controlling the digital flagboard for issuing race calls. A short while into this position, the business made a decision to record all race calls 
              and events during races on paper documents called <q>race sheets</q>, I presume to help defend the business if a serious injury occurred on circuit.
            </p>
            
            <p className="text-lg text-default-600">
              It soon became evident that we were using a lot of paper on race sheets, with up to 30 sheets during the week and sometimes over 90 sheets during 
              busy weekends. This amount of paper was hard to store, it was uneconomical and also bad for the environment. I came up with an idea to create a
              new version of the software designed for the flagboard that would automatically record race calls throughout the day and store them on the company
              network drive for access from any office computer. Files are lightweight, using no more than 70MB a year on data storage.
            </p>
            
            <p className="text-lg text-default-600">
              The software was engineered using C# and Windows Forms. The design of the UI is closely similar to the software it replaced in order to make it
              easier for the other Hosts, Race Directors and Management to use in a pinch. The CO would set up the session in the software at the start of the race.
              The software would monitor Clubspeed APIs and display karts in the software that were currently on the track. All race calls and events that were
              logged during the session were saved to file at the end of the race session. Because of the importance of the data, log files were used as a backup
              to ensure that if the software suffered a failure during a session that had a serious incident occur, race calls could still be extracted.
            </p>
            
            <p className="text-lg text-default-600">
              I&apos;d planned to introduce translation support for international customers, but this was blocked from a senior level. It was thought that
              if we needed to use translations on the board, then it would indicate the drivers hadn&apos;t understood the safety briefing in English;
              If the driver doesn&apos;t understand the safety briefing then they shouldn&apos;t be on circuit.
            </p>
            
            <h3 className="text-xl font-semibold mb-4 text-default-700">
              Code
            </h3>
            <p className="text-lg text-default-600">
              Here are some examples of code I had written that allows certain parts of the software to function, namely the display panel component and
              internal debugger for logging to file.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="col-span-1">
                <img 
                  src="/FlagboardCodeExample1.png" 
                  alt='Image #1 showing example flagboard code' 
                  width={1280} 
                  height={300} 
                  style={{objectFit: "scale-down", cursor: "pointer"}}
                  onClick={() => {
                    setImage("/FlagboardCodeExample1.png")
                    setModalTitle("Beginning of the Display ShowBoard function, which displays a standard race call.")
                    onOpen()
                  }}
                  className="cursor-pointer"
                />
              </div>
              <div className="col-span-1">
                <img 
                  src="/FlagboardCodeExample2.png" 
                  alt='Image #2 showing example flagboard code' 
                  width={1280} 
                  height={300} 
                  style={{objectFit: "scale-down", cursor: "pointer"}}
                  onClick={() => {
                    setImage("/FlagboardCodeExample2.png")
                    setModalTitle("The ParseDRNumbers function - which converts a string of driver numbers into a List object")
                    onOpen()
                  }}
                  className="cursor-pointer"
                />
              </div>
              <div className="col-span-1">
                <img 
                  src="/FlagboardCodeExample3.png" 
                  alt='Image #3 showing example flagboard code' 
                  width={1280} 
                  height={300} 
                  style={{objectFit: "scale-down", cursor: "pointer"}}
                  onClick={() => {
                    setImage("/FlagboardCodeExample3.png")
                    setModalTitle("Public facing debugger functions - these subtask operations to write to file.")
                    onOpen()
                  }}
                  className="cursor-pointer"
                />
              </div>
              <div className="col-span-1">
                <img 
                  src="/FlagboardCodeExample2.png" 
                  alt='Image #4 showing example flagboard code' 
                  width={1280} 
                  height={300} 
                  style={{objectFit: "scale-down", cursor: "pointer"}}
                  onClick={() => {
                    setImage("/FlagboardCodeExample4.png")
                    setModalTitle("Debugger write to file function - Takes a debugger string and writes it to file.")
                    onOpen()
                  }}
                  className="cursor-pointer"
                />
              </div>
            </div>
            
            <Card className="bg-danger-50 dark:bg-danger-900/20">
              <Card.Header>
                <h4 className="text-lg font-semibold">
                  Cookie Notice
                </h4>
              </Card.Header>
              <Card.Content>
                <p className="text-default-600">
                  Playing any of these videos may allow YouTube to store and access cookies on your device.
                </p>
              </Card.Content>
            </Card>
            
            <h3 className="text-xl font-semibold mb-4 text-default-700">
              Flagboard in use on the race circuit
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="col-span-1">
                <iframe 
                  width="560" 
                  height="315" 
                  src="https://www.youtube-nocookie.com/embed/FWyOEBv5pD8" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="w-full"
                />
              </div>
              <div className="col-span-1">
                <iframe 
                  width="560" 
                  height="315" 
                  src="https://www.youtube-nocookie.com/embed/sbgNDn-XRY8" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="w-full"
                />
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-4 text-default-700">
              Hardware Integration
            </h3>
            <p className="text-lg text-default-600">
              The race circuit has a number of yellow and red flashing safety lights issued around the track. Prior to me leaving the company, I had planned
              to create and implement hardware to control the track lights from the software. Here&apos;s a video of a working prototype
            </p>
            
            <iframe 
              width="560" 
              height="315" 
              src="https://www.youtube-nocookie.com/embed/Fq7-Hop8CSQ" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full"
            />
            
            <p className="text-lg text-default-600">
              This prototype worked through a common ATmega328 microcontroller. The software would open a serial connection with the microcontroller over USB
              and transmit case-sensitive letters to and from as sort of a crude protocol. A letter <q>R</q> sent from the microcontroller to the serial listener
              for example, would trigger the event in the above video; activation of the red flashing light. The software would reply that the lights had been activated
              triggering the flashing feedback light on the switch.
            </p>
            
            <h3 className="text-xl font-semibold mb-4 text-default-700">
              Is that all?
            </h3>
            <p className="text-lg text-default-600">
              Absolutely not. I will update this article in the future to include more information about how I used Azure to distribute the software, introduce licensing
              for other circuits and auto-update, plus some of the other cool things I added to the project that I am proud of and made this so much easier.
            </p>
            
            <p className="text-sm text-default-500">
              Daytona Motorsport and TeamSport are registered trademarks of their respective companies.
            </p>
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
