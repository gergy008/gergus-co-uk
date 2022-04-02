import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { useTheme } from 'next-themes'
import { Container, Card, Row, Text, Button, Col, Grid } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [ currentIcon, setCurrentIcon ] = useState()
  const [ svgColor, setSVGColor ] = useState("#000")

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
      default:
        console.warn(`Card ${card} was clicked, but the ID was not recognised`)
    }
  }

  function toggleTheme(){
    if(theme === "light") {
      setTheme('dark');
      setCurrentIcon(faMoon);
    }
    else {
      setTheme('light');
      setCurrentIcon(faSun);
    }
  }

  useEffect(() => {
    function checkIcon(){
      if(theme === "dark") {
        setCurrentIcon(faMoon);
        setSVGColor("#FFF")
      } else {
        setCurrentIcon(faSun);
        setSVGColor("#000")
      }
    }
    checkIcon();
  }, [theme, setCurrentIcon]);

  return (
    <Container md>
      <Head>
        <title>Steven Gergus Portfolio</title>
        <meta name="description" content="Portfolio for Steven Gergus | Take a look at the technologies I've trained in" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav id="navbar-container" >
        <Row gap={1} align="center" css={{ marginTop: "10px", }}>
          <Col gap={1}>
            <Link href="/">
              <a>
                <Text h4 size={24}>
                  Gergus.co.uk
                </Text>
              </a>
            </Link>
          </Col>
          <Col gap={1} justify="flex-end" width="100%" css={{display:"flex", marginLeft: "auto", marginRight: "0px"}}>
            <div style={{width: "100%"}}>

            </div>
            <Button align="center" light
                    css={{
                      display:"inline-block",
                      width: "96px",
                      minWidth: "96px"
                    }}>
              Contact
            </Button>
            <Button color={currentIcon===faSun?"Gray200":"Gray900"} onClick={toggleTheme} align="center"
                    css={{
                      display:"inline-block",
                      width: "46px",
                      minWidth: "46px"
                    }}>
              <FontAwesomeIcon icon={currentIcon} />
            </Button>
          </Col>
        </Row>
      </nav>

      <main className="">
        <Container css={{marginTop: "6em", marginBottom: "6em", alignItems: "flex-start"}}>
          <Text size={72} css={{ textGradient: "45deg, $red500 -50%, $yellow500 50%", marginBottom: "20px"}} weight="bold">
            Hello.
          </Text>
          <Text h3 css={{ marginTop: "20px", }}>
            My name is Steven Gergus, I&apos;m a web developer from Manchester!
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
              <Text h6 css={{marginBottom:"10px"}} color='#DDDDDDFF'>
                Basic social network built in React. Click or tap to view the GitHub page
              </Text>
              <Image src="/gergynet-react-app-card.png" alt='Image example of my basic social network react app.' width={622} height={617}/>
            </Card>
          </Grid>
          <Grid xs={12} sm={4}>
            <Card hoverable clickable onClick={()=>cardClicked(2)} color="secondary">
              <Text h5 weight="bold" transform="uppercase" color='#DDDDDDFF'>
                CRM and Booking System
              </Text>
              <Text h6 css={{marginBottom:"10px"}} color='#DDDDDDFF'>
                Built using CodeIgniter framework, to practice relational data structures in MySQL. Utilises mobile first material UI design for a modern feel. 
              </Text>
              <Image src="/hedgehog-php-app-card.png" alt='Image example of my basic social network react app.' width={643} height={607}/>
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
              <hr/>
              <Text h6>
                This website is my latest project. Built using Next.js - Next.js allows me to rapid prototype, expedite deployment and experiment with new technologies.
              </Text>
              <hr/>
              <Text h6 css={{marginBottom:"10px"}}>
                Because everything is hosted via Vercel; I&apos;m able to commit my changes with git and have everything compiled and deployed live automatically. Pretty cool!
              </Text>
            </Card>
          </Grid>
        </Grid.Container>
      </main>

      <div>
        &nbsp;
      </div>

      <footer justify="center" align="center">
        <p>© 2022 Steven Gergus</p>
      </footer>
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