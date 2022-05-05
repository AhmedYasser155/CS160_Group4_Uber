import Head from 'next/head'
import Image from 'next/image'
import "tailwindcss/tailwind.css"
import tw from "tailwind-styled-components"
import Map from '../../../components/Map'
import Link from 'next/Link'
import { io } from 'socket.io-client';
import {getUser} from '../../../APIFunctions/DbFunctions'
import  {useRouter} from 'next/router'

const socket = io("http://localhost:3001");

export default function Home({name}) {

  const router = useRouter()
  const id = router.query.id

  return (
    <Wrapper>
      <Map/>
      <ActionItems>
        <Header>
          <UberLogo src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"></UberLogo>
          <Link href={`/Driver/${id}/driverprofile`}> 
          <Profile>
            <Name>
              {name}
            </Name>
            <UserImage src="https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-outline-user-icon-png-image_1727916.jpg"/>
          </Profile>
          </Link>
        </Header>
{/* This infomation will be retrieved from database */}
        <InforSection>
          <Info>
              <Label>2,103</Label>
                <p>Trips</p>
        </Info>
        <Info>
              <Label>4.8</Label>
               <p>Rating</p> 
                </Info>
        </InforSection>
      </ActionItems>
    </Wrapper>
  )
}
export async function getServerSideProps({params})
{
     const user = await getUser(params.id);
    const name = params.id
     return{
         props:{
            name,
         },
     };

    }

const Label = tw.div`
    text-2xl font-semibold
    `

const Wrapper = tw.div`
  flex flex-col h-screen
`
const Info = tw.div`
    flex bg-gray-200 flex-1 m-1 h-32 items-center flex-col justify-center rounded-lg transform
  hover:scale-105 transition text-xl
  `

const ActionItems = tw.div`
  flex-1 p-4
`

const Header = tw.div`
  flex justify-between
`

const UberLogo = tw.img`
  h-28
`
const Profile = tw.div`
  flex items-center
`

const Name = tw.p`
  mr-4 w-20 text-sm
`

const UserImage = tw.img`
  h-12 w-12 rounded-full border border-gray-200 p-px
`
const InforSection = tw.div`
  flex cursor-pointer
`

const ActionButton = tw.div`
  

`

const ActionImg = tw.img`
  h-3/5
`

const InputButton = tw.div`
  h-20 bg-gray-200 text-2xl p-4 flex items-center mt-8
`