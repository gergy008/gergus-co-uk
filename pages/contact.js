import React, { useState, useRef } from 'react'
import Nav from './components/Nav.js'
import Footer from './components/Footer.js'
import Head from 'next/head'
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useTheme } from 'next-themes'
import { Button, Container, Text, } from "@nextui-org/react";

export default function Contact() {
  const { theme, setTheme } = useTheme()
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const captchaRef = useRef(null);

  function onLoad (e) {
    console.log("hCapcha Loaded")
  };

  async function onCaptchaChange(){
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({ captcha: token }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        // If the response is ok then show the email returned
        console.log("Recaptcha was a success");
        response.json().then((json) => {
          console.log(json);
          setEmail(json.email)
        })
      } else {
        // Else throw an error with the message returned
        // from the API
        const error = await response.json();
        throw new Error(error.message)
      }
    } catch (error) {
      console.error(error?.message || "Something went wrong");
    } finally {
      // Reset the reCAPTCHA when the request has failed or succeeeded
      // so that it can be executed again if user submits another email.
      captchaRef.current.resetCaptcha();
      setToken(null);
    }
  }

  function onSubmit (e) {
    //console.log("On submit")
    e.preventDefault();

    // this reaches out to the hCaptcha JS API and runs the
    // execute function on it. you can use other functions as
    // documented here:
    // https://docs.hcaptcha.com/configuration#jsapi
    if (token) {
      //console.log("Token set already, verifying...")
      onCaptchaChange();
    } else {
      //console.log("No token, forcing challenge...")
      captchaRef.current.execute();
    }
  };
/*
  useEffect(() => {

    if (token)
      console.log(`hCaptcha Token: ${token}`);

  }, [token]);
*/

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
        <Container css={{marginTop: "6em", marginBottom: "4em", alignItems: "flex-start"}}>
          <Text size={64} css={{ textGradient: "45deg, $red500 -50%, $yellow500 50%"}} weight="bold">
            Contact.
          </Text>
        </Container>
        <Container css={{marginBottom: "20px",}}>
          <Text h3>
            How this page works
          </Text>
          <Text h4>
            When you submit the form below, a RESTful request is made to a NextJS server-side function containing
            a token generated by hCaptcha. This is sent from the server to hCaptcha, validated, then a response 
            sent back to this app confirming the request was successful. The email address is never sent to the 
            client until this token is verified.
          </Text>
        </Container>
        <Container css={{marginBottom: "20px",}}>
          <noscript>Javascript is required to protect against spam.</noscript>
          <Text h4>
            Please complete the challenge below to reveal email address. hCaptcha is used to protect your privacy.
          </Text>
          <br/>
          <form onSubmit={onSubmit}>
            <HCaptcha
              sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
              onLoad={onLoad}
              onVerify={setToken}
              ref={captchaRef}
              theme={theme}
            />
            <Button color={"warning"} type="submit">Reveal email address</Button>
          </form>
          <br/>
          {email!==""?<Text h4>My email address is: <a href={`mailto:${email}`} target="_blank" rel="noreferrer">{email}</a></Text>:<Text h4>Please complete the challenge</Text>}
        </Container>
      </main>

      <Footer />
    </Container>
  )
}