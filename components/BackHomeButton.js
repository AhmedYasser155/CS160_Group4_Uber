import React from 'react'
import tw from "tailwind-styled-components"
import Link from 'next/Link'

export const BackHomeButton = () => {
    return (
        <ButtonContainer>
                <Link href="/">
                    <Button src="https://img.icons8.com/ios-filled/50/000000/left.png"/>
                </Link>
            </ButtonContainer>
    )
}

const ButtonContainer = tw.div`
    bg-white px-4
`

const Button = tw.img`
    h-12 cursor-pointer
`