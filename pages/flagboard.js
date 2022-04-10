import { useState } from 'react'
import Nav from './components/Nav.js'
import Footer from './components/Footer.js'
import Head from 'next/head'
import Link from 'next/link';
import { useTheme } from 'next-themes'
import { Card, Container, Grid, Text, Image, Modal, useModal, Button } from "@nextui-org/react";

export default function About() {
  const { theme, setTheme } = useTheme()
  const { setVisible, bindings } = useModal();
  const [ image, setImage ] = useState();
  const [ modalTitle, setModalTitle ] = useState();

  return (
    <Container md>
      <Head>
        <title>Steven Gergus Portfolio</title>
        <meta name="description" content="Steven Gergus | Portfolio Flagboard - My custom C# solution to an economical challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav theme={theme} setTheme={setTheme}  /> 


      <Modal
        scroll
        fullScreen
        closeButton
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            {modalTitle}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Image showSkeleton src={image} alt={modalTitle} width={1920} height={1080} objectFit="scale-down"/>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={() => setVisible(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <main className="">
        <Container css={{marginTop: "6em", marginBottom: "6em", alignItems: "flex-start"}}>
          <Text size={64} css={{ textGradient: "45deg, $red500 -50%, $yellow500 50%", marginBottom: "20px"}} weight="bold">
            Flagboard project.
          </Text>
        </Container>
        <Container>
          <Text h3>
            I created this flagboard to make my role more efficient, and to reduce overall costs &amp; paper usage.
          </Text>
          <br/>
          <Grid.Container gap={2} >
            <Grid xs={12}>
              <Image 
                showSkeleton 
                src="/FlagboardShowcase.png" 
                alt='Flagboard showcase image' 
                width={1280} 
                height={300} 
                objectFit="scale-down"
                onClick={() => {
                  setVisible(true)
                  setImage("/FlagboardShowcase.png")
                  setModalTitle("The software running (without a clubspeed window occupying the corner)")
                }}
              />
            </Grid>
          </Grid.Container>
          <Text size={22}>
            I started working at Daytona Motorsport Trafford late 2016 as a Track Marshal. I had been promoted to a Computer Operator (CO), which is a position
            responsible for assisting the Race Director on controlling track safety equipment, monitoring cameras, directing marshals on track via radio, and 
            controlling the digital flagboard for issuing race calls. A short while into this position, the business made a decision to record all race calls 
            and events during races on paper documents called <q>race sheets</q>, I presume to help defend the business if a serious injury occurred on circuit.
          </Text>
          <br/>
          <Text size={22}>
            It soon became evident that we were using a lot of paper on race sheets, with up to 30 sheets during the week and sometimes over 90 sheets during 
            busy weekends. This amount of paper was hard to store, it was uneconomical and also bad for the enviroment. I came up with an idea to create a
            new version of the software designed for the flagboard that would automatically record racecalls throughout the day and store them on the company
            network drive for access from any office computer. Files are lightweight, using no more than 70MB a year on data storage.
          </Text>
          <br/>
          <Text size={22}>
            The software was engineered using C# and Windows Forms. The design of the UI is closely similar to the software it replaced in order to make it
            easier for the other Hosts, Race Directors and Management to use in a pinch. The CO would set up the session in the software at the start of the race.
            The software would monitor Clubspeed APIs and display karts in the software that were currently on the track. All race calls and events that were
            logged during the session were saved to file at the end of the race session. Because of the importance of the data, log files were used as a backup
            to ensure that if the software suffered a failure during a session that had a serious incident occur, race calls could still be extracted.
          </Text>
          <br/>
          <Text size={22}>
            I&apos;d planned to introduce translation support for international customers, but this was blocked from a senior level. It was thought that
            if we needed to use translations on the board, then it would indicate the drivers hadn&apos;t understood the safety briefing in English;
            If the driver doesn&apos;t understand the safety briefing then they shouldn&apos;t be on circuit.
          </Text>
          <br/>
          <Text h3>
            Code
          </Text>
          <Text size={22}>
            Here are some examples of code I had written that allows certain parts of the software to function, namely the displaypanel component and
            internal debugger for logging to file.
          </Text>
          <Grid.Container gap={2} >
            <Grid xs={12} sm={6}>
              <Image 
                showSkeleton 
                src="/FlagboardCodeExample1.png" 
                alt='Image #1 showing example flagboard code' 
                width={1280} 
                height={300} 
                objectFit="scale-down"
                onClick={() => {
                  setVisible(true)
                  setImage("/FlagboardCodeExample1.png")
                  setModalTitle("Beginning of the Display ShowBoard function, which displays a standard race call.")
                }}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <Image 
                showSkeleton 
                src="/FlagboardCodeExample2.png" 
                alt='Image #2 showing example flagboard code' 
                width={1280} 
                height={300} 
                objectFit="scale-down"
                onClick={() => {
                  setVisible(true)
                  setImage("/FlagboardCodeExample2.png")
                  setModalTitle("The ParseDRNumbers function - which converts a string of driver numbers into a List object")
                }}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <Image 
                showSkeleton 
                src="/FlagboardCodeExample3.png" 
                alt='Image #3 showing example flagboard code' 
                width={1280} 
                height={300} 
                objectFit="scale-down"
                onClick={() => {
                  setVisible(true)
                  setImage("/FlagboardCodeExample3.png")
                  setModalTitle("Public facing debugger functions - these subtask operations to write to file.")
                }}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <Image 
                showSkeleton 
                src="/FlagboardCodeExample2.png" 
                alt='Image #4 showing example flagboard code' 
                width={1280} 
                height={300} 
                objectFit="scale-down"
                onClick={() => {
                  setVisible(true)
                  setImage("/FlagboardCodeExample4.png")
                  setModalTitle("Debugger write to file function - Takes a debugger string and writes it to file.")
                }}
              />
            </Grid>
          </Grid.Container>
          <br/>
          <Card color={"error"}>
            <Text h4>
              Cookie Notice
            </Text>
            <Text>
              Playing any of these videos may allow YouTube to store and access cookies on your device.
            </Text>
          </Card>
          <br/>
          <Text h3>
            Flagboard in use on the race circuit
          </Text>
          <Grid.Container gap={2} >
            <Grid xs={6}>
              <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube-nocookie.com/embed/FWyOEBv5pD8" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
              </iframe>
            </Grid>
            <Grid xs={6}>
              <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube-nocookie.com/embed/sbgNDn-XRY8" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
              </iframe>
            </Grid>
          </Grid.Container>
          <br/>
          <Text h3>
            Hardware Integration
          </Text>
          <Text size={22}>
            The race circuit has a number of yellow and red flashing safety lights issued around the track. Prior to me leaving the company, I had planned
            to create and implement hardware to control the track lights from the software. Here&apos;s a video of a working prototype
          </Text>
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
          <Text size={22}>
            This prototype worked through a common ATmega328 microcontroller. The software would open a serial connection with the microcontroller over USB
            and transmit case-sensitive letters to and from as sort of a crude protocol. A letter <q>R</q> send from the microcontroller to the serial listener
            for example, would trigger the event in the above video; activation of the red flashing light. The software would reply that the lights had been activated
            triggering the flashing feedback light on the switch.
          </Text>
          <br/>  
          <Text h3>
            Is that all?
          </Text>
          <Text size={22}>
            Absolutely not. I will update this article in the future to include more information about how I used Azure to distrubute the software, introduce licencing
            for other circuits and auto-update, plus some of the other cool things I added to the project that I am proud of and made this so much easier.
          </Text>
          <br/>  
          <Text size={16}>
            Daytona Motorsport and TeamSport are registered trademarks of their respective companies.
          </Text>
        </Container>
      </main>

      <Footer />
    </Container>
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