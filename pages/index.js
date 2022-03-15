import React from 'react'
import tw from "tailwind-styled-components"
<<<<<<< HEAD
import Link from 'next/link'

const Login = () => {
    return (
        <Wrapper>
            <UberLogo src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"/>
            <HeadImage src="https://i.ibb.co/CsV9RYZ/login-image.png"/>
            <Title>Sign up or sign in to access your account</Title>

            <ActionButtons>
            <Link href = "/signin">
            <SignInButton>Sign in</SignInButton>
            </Link>

            <Link href = "/signup">
            <SignUpButton>Sign up</SignUpButton>
            </Link>

            </ActionButtons>
            
            

        </Wrapper>
    )
=======
import Map from '../components/Map'
import Link from 'next/Link'

export default function Home({ posts }) {

  return (
    <Wrapper>
      <Map/>
      <ActionItems>
        <Header>
          <UberLogo src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"></UberLogo>
          <Profile>
            <Name>Name</Name>
            <UserImage src="https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-outline-user-icon-png-image_1727916.jpg"/>
          </Profile>
        </Header>

        <ActionButtons>
          <Link href="/search">
            <ActionButton>
              <ActionImg src="https://i.ibb.co/cyvcpfF/uberx.png"/>
                Ride
            </ActionButton>
          </Link>
          <Link href="/api/test">
            <ActionButton>
              <ActionImg src="https://i.ibb.co/5RjchBg/uberschedule.png"/>
                Schedule
            </ActionButton>
          </Link>
          
        </ActionButtons>

        <InputButton>
          Where to?
        </InputButton>
      </ActionItems>
    </Wrapper>
  )
>>>>>>> a85fcc1e596063701939e8a7ec6f3a6922670d4e
}

export default Login

const Wrapper = tw.div`
    flex flex-col h-screen bg-gray-200 p-4
`
const ActionButtons = tw.div`
  flex cursor-pointer
`

const SignUpButton = tw.button`
    bg-black text-white text-center py-4 mt-8 ml-4 self-center w-full rounded-lg
`

const SignInButton = tw.button`
    bg-black text-white text-center py-4 mt-8 mr-4 self-center w-full rounded-lg
`

const UberLogo = tw.img`
    h-20 w-auto object-contain self-start
`

const Title = tw.div`
    text-5xl pt-4 text-gray-500
`

<<<<<<< HEAD
const HeadImage = tw.img``
=======
const InputButton = tw.div`
  h-20 bg-gray-200 text-2xl p-4 flex items-center mt-8
`
>>>>>>> a85fcc1e596063701939e8a7ec6f3a6922670d4e
