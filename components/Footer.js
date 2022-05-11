import React from 'react'
import tw from "tailwind-styled-components"
import Link from 'next/Link'

export const Footer = (props) => {
    const style = {
        marginTop: "3%",
        backgroundColor: "#F8F8F8",
        borderTop: "1px solid #E7E7E7",
        textAlign: "center",
        left: "0",
        bottom: "0",
        height: "7%",
        width: "100%"
      };

    const year = new Date().getFullYear();

    return (
        <footer style={style}>
            <Link href={{
                pathname:"/aboutUs",
                query: {prevPage: props.page},
            }}>
                <div>About Us</div>
            </Link>
            <p>&copy; {year} Uber Clone</p>
        </footer>
    )
}

const StickyFooter = tw.div`
    
`