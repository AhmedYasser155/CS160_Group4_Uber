import React from 'react'
import tw from "tailwind-styled-components"
import Link from 'next/Link'

import { BackButton } from '../components/BackButton'

const Ride = () => {
    return (
        <Wrapper>
            <BackButton  prevPage={"/search"}/>
            <Link href={`/search`}>
            <Cancel>Cancel Ride</Cancel>
            </Link>
            <Chat>
                <h3>Connecting to your driver ...</h3>
            </Chat>

        </Wrapper>
    )
}

export default Ride;

const Wrapper = tw.div`
    flex h-screen flex-col
`
const Chat = tw.div``

const Cancel = tw.button`
bg-black text-white text-center mt-2 mx-4 p-4 text-2xl cursor-pointer
`