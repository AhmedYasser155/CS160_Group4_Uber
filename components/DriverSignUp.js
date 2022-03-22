import React from 'react'
import { useState } from 'react'
import tw from "tailwind-styled-components"


export const DriverSignUp = () => {

    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [lisenceNumber, setLisenceNumber] = useState()

    return (
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
            type = "password"
            onChange={(e) => {setPassword(e.target.value)}}
        />
        <Input
            placeholder = "Phone Number"
            value = {phoneNumber}
            onChange={(e) => {setPhoneNumber(e.target.value)}}
        />
        <Input
            placeholder = "Drivers Lisence Number"
            value = {lisenceNumber}
            onChange={(e) => {setLisenceNumber(e.target.value)}}
        />
       
        </InputBoxes>

    </InputContainer>
    )
}

const InputContainer = tw.div`
    bg-white flex items-center px-4 mb-2
`
const InputBoxes = tw.div`
    flex flex-col flex-1
`
const Input = tw.input`
    h-10 bg-gray-200 my-2 rounded-2 p-2 outline-none border-none
`