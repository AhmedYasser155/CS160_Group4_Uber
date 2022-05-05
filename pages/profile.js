import React from 'react'
import { useState, useEffect } from 'react'
import { Router,useRouter } from "next/router"
import tw from "tailwind-styled-components"
import { BackHomeButton } from '../components/BackHomeButton'
import { RiderProfile } from '../components/RiderProfile'

const Profile = () => {

   
    return(
        <Wrapper>
            <BackHomeButton/>

            <Header> 
                     <UberLogo src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"/> 
            </Header>
            
            <RiderProfile/>


        </Wrapper>
    )

    
}

export default Profile




const Wrapper = tw.div`
    flex flex-col h-screen bg-gray-200 p-4
`

const Header = tw.div`
    flex justify-between    
`
const UberLogo = tw.img`
    h-28 w-auto object-contain self-start 
`
