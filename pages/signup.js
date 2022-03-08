import React from 'react'
import { useState } from 'react'
import tw from "tailwind-styled-components"
import { BackHomeButton } from '../components/BackHomeButton'
import Link from 'next/Link'



const SignUp = () => {
    
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    

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
                        placeholder = "First Name"
                        value = {firstName}
                        onChange={(e) => {setFirstName(e.target.value)}}
                    />
                    <Input
                        placeholder = "Last Name"
                        value = {lastName}
                        onChange={(e) => {setLastName(e.target.value)}}
                    />
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
                    <Input
                        placeholder = "Phone Number"
                        value = {phoneNumber}
                        onChange={(e) => {setPhoneNumber(e.target.value)}}
                    />
                    </InputBoxes>

                </InputContainer>
        
                <Link href="/">
                    <ActionButton>
                     Sign up
                    </ActionButton>
                </Link>
   
            </ActionItems>

        </Wrapper>
    )
}

export default SignUp

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

