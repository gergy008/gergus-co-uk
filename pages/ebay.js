import React, { useState } from 'react'
import Nav from '../components/Nav.js'
import Footer from '../components/Footer.js'
import Head from 'next/head'
import { useTheme } from 'next-themes'
import { Button } from "@heroui/react";

export default function Ebay() {
  const { theme, setTheme } = useTheme()
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

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
        const errorData = await response.json();
        setError(errorData.message || "Something went wrong");
        throw new Error(errorData.message || "Something went wrong")
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
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(entryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <Head>
        <title>Steven Gergus Portfolio</title>
        <meta name="description" content="Steven Gergus | eBay Listing Description Generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav theme={theme} setTheme={setTheme}  /> 

      <main className="">
        <div className="mt-24 mb-16 flex flex-col items-start">
          <h1 
            className="text-4xl font-bold mb-5"
            style={{
              background: "linear-gradient(45deg, #ef4444 -50%, #eab308 50%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Store Description Generator.
          </h1>
        </div>
        <div className="mb-5">
          <h4 className="text-lg font-semibold mb-2">
            Enter your item description below.
          </h4>
        </div>
        <div className="mb-5 w-full">
          <form onSubmit={onSubmit}>
            <textarea
              name='desc'
              placeholder="Enter your item description..."
              defaultValue=""
              className="w-full p-3 border border-gray-300 rounded-md mb-5"
              style={{minHeight: "100px"}}
              rows={4}
            />
            <Button color="primary" type="submit">Generate</Button>
          </form>
        </div>
        <div className="mb-5 w-full">
          {error?<p className="text-red-500">Error: {typeof error === 'string' ? error : error.message || 'Unknown error'}</p>:""}
          {result?<textarea
            disabled
            name='resultvalue'
            value={result}
            className="w-full p-3 border border-gray-300 rounded-md mb-5 bg-gray-100"
            style={{minHeight: "100px"}}
            rows={4}
            readOnly
          />:""}
          {result && (
            <Button color="primary" onPress={() => copyText(result)} className="mt-2">
              {copied ? "Copied!" : "Copy"}
            </Button>
          )}
          
        </div>
      </main>

      <Footer />
    </div>
  )
}