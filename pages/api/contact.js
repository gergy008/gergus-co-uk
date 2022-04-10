// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body

  // Optional logging to see the responses
  // in the command line where next.js app is running.
  console.log('request body: ', body)

  // Guard clause checks for first and last name,
  // and returns early if they are not found
  if (!body.captcha) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: 'recaptcha token not found' })
  }

  
  try {
    fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      body: { response: "CLIENT-RESPONSE", captcha: body.captcha, },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) { 
        // If the response is ok then show the email returned
        console.log("Token validated successfully");

        // Response was ok
        // Sends a HTTP success code with email data
        res.status(200).json({ email: `steven@gergus.co.uk`, })
      } else {
        // Else throw an error with the message returned
        // from the API
        response.json().then((error)=>{
          throw new Error(error.message)
        });
      }
    });
  } catch (error) {
    console.error(error?.message || "Something went wrong");

    // Response was bad
    // Sends a HTTP error code with reason
    res.status(500).json({ message: error?.message || "Something went wrong", })
  }
}