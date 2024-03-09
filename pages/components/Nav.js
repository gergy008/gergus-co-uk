import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useTheme } from 'next-themes'
import { Row, Text, Button, Col, Tooltip } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

export default function Nav({ theme, setTheme }) {
    const [ currentIcon, setCurrentIcon ] = useState()
 
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
            //setSVGColor("#FFF")
          } else {
            setCurrentIcon(faSun);
            //setSVGColor("#000")
          }
        }
        checkIcon();
      }, [theme, setCurrentIcon]);
    return (
        <nav id="navbar-container">
        <Row gap={1} align="center" css={{ marginTop: "10px", }}>
            <Col gap={1}>
            <Link href="/">
                <Text h4 size={24}>
                    Gergus.co.uk
                </Text>
            </Link>
            </Col>
            <Col gap={1} justify="flex-end" width="100%" css={{display:"flex", marginLeft: "auto", marginRight: "0px"}}>
            <div style={{width: "100%"}}>

            </div>
            <Link href="/about" passHref>
                <Button align="center" light
                        css={{
                        display:"inline-block",
                        width: "82px",
                        minWidth: "82px"
                        }}>
                About me
                </Button>
            </Link>
            <Link href="/contact" passHref>
                <Button align="center" light
                        css={{
                            display:"inline-block",
                            width: "82px",
                            minWidth: "82px"
                        }}>
                    Contact
                </Button>
            </Link>
            <Tooltip
                color="invert"
                content={theme=="light"?"Dark mode":"Light mode"}
                placement="bottomEnd"
            >
                <Button color={currentIcon===faSun?"Gray200":"Gray900"} 
                        onClick={toggleTheme} 
                        align="center" 
                        title={currentIcon===faSun?"Toggle Dark Mode":"Toggle Light Mode"} 
                        css={{
                        display:"inline-block",
                        width: "46px",
                        minWidth: "46px"
                        }}>
                <FontAwesomeIcon icon={currentIcon} />
                </Button>
            </Tooltip>
            </Col>
        </Row>
        </nav>
    )
}
