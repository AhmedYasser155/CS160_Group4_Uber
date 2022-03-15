import React from 'react'
import { useState } from 'react'
import tw from "tailwind-styled-components"
import { BackHomeButton } from '../components/BackHomeButton'
import Link from 'next/Link'

const SignIn = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
 

    return(
        <Wrapper>
            <BackHomeButton/>

            
            <ActionItems>
                <Header> 
                     <UberLogo src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"/> 
                </Header>

                <InputContainer>
                    <InputBoxes>
                     <Input
                        placeholder = "Email"
                        value = {email}
                        onChange={(e) => {setEmail(e.target.value)}}
                    />
                    <Input
                        placeholder = "Password"
                        value = {password}
                        onChange={(e) => {setPassword(e.target.value)}}
                    />
                    </InputBoxes>

                </InputContainer>
        
                <Link href="/home">
                    <ActionButton>
                     Sign In
                    </ActionButton>
                </Link>
   
            </ActionItems>

        </Wrapper>
    )

    
}

export default SignIn

const Wrapper = tw.div`
    flex flex-col h-screen bg-gray-200 p-4
`
const ActionItems = tw.div`
    flex-1
`
const Header = tw.div`
    flex justify-between    
`
const UberLogo = tw.img`
    h-28 w-auto object-contain self-start
`

const InputContainer = tw.div`
    bg-white flex items-center px-4 mb-2
`
const InputBoxes = tw.div`
    flex flex-col flex-1
`
const Input = tw.input`
    h-10 bg-gray-200 my-2 rounded-2 p-2 outline-none border-none
`

const ActionButton = tw.div`
    flex bg-white flex-2 m-1 h-25 items-left justify-center transform
hover:scale-105 transition text-xl

`
