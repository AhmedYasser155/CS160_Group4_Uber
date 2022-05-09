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
import {getScheduled, getUser} from '../../../APIFunctions/DbFunctions'


// home takes the pre rendered user docuemnt as a parameter
export default function Home({userData, scheduledData}) {


  const router = useRouter()
  const dispatch = useDispatch();
  const id = router.query.id
  //prints the whole document


  //if you want to use a particular field in the front end you need to create a new var/const and choose a field   --- LIKE BELOW 
  const name = userData.firstName
  //const name ='test'
  
useEffect(() => {
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
          <Link href={`/Rider/${id}/riderprofile`}> 
          <Profile>
            <Name>{name}</Name>
            <UserImage src="https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-outline-user-icon-png-image_1727916.jpg"/>
          </Profile>
          </Link>
        </Header>

        <ActionButtons>
        <Link href={`/Rider/${id}/search`}>
            <ActionButton>
              <ActionImg src="https://i.ibb.co/cyvcpfF/uberx.png"/>
                Ride
            </ActionButton>
          </Link>
          <Link href={`/Rider/${id}/scheduling`}>
            <ActionButton>
              <ActionImg src="https://i.ibb.co/5RjchBg/uberschedule.png"/>
                Schedule
            </ActionButton>
          </Link>
          
        </ActionButtons>
        <Link href={`/Rider/${id}/search`}>
        <InputButton>
          Where to?
        </InputButton>
        </Link>

        
        <UpcomingContainer>
          <Upcoming>
            Upcoming Rides
          </Upcoming>
          <RideCard>
            <Container>
              <DateTime>
                Tues, December 20 at 10:15 AM PST
              </DateTime>
              <Pricing>
                $25.34
              </Pricing>
            </Container>
            <LocationContainer>
              <FromToIcon>
                <Circle src="https://img.icons8.com/ios-filled/50/9CA3AF/filled-circle.png" />
                <Line src="https://img.icons8.com/ios/50/9CA3AF/vertical-line.png" />
                <Square src="https://img.icons8.com/windows/50/000000/square-full.png" />
              </FromToIcon>
              <LocationList>
                <Location>
                  SJSU
                </Location>
                <Location>
                  SJC
                </Location>
              </LocationList>
            </LocationContainer>
          </RideCard>
          <RideCard>
            <Container>
              <DateTime>
                Tues, December 20 at 2:30 PM PST
              </DateTime>
              <Pricing>
                $52.97
              </Pricing>
            </Container>
            <LocationContainer>
              <FromToIcon>
                <Circle src="https://img.icons8.com/ios-filled/50/9CA3AF/filled-circle.png" />
                <Line src="https://img.icons8.com/ios/50/9CA3AF/vertical-line.png" />
                <Square src="https://img.icons8.com/windows/50/000000/square-full.png" />
              </FromToIcon>
              <LocationList>
                <Location>
                  LAX
                </Location>
                <Location>
                  UCLA
                </Location>
              </LocationList>
            </LocationContainer>
          </RideCard>
        </UpcomingContainer>
      </ActionItems>
    </Wrapper>
  )
}


export async function getServerSideProps({params})
{
     const user = await getUser(params.id);
     const schedule = await getScheduled(params.id);

  //returns the status object 
  //user data extracts the responseDate field from the status object
     const userData= user.responseData
     const scheduledData = schedule.responseData

     console.log(scheduledData)
     return{
         props:{
           //pre render the whole document and send it to the frontend
            userData, scheduledData
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
const UpcomingContainer = tw.div`
bg-gray-200 m-1 items-start px-3 rounded p-3
`
const Upcoming = tw.div`
text-lg pb-4 pl-4 mt-2 font-bold
`
const RideCard = tw.div`
bg-white items-start divide-y divide-gray-600 rounded
`
const LocationContainer = tw.div`
flex items-center mb-5
`
const Container = tw.div`
items-center
`
const FromToIcon = tw.div`
w-10 flex flex-col mr-1 items-center 
`
const Circle = tw.img`
h-2.5
`
const Line = tw.img`
h-9
`
const Square = tw.img`
h-3
`
const LocationList = tw.div`
flex flex-col flex-1 space-y-2 my-3
`
const Location = tw.div`
h-10 p-2 flex-col
`
const DateTime = tw.div`
flex flex-col pt-3 pl-3
`
const Pricing = tw.div`
flex flex-col pl-3 pt-1 mb-3 text-gray-600 text-sm
`