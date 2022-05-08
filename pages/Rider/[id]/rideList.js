import React from 'react'
import tw from "tailwind-styled-components"
import Link from 'next/Link'
import {useRouter} from 'next/router'
import { BackButton } from '../../../components/BackButton'

const RideList = () => {
    const router = useRouter()
    const id = router.query.id
    return (
        <Wrapper>
            <BackButton  prevPage={`/Rider/${id}/confirmscheduling`}/>
            <Chat>
                <h3>Added ride to your schedule</h3>
                {/* a list of scheduled ride will be fetched from database to displace here */}
                <h4>Your Schedule: (list of rides will be displaced here)</h4>
            </Chat>

        </Wrapper>
    )
}

export default RideList;

const Wrapper = tw.div`
    flex h-screen flex-col
`
const Chat = tw.div``

const Cancel = tw.button`
bg-black text-white text-center mt-2 mx-4 p-4 text-2xl cursor-pointer
`