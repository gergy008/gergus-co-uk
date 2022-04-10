import { useState } from 'react'
import Nav from './components/Nav.js'
import Footer from './components/Footer.js'
import Head from 'next/head'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { Container, Card, Text, Grid } from "@nextui-org/react";

export default function Index() {
  const { theme, setTheme } = useTheme()
  //const [ svgColor, setSVGColor ] = useState("#000")

  function cardClicked(card){
    console.log(`Card ${card} was clicked`)
    switch (card){
      case 1: //GergyNet
        window.open("https://github.com/gergy008/testauth", "_blank");
        break;
      case 2:
        window.open("https://hedgehog.gergy.co.uk/staff", "_blank");
        break;
      case 3:
        break;
      case 4:
        window.open("/flagboard", "_self");
        break;
      default:
        console.warn(`Card ${card} was clicked, but the ID was not recognised`)
    }
  }

  return (
    <Container md>
      <Head>
        <title>Steven Gergus Portfolio</title>
        <meta name="description" content="Steven Gergus | Portfolio Home Page - Take a look at some of the projects I'm working on" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='background-theme bg-1'>
        <Image src={"/backblot1.svg"} width={1000} height={1000} alt="background design element" />
      </div>
      <div className='background-theme bg-2'>
        <Image src={"/backblot2.svg"} width={1000} height={1000} alt="background design element" />
      </div>
      {/* setSVGColor={setSVGColor} */}
      <Nav theme={theme} setTheme={setTheme}  /> 

      <main className="">
        <Container css={{marginTop: "6em", marginBottom: "6em", alignItems: "flex-start"}}>
          <Text size={72} css={{ textGradient: "45deg, $red500 -50%, $yellow500 50%", marginBottom: "20px"}} weight="bold">
            Hello.
          </Text>
          <Text h3 css={{ marginTop: "20px", }}>
            My name is Steven Gergus, I&apos;m a software developer from Greater Manchester, UK!
          </Text>
        </Container>
        <Grid.Container gap={2} css={{alignItems: "flex-start"}}>
          <Grid xs={12}>
            <Text h4>
              Here&apos;s some of my projects
            </Text>
          </Grid>
          <Grid xs={12} sm={4}>
            <Card hoverable clickable onClick={()=>cardClicked(1)} color="primary">
              <Text h5 weight="bold" transform="uppercase" color='#DDDDDDFF'>
                GergyNet Social network
              </Text>
              <br/>
              <Text h6 css={{marginBottom:"10px"}} color='#DDDDDDFF'>
                Basic social network built in React. Click or tap to view the GitHub page
              </Text>
              <br />
              <Image showSkeleton src="/gergynet-react-app-card.png" alt='Image example of my basic social network react app.' width={622} height={617} objectFit="scale-down"/>
            </Card>
          </Grid>
          <Grid xs={12} sm={4}>
            <Card hoverable clickable onClick={()=>cardClicked(2)} color="secondary">
              <Text h5 weight="bold" transform="uppercase" color='#DDDDDDFF'>
                CRM and Booking System
              </Text>
              <br/>
              <Text h6 css={{marginBottom:"10px"}} color='#DDDDDDFF'>
                Built using CodeIgniter framework, to practice relational data structures in MySQL. Utilises mobile first material UI design for a modern feel. 
              </Text>
              <br/>
              <Image showSkeleton src="/hedgehog-php-app-card.png" alt='Image example of my basic social network react app.' width={643} height={607} objectFit="scale-down"/>
            </Card>
          </Grid>
          <Grid xs={12} sm={4}>
            <Card hoverable onClick={()=>cardClicked(4)} color="default">
              <Text h5 weight="bold" transform="uppercase" >
                Flagboard Application
              </Text>
              <br/>
              <Text h6>
                Custom C# Solution used at Daytona Motorsport Trafford (Now TeamSport) that made my job much simpler &amp; replaced <i>a lot</i> of paper.
              </Text>
              <br/>
              <Image showSkeleton src="/flagboard-cs-example-card.png" alt='Image example of the flagboard C# app' width={571} height={525} objectFit="scale-down"/>
            </Card>
          </Grid>
          <Grid xs={12} sm={4}>
            <Card hoverable onClick={()=>cardClicked(3)}>
              <Text h5 weight="bold" transform="uppercase" >
                Meta
              </Text>
              <Text h6>
                ...not the Zuckerburg type...
              </Text>
              <br/>
              <Text h6>
                This website is my latest project. Built using Next.js - Next.js allows me to rapid prototype, expedite deployment and experiment with new technologies.
              </Text>
              <br/>
              <Text h6 css={{marginBottom:"10px"}}>
                Because everything is hosted via Vercel; I&apos;m able to commit my changes with git and have everything compiled and deployed live automatically. Pretty cool!
              </Text>
            </Card>
          </Grid>
        </Grid.Container>
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