import React from 'react'
import tw from "tailwind-styled-components"

const Login = () => {
    return (
        <Wrapper>
            <UberLogo src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"/>
            <HeadImage src="https://i.ibb.co/CsV9RYZ/login-image.png"/>
            <Title>Log in to access your account</Title>
            <SignInButton>Sign in with Google</SignInButton>
        </Wrapper>
    )
}

export default Login

const Wrapper = tw.div`
    flex flex-col h-screen bg-gray-200 p-4
`

const SignInButton = tw.button`
    bg-black text-white text-center py-4 mt-8 self-center w-full
`

const UberLogo = tw.img`
    h-20 w-auto object-contain self-start
`

const Title = tw.div`
    text-5xl pt-4 text-gray-500
`

const HeadImage = tw.img``