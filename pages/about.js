import Nav from "./components/Nav.js";
import Footer from "./components/Footer.js";
import Head from "next/head";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Container, Text } from "@nextui-org/react";

export default function About() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Container md>
        <Head>
          <title>Steven Gergus Portfolio</title>
          <meta
            name="description"
            content="Steven Gergus | Portfolio About Me - Learn more about me"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Nav theme={theme} setTheme={setTheme} />

        <main className="">
          <Container
            css={{
              marginTop: "6em",
              marginBottom: "6em",
              alignItems: "flex-start",
            }}
          >
            <Text
              size={64}
              css={{
                textGradient: "45deg, $red500 -50%, $yellow500 50%",
                marginBottom: "20px",
              }}
              weight="bold"
            >
              About me.
            </Text>
          </Container>
          <Container>
            <Text h3>
              My name is Steven! I live &amp; work in Bolton. Here is pretty much my life story.
            </Text>
            <br />
            <Text size={22}>
              I&apos;d always wanted to work in software development but never
              really knew how to get my foot in the door. Since a teen I&apos;ve
              become to love problem solving and creating tangible things for
              myself and others to enjoy. I decided in 2022 to start do something 
              I know I love; from the people that grew to know me, I was hearing more
              and more the same phrase:
            </Text>
            <br />
            <Text
              h4
              size={22}
              css={{ textGradient: "45deg, $red500 -10%, $yellow500 50%" }}
            >
              <i>
                <q>Why are you here? Why don&apos;t you work in IT?</q>
              </i>
            </Text>
            <br />
            <Text size={22}>
              Change started in July 2022, in a completely conincidental conversation between a family member and their collegue (a recruiter).
              <br />
              &quot;He&apos;s not happy where he is...&quot;
              <br />
              &quot;Is he any good with computers?&quot;
              <br />
              I&apos;d worked in my current role for 3 years at this time. I had plans to progress, my company however did not. 
              I was struggling and blamed myself. I was at my lowest point when this dilemma came up. I have bills to pay,
              I&apos;m struggling to do well here, what makes me think I&apos;ll do well elsewhere? Why can&apos;t I just care less which is 
              essential to better perfomance? Family work here - Will I let them down?
            </Text>
            <br />
            <Text size={22}>
              I struggled to make a decision, but took the leap and applied. The more I learned about this &quot;Master Data Analyist&quot; role, 
              the more I realised how happy I was to be applying for it. I started a 6 month temporary contract with Sherwin-Williams 
              on 19th August 2022. March 2023 it was confirmed due to skills and perfomance, Sherwin will extend to Dec 2023.
            </Text>
            <br />
            <Text size={22}>
              Many collegues prompted me to apply for a permenant role that appeared - &quot;Product Information Specialist&quot;.
              I applied. 
              <br />As of September 2023, I was accepted for the job.
            </Text>
            <br />
            <Text size={22}>
              I&apos;m so lucky to work here. Sherwin is excellent at understanding diversity and differences in people. In my experience, 
              Sherwin creates a culture where <i>equity</i> over <i>equality</i> is clearly understood and demonstrated.<br />
              I used work extra hours because I had to, now it&apos;s because I love what I do.
            </Text>
            <br />
            <Text h3>How did it all start?</Text>
            <br />
            <Text size={22}>
              I started learning programming when I was introduced to{" "}
              <a
                href="https://www.lua.org/"
                target={"_blank"}
                rel="noreferrer"
                style={{ color: "#0070F3" }}
              >
                Lua
              </a>
              &nbsp;through a game as a kid. I was able to pick up scripting
              easier than my good friend I used to play these game with, so
              ended up teaching him most of what I knew so he could go on and
              create his own content &amp; games. I began to love figuring out
              the little solutions to a bigger problem and seeing it come to
              life in front of me.
            </Text>
            <br />
            <Text size={22}>
              I created my own website in secondary school for my classmates to
              do anything but their class-work on around 2009. It had a
              messageboard (inspired by various messageboards) and flash-based games that my
              classmates could enjoy in class{" "}
              <small>(if they had the money for it)</small>. My classmates were
              able to buy vouchers which they could redeem for access to certain
              games the site. This would pay for more domain names (.info
              domains were 99p a year!) when the IT department filtered a domain
              after catching up with my antics. Everything was hand made using
              PHP. From authentication, transactions and rendering out printable
              vouchers.
              <br />
              <a
                href="https://web.archive.org/web/20090828042157/http://www.gergy.info/"
                target={"_blank"}
                rel="noreferrer"
                style={{ color: "#0070F3" }}
              >
                Take a small look at the remains of my first ever website on
                archive.org
              </a>
            </Text>
            <br />
            <Text size={22}>
              I completed a Level 3 Software Development course in college
              achieving a DDM. My favourite assigment was a Cocos2D-x based iOS
              platformer game, of which the protagonist was my friend and
              classmate (who hates the sun), the character proceeds along a
              sunny beach in a dark hoodie collecting monster cans and avoiding
              sunlight, complete with sound effects, health and a theme song
              which I composed myself on garageband.
            </Text>
            <br />
            <Text size={22}>
              After college I moved onto university completing two years of
              study and leaving with a Diploma of Higher Education in Computer
              Science. I picked up a number of skills, from algorithms and data
              structures, to data engineering with Oracle databases. I was late
              to the game on securing a placement, which restricted my options
              upon leaving university. I&apos;ve followed friends around to
              various comfortably-paid roles, however they simply do not fulfil
              my life goals or satisfy my creative desire.
            </Text>
            <br />
            <Text size={22}>
              I decided to take on a number of projects across the years to
              improve my knowledge and build up a portfolio, so I can prove that
              I have the skills required to think creatively, create beautiful websites and
              functional software.
            </Text>
            <br />
            <Text size={22}>
              Hop, skip and jump some of the cool things I&apos;ve made in the
              past, to let you know I&apos;ll be updating my portfolio with more
              content as and when I&apos;m able to find and put together
              everything in a format for web. I&apos;d love to show you what
              other things I&apos;m capable of. It includes plenty of PHP, a
              good side of C# and a sprinkle of Objective-C among others.
            </Text>
            <br />
            <Text size={22}>
              If you&apos;d like to get in touch please{" "}
              <Link href={"/contact"}>
                <a style={{ color: "#0070F3" }}>contact me.</a>
              </Link>
            </Text>
            <br />
            <Text size={22}>Thanks for reading!</Text>
            <Text size={22}>Steve</Text>
          </Container>
        </main>

        <Footer />
      </Container>
    </>
  );
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
