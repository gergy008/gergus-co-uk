import React, { useState, useRef, useEffect } from 'react'
import Nav from './components/Nav.js'
import Footer from './components/Footer.js'
import Head from 'next/head'
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useTheme } from 'next-themes'
import { Button, Container, Text, } from "@nextui-org/react";

export default function Contact() {
  const { theme, setTheme } = useTheme()
  const [token, setToken] = useState(null);
  const captchaRef = useRef(null);

  function openEmail(){
    var name = "steven"
    window.open(`mailto:${name}`+`@gergus.co.uk`)
  }

  var errors = []

  function onSubmit (e) {
    console.log("Button pressed")
    e.preventDefault()

    // this reaches out to the hCaptcha JS API and runs the
    // execute function on it. you can use other functions as
    // documented here:
    // https://docs.hcaptcha.com/configuration#jsapi
    if (token) {
      console.log("Token set already")


      // TODO
      // Start Verfication
    } else captchaRef.current.execute();
  };

  useEffect(() => {

    if (token)
      console.log(`hCaptcha Token: ${token}`);

  }, [token]);

  console.log(process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY)

  return (
    <Container md>
      <Head>
        <title>Steven Gergus Portfolio</title>
        <meta name="description" content="Steven Gergus | Portfolio Contact - Get in touch and we'll change everything together" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav theme={theme} setTheme={setTheme}  /> 

      <main className="">
        <Container css={{marginTop: "6em", marginBottom: "6em", alignItems: "flex-start"}}>
          <Text size={64} css={{ textGradient: "45deg, $red500 -50%, $yellow500 50%", marginBottom: "20px"}} weight="bold">
            Contact.
          </Text>
        </Container>
        <Container>
          <noscript>Javascript is required to protect against spam.</noscript>
          <Text h4 onClick={openEmail}>
            You got me, I&apos;ve not finished this page yet. You can email me at: steven<span style={{display: "none"}}>@crude spam protection! </span>@gergus.co.uk
          </Text>
        </Container>
      </main>

      <Footer />
    </Container>
  )
}