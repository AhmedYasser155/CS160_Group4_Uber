import React from 'react'
import tw from "tailwind-styled-components"
import Link from 'next/Link'

export const Footer = () => {
    const style = {
        marginTop: "10%",
        backgroundColor: "#F8F8F8",
        borderTop: "1px solid #E7E7E7",
        textAlign: "center",
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "7%",
        width: "100%"
      };

    const year = new Date().getFullYear();

    return (
        <footer style={style}>
            <Link href="/aboutUs">
                <div>About Us</div>
            </Link>
            <p>&copy; {year} Uber Clone</p>
        </footer>
    )
}

const StickyFooter = tw.div`
    
`