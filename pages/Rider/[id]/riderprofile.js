import React from "react"
import tw from "tailwind-styled-components"
import "tailwindcss/tailwind.css"
import { getUser } from '../../../APIFunctions/DbFunctions'
import { BackHomeButton } from '../../../components/BackHomeButton'
import "tailwindcss/tailwind.css"


export default function RiderProfile({userData}){

    const first = userData.firstName
    const last = userData.lastName
    const email = userData.email
    const phone = userData.phone

    return(
        <Wrapper>
            <BackHomeButton/>

            <Header> 
                     <UberLogo src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"/> 
            </Header>
            <ProfileContainer>
            
            <NameContainer>
                <Icon>
                 <svg class="absolute w-18 h-18 text-gray-500 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>

                </Icon>
                <Text>
                    {first} {last}
                </Text>

            </NameContainer>
            <ProfileInformation>
                <ProfileText>
                    Email: {email}
                </ProfileText>
                <ProfileText>
                    Phone Number: {phone}
                </ProfileText>
            </ProfileInformation>


        </ProfileContainer>

        </Wrapper>
    )
}

export async function getServerSideProps({params})
{
    //getting user by id 
     const user = await getUser(params.id);
     const userData = user.responseData
    
     
     
     return{
         props:{
            userData,
         },
     };
    }


const ProfileContainer = tw.div`
    bg-white px-4 mb-2 py-10 flex-col h-fit rounded-3xl 
`
const NameContainer = tw.div`
    flex flex-row items-center justify-center pt-4
   
`
const Icon = tw.div`
    relative w-20 h-20 overflow-hidden bg-gray-400 rounded-full dark:bg-gray-600
`
const Text = tw.p`
    font-bold text-xl mx-4 my-4
`
const ProfileInformation = tw.div`
    flex flex-col items-center justify-center my-4
`
const ProfileText = tw.p`
    mx-4 my-4 text-xl
`
const Wrapper = tw.div`
    flex flex-col h-screen bg-gray-200 p-4
`

const Header = tw.div`
    flex justify-between    
`
const UberLogo = tw.img`
    h-28 w-auto object-contain self-start 
`
const LogoutButton = tw.button`
    flex bg-gray-300 justify-center transform hover:scale-105 transition text-xl w-full text-red-600 rounded-m

`