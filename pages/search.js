import React from 'react'
import { useState } from 'react'
import tw from "tailwind-styled-components"
import Link from 'next/Link'
import { BackButton } from '../components/BackButton'
import {InputLocation} from '../components/InputLocation'

const Search = () => {

    const [pickup, setPickup] = useState()
    const [dropoff, setDropoff] = useState()

    return (
        <Wrapper>
            <BackButton/>
            
            <InputContainer>
                <FromToIcon>
                    <Circle src="https://img.icons8.com/ios-filled/50/9CA3AF/filled-circle.png"/>
                    <Line src="https://img.icons8.com/ios/50/9CA3AF/vertical-line.png"/>
                    <Square src="https://img.icons8.com/windows/50/000000/square-full.png"/>
                </FromToIcon>

                <InputBoxes>
                    {/* <Input
                        placeholder="Enter pickup location"
                        value={pickup}
                        onChange={(e) => {setPickup(e.target.value)}}
                    /> */}
                    <InputLocation text='Your pickup location?'/>

                    {/* <Input
                        placeholder="Where to?"
                        value={dropoff}
                        onChange={(e) => {setDropoff(e.target.value)}}
                    /> */}
                </InputBoxes>

                //<PlusIcon src="https://img.icons8.com/windows/50/000000/plus-math.png"/>
            </InputContainer>

            <SavePlace>
                <StarIcon src="https://img.icons8.com/ios-filled/50/ffffff/star--v1.png"/>
                Saved Places
            </SavePlace>

            <Link href={{
                pathname: "/confirm",
                query: {
                    pickup: pickup,
                    dropoff: dropoff
                }
                }}>
                <ConfirmContainer>
                    Confirm Location
                </ConfirmContainer>
            </Link>
            
        </Wrapper>
    )
}

export default Search

const Wrapper = tw.div`
    bg-gray-200 h-screen
`

const InputContainer = tw.div`
    bg-white flex items-center px-4 mb-2
`

const FromToIcon = tw.div`
    w-10 flex flex-col mr-2 items-center
`

const Circle = tw.img`
    h-2.5
`

const Line = tw.img`
    h-10
`

const Square = tw.img`
    h-3
`

const InputBoxes = tw.div`
    flex flex-col flex-1
`

const Input = tw.input`
    h-10 bg-gray-200 my-2 rounded-2 p-2 outline-none border-none
`

const PlusIcon = tw.img`
    w-10 h-10 bg-gray-200 rounded-full ml-3 cursor-pointer
`

const SavePlace = tw.div`
    flex items-center bg-white px-4 py-2
`

const StarIcon = tw.img`
    bg-gray-400 w-10 h-10 p-2 rounded-full mr-2
` 

const ConfirmContainer = tw.div`
    bg-black text-white text-center mt-2 mx-4 p-4 text-2xl cursor-pointer
`
