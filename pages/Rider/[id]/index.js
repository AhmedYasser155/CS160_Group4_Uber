import Head from 'next/head'
import Image from 'next/image'
import "tailwindcss/tailwind.css"
import tw from "tailwind-styled-components"
import Map from '../../../components/Map'
import Link from 'next/Link'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ADD_CURR_LOCATION } from '../../../store/actions'
import  {useRouter} from 'next/router'
import {getUser} from '../../../APIFunctions/DbFunctions'

export default function Home({name}) {


  const router = useRouter()
  const dispatch = useDispatch();
  const id = router.query.id
  console.log(name)

  async function test()
  {
    const user = await getUser(id);
    console.log(user)

  }


useEffect(() => {
  test()
  navigator.geolocation.getCurrentPosition((position) => {
    dispatch((ADD_CURR_LOCATION([position.coords.longitude, position.coords.latitude])));

})
}, [])
  return (
    <Wrapper>
      <Map/>
      <ActionItems>
        <Header>
          <UberLogo src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"></UberLogo>
          <Profile>
            <Name>{name}</Name>
            <UserImage src="https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-outline-user-icon-png-image_1727916.jpg"/>
          </Profile>
        </Header>

        <ActionButtons>
        <Link href={`/Rider/${id}/search`}>
            <ActionButton>
              <ActionImg src="https://i.ibb.co/cyvcpfF/uberx.png"/>
                Ride
            </ActionButton>
          </Link>
          <Link href="/scheduling">
            <ActionButton>
              <ActionImg src="https://i.ibb.co/5RjchBg/uberschedule.png"/>
                Schedule
            </ActionButton>
          </Link>
          
        </ActionButtons>
        <Link href="/search">
        <InputButton>
          Where to?
        </InputButton>
        </Link>
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

const Wrapper = tw.div`
  flex flex-col h-screen
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

const Name = tw.div`
  mr-4 w-20 text-sm
`

const UserImage = tw.img`
  h-12 w-12 rounded-full border border-gray-200 p-px
`
const ActionButtons = tw.div`
  flex cursor-pointer
`

const ActionButton = tw.div`
  flex bg-gray-200 flex-1 m-1 h-32 items-center flex-col justify-center rounded-lg transform
  hover:scale-105 transition text-xl

`

const ActionImg = tw.img`
  h-3/5
`

const InputButton = tw.div`
  h-20 bg-gray-200 text-2xl p-4 flex items-center mt-8
`