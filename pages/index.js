import React from 'react'
import tw from "tailwind-styled-components"
import Link from 'next/link'
import {Footer} from '../components/Footer'
import {Router, useRouter} from 'next/router';

const Login = () => {
    const router = useRouter();
    return (
        <Wrapper>
            <UberLogo src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png" />
            <HeadImage src="https://i.ibb.co/CsV9RYZ/login-image.png" />

            <Title>Sign up or sign in to access your account</Title>

            <ActionButtons>
                <Link href="/signin" passHref>
                    <SignInButton>Sign in</SignInButton>
                </Link>

                <Link href="/signup" passHref>
                    <SignUpButton>Sign up</SignUpButton>
                </Link>

            </ActionButtons>
            
            <Footer page={"/"} />

        </Wrapper>
    )
}

export default Login
const Wrapper = tw.div`
    flex flex-col h-screen bg-gray-200 p-4
`
const ActionButtons = tw.div`
  flex cursor-pointer
`

const SignUpButton = tw.button`
    bg-black text-white text-center py-4 ml-4 self-center w-full rounded-lg
`

const SignInButton = tw.button`
    bg-black text-white text-center py-4 mr-4 self-center w-full rounded-lg
`

const UberLogo = tw.img`
    h-20 w-auto object-contain self-start
`

const Title = tw.div`
    text-3xl pt-2 text-gray-500
`

const HeadImage = tw.img`
    
`
