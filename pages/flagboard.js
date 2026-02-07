import { useState } from 'react'
import Nav from '../components/Nav.js'
import Footer from '../components/Footer.js'
import Head from 'next/head'
import Link from 'next/link';
import { useTheme } from 'next-themes'
import { Card, Modal, useDisclosure, Button } from "@heroui/react";

export default function Flagboard() {
  const { theme, setTheme } = useTheme()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ image, setImage ] = useState();
  const [ modalTitle, setModalTitle ] = useState();

  return (
    <div className="max-w-4xl mx-auto px-4">
      <Head>
        <title>Steven Gergus Portfolio</title>
        <meta name="description" content="Steven Gergus | Portfolio Flagboard - My custom C# solution to an economical challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav theme={theme} setTheme={setTheme}  /> 


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

      <main className="">
        <div className="mt-24 mb-24 flex flex-col items-start">
          <h1 
            className="text-4xl font-bold mb-5"
            style={{
              background: "linear-gradient(45deg, #ef4444 -50%, #eab308 50%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Flagboard project.
          </h1>
        </div>
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-xl font-semibold mb-4">
            I created this flagboard to make my role more efficient, and to reduce overall costs &amp; paper usage.
          </h3>
          <br/>
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
              />
            </div>
          </div>
          <p className="text-lg mb-4">
            I started working at Daytona Motorsport Trafford late 2016 as a Track Marshal. I had been promoted to a Computer Operator (CO), which is a position
            responsible for assisting the Race Director on controlling track safety equipment, monitoring cameras, directing marshals on track via radio, and 
            controlling the digital flagboard for issuing race calls. A short while into this position, the business made a decision to record all race calls 
            and events during races on paper documents called <q>race sheets</q>, I presume to help defend the business if a serious injury occurred on circuit.
          </p>
          <br/>
          <p className="text-lg mb-4">
            It soon became evident that we were using a lot of paper on race sheets, with up to 30 sheets during the week and sometimes over 90 sheets during 
            busy weekends. This amount of paper was hard to store, it was uneconomical and also bad for the enviroment. I came up with an idea to create a
            new version of the software designed for the flagboard that would automatically record racecalls throughout the day and store them on the company
            network drive for access from any office computer. Files are lightweight, using no more than 70MB a year on data storage.
          </p>
          <br/>
          <p className="text-lg mb-4">
            The software was engineered using C# and Windows Forms. The design of the UI is closely similar to the software it replaced in order to make it
            easier for the other Hosts, Race Directors and Management to use in a pinch. The CO would set up the session in the software at the start of the race.
            The software would monitor Clubspeed APIs and display karts in the software that were currently on the track. All race calls and events that were
            logged during the session were saved to file at the end of the race session. Because of the importance of the data, log files were used as a backup
            to ensure that if the software suffered a failure during a session that had a serious incident occur, race calls could still be extracted.
          </p>
          <br/>
          <p className="text-lg mb-4">
            I&apos;d planned to introduce translation support for international customers, but this was blocked from a senior level. It was thought that
            if we needed to use translations on the board, then it would indicate the drivers hadn&apos;t understood the safety briefing in English;
            If the driver doesn&apos;t understand the safety briefing then they shouldn&apos;t be on circuit.
          </p>
          <br/>
          <h3 className="text-xl font-semibold mb-4">
            Code
          </h3>
          <p className="text-lg mb-4">
            Here are some examples of code I had written that allows certain parts of the software to function, namely the displaypanel component and
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
              />
            </div>
          </div>
          <br/>
          <Card color={"error"}>
            <h4 className="text-lg font-semibold mb-2">
              Cookie Notice
            </h4>
            <p>
              Playing any of these videos may allow YouTube to store and access cookies on your device.
            </p>
          </Card>
          <br/>
          <h3 className="text-xl font-semibold mb-4">
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
                allowFullScreen>
              </iframe>
            </div>
            <div className="col-span-1">
              <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube-nocookie.com/embed/sbgNDn-XRY8" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
              </iframe>
            </div>
          </div>
          <br/>
          <h3 className="text-xl font-semibold mb-4">
            Hardware Integration
          </h3>
          <p className="text-lg mb-4">
            The race circuit has a number of yellow and red flashing safety lights issued around the track. Prior to me leaving the company, I had planned
            to create and implement hardware to control the track lights from the software. Here&apos;s a video of a working prototype
          </p>
          <br/>
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube-nocookie.com/embed/Fq7-Hop8CSQ" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>
          <br/>
          <p className="text-lg mb-4">
            This prototype worked through a common ATmega328 microcontroller. The software would open a serial connection with the microcontroller over USB
            and transmit case-sensitive letters to and from as sort of a crude protocol. A letter <q>R</q> send from the microcontroller to the serial listener
            for example, would trigger the event in the above video; activation of the red flashing light. The software would reply that the lights had been activated
            triggering the flashing feedback light on the switch.
          </p>
          <br/>  
          <h3 className="text-xl font-semibold mb-4">
            Is that all?
          </h3>
          <p className="text-lg mb-4">
            Absolutely not. I will update this article in the future to include more information about how I used Azure to distrubute the software, introduce licencing
            for other circuits and auto-update, plus some of the other cool things I added to the project that I am proud of and made this so much easier.
          </p>
          <br/>  
          <p className="text-sm">
            Daytona Motorsport and TeamSport are registered trademarks of their respective companies.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}


/*
        <p>
          <a
            href="https://vercel.com?utm_source=gergus.co.uk&utm_medium=project-portfolio&utm_campaign=gergus.co.uk"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by&nbsp;
            <span style={{alignItems: "flex-end", marginTop:"10px", height: "20px"}}>
              <svg width={72} height={16} viewBox="0 0 283 64"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M141.04 16c-11.04 0-19 
                  7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 
                  2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 
                  0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5
                  4.79 0 8.21 2.51 9.45 6.5h-18.9zM248.72 16c-11.04 0-19 7.2-19 18s8.96 18 20 
                  18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 
                  0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 
                  14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM200.24 34c0 6 
                  3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 
                  8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 
                  4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9V5h9zM36.95 
                  0L73.9 64H0L36.95 0zm92.38 5l-27.71 48L73.91 5H84.3l17.32 30 17.32-30h10.39zm58.91 
                  12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10V51h-9V17h9v9.2c0-5.08 5.91-9.2 13.2-9.2z" 
                  fill={svgColor}/>
              </svg>
            </span>
          </a>&nbsp;
          <a
            href="https://nextui.org/?utm_source=gergus.co.uk&utm_medium=project-portfolio&utm_campaign=gergus.co.uk"
            target="_blank"
            rel="noopener noreferrer"
          >
            &amp; special thanks to NextUI!
          </a>
        </p>
*/