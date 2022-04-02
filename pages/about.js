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
        <meta name="description" content="Steven Gergus | Portfolio Home Page - Take a look at some of the projects I'm working on" />
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
                      width: "82px",
                      minWidth: "82px"
                    }}>
              About me
            </Button>
            <Button align="center" light
                    css={{
                      display:"inline-block",
                      width: "82px",
                      minWidth: "82px"
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
          <Text size={64} css={{ textGradient: "45deg, $red500 -50%, $yellow500 50%", marginBottom: "20px"}} weight="bold">
            About me.
          </Text>
        </Container>
        <Container>
          <Text h4>
            My name is Steven Gergus, I live in Manchester and I love working with technology.
          </Text>
          <br/>
          <Text h4>
            I&apos;ve always wanted to work in web development but never really knew how to get my foot in the door. 
            I started learning programming when I was introduced to Lua through a kids game. I used to play with
            a very good friend of mine, I was able to pick up scripting quicker than my good friend could, so
            ended up teaching him most of what I knew so he could go on and create his own content.
          </Text>
          <br/>
          <Text h4>
            I created my own website in secondary school for my classmates to do anything but their class-work on around 2009. 
            It had a messageboard (inspired by 4chan) and flash-based games that my classmates could play, 
            if they had the money for it. Flash-games required vouchers that could be purchased for access to the site.
            This would pay for more domain names when the IT department caught up with my antics. Everything was hand made 
            using PHP -- and HTML Tables for the website structure (that was a nightmare).
            <br/>
            <a href='https://web.archive.org/web/20090828042157/http://www.gergy.info/' target={"_blank"} rel="noreferrer" style={{color:"#0070F3"}}>
              Take a look at my first ever website on archive.org
            </a>
          </Text>
          <br/>
          <Text h4>
            I completed a software development course in college, and moved onto university completing two years of study and
            leaving with a Diploma of Higher Education in Computer Science. From there I followed friends around to various jobs
            while well paid; are simply not as satisfactory as being in a creative role. I decided to take on a number of projects 
            across the years to improve my knowledge and build up a portfolio, so I can prove that I have the experience required 
            to make beautiful, stunning websites.
          </Text>
          <br/>
          <Text h4>
            Hop, skip and jump some of the cool things I&apos;ve made in the past, to tell you I&apos;ll be updating my portfolio with 
            more content as and when I&apos;m able to recover missing source code from various repos and flash drives lying around. 
            I&apos;d love to show you what other things I&apos;m capable of. It includes plenty of PHP, a good side of C# and a sprinkle 
            of Objective-C among others.
          </Text>
          <br/>
          <Text h4>
            If you&apos;d like to get in touch please <Link href={"/contact"}><a style={{color:"#0070F3"}}>contact me.</a></Link>
          </Text>
          <br/>
          <Text h4>
            Thanks for reading,
          </Text>
          <Text h4>
            Steve
          </Text>
        </Container>
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