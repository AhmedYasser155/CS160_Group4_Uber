import React from 'react'
import { useState } from 'react'
import tw from "tailwind-styled-components"
import { BackHomeButton } from '../components/BackHomeButton'
import { DriverSignUp } from '../components/DriverSignUp'
import { RiderSignUp } from '../components/RiderSignUp'
import {Footer} from '../components/Footer'

const SignUp = () => {
    

    const [select, setSelect] = useState("rider")
    const [isToggled, setIsToggled] = useState(false);

    return(
        <Wrapper>
            <BackHomeButton/>

            <ActionItems>
                <Header> 
                     <UberLogo src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"/> 
                </Header>

                <RadioButtons>
                    
               
                        
                        <Input
                                type = "radio"
                                label = "rider"
                                value = "rider"
                                checked = {select == "rider"}
                                onChange={(e) => {setSelect(e.target.value),setIsToggled(!isToggled)}}
                                
    
                            />
                           <RadioButtonLabel>
                               
                                I am a Rider
    
                           </RadioButtonLabel>
        
                             <Input
                                type = "radio"
                                label = "driver"
                                value = "driver"
                                checked = {select == "driver"}
                                onChange={(e) => {setSelect(e.target.value, setIsToggled(!isToggled))}}
                                
    
                            />
                           <RadioButtonLabel>
                               
                                I am a Driver
    
                           </RadioButtonLabel>
    
                        
    
                </RadioButtons>

                    {isToggled ? <DriverSignUp/> : <RiderSignUp/>}

   
            </ActionItems>
            <Footer/>
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

const Input = tw.input`
    h-10 bg-gray-200 my-2 rounded-2 p-2 outline-none border-none
`

const RadioButtons = tw.div`
    flex px-4 
`
const RadioButtonLabel = tw.label`
    flex flex-row items-center ml-1 mr-4 text-gray-700 font-bold 
`


