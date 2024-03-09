import React, { useState, useRef } from 'react'
import Nav from './components/Nav.js'
import Footer from './components/Footer.js'
import Head from 'next/head'
import { Textarea } from "@nextui-org/react";
import { useTheme } from 'next-themes'
import { Button, Container, Text, } from "@nextui-org/react";

export default function Contact() {
  const { theme, setTheme } = useTheme()
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  async function getNewDescription(text){
    try {
      const response = await fetch("/api/ebay", {
        method: "POST",
        body: JSON.stringify({ desc: text }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        // If the response is ok then show the email returned
        console.log("Description recieved");
        response.json().then((json) => {
          console.log(json);
          setResult(json.result)
        })
      } else {
        // Else throw an error with the message returned
        // from the API
        setError(await response.json());
        throw new Error(error.message)
      }
    } catch (error) {
      console.error(error?.message || "Something went wrong");
    }
  }

  function onSubmit (e) {
    e.preventDefault();

    var formData = new FormData(e.target);
    const form_values = Object.fromEntries(formData);
    console.log('form values', form_values)

    getNewDescription(form_values);
  };

  function copyText(entryText){
    navigator.clipboard.writeText(entryText);
  }

  return (
    <Container md>
      <Head>
        <title>Steven Gergus Portfolio</title>
        <meta name="description" content="Steven Gergus | eBay Listing Description Generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav theme={theme} setTheme={setTheme}  /> 

      <main className="">
        <Container css={{marginTop: "6em", marginBottom: "4em", alignItems: "flex-start"}}>
          <Text size={64} css={{ textGradient: "45deg, $red500 -50%, $yellow500 50%"}} weight="bold">
            Store Description Generator.
          </Text>
        </Container>
        <Container css={{marginBottom: "20px",}}>
          <Text h4>
            Enter your item description below.
          </Text>
        </Container>
        <Container css={{marginBottom: "20px", width: "100%",}}>
          <form onSubmit={onSubmit}>
            <Textarea
              css={{marginBottom: "20px",}}
              name='desc'
              label="Description"
              labelplacement="outside"
              placeholder=""
              defaultValue=""
              className=""
              fullWidth={true}
              minRows={4}
              maxRows={12}
            />
            <Button color={"primary"} type="submit">Generate</Button>
          </form>
        </Container>
        <Container css={{marginBottom: "20px", width: "100%",}}>
          {error?<Text color='error'>Error: {error}</Text>:""}
          {result?<Textarea css={{marginBottom: "20px",}}
            isDisabled
            name='resultvalue'
            label={<Button color={"success"} onClick={() => copyText(result)}>{copied?"Copied!":"Copy"}</Button>}
            labelplacement="outside"
            value={result}
            className=""
            fullWidth={true}
            minRows={4}
            maxRows={12}
          />:""}
          
        </Container>
      </main>

      <Footer />
    </Container>
  )
}