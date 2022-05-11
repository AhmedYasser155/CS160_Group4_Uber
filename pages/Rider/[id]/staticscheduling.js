import Head from 'next/head'
import Image from 'next/image'
import "tailwindcss/tailwind.css"
import tw from "tailwind-styled-components"
import Map from '../../../components/Map'
import Link from 'next/Link'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ADD_CURR_LOCATION } from '../../../store/actions'
import { useRouter } from 'next/router'
import { getUser } from '../../../APIFunctions/DbFunctions'
import { Footer } from '../../../components/Footer'


// home takes the pre rendered user docuemnt as a parameter
export default function Home({ userData }) {


    const router = useRouter()
    const dispatch = useDispatch();
    const id = router.query.id
    //prints the whole document
    console.log(userData)
    //if you want to use a particular field in the front end you need to create a new var/const and choose a field   --- LIKE BELOW 
    const first = userData.firstName
    const last = userData.lastName
    //const name ='test'

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            dispatch((ADD_CURR_LOCATION([position.coords.longitude, position.coords.latitude])));

        })
    }, [])
    return (
        <Wrapper>
            <MapWrapper>
            <Map />
            <ActionItems>
                <Header>
                    <UberLogo src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"></UberLogo>
                    <Link href={`/Rider/${id}/riderprofile`}>
                        <Profile>
                            <Name>{first} {last}</Name>
                            <UserImage src="https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-outline-user-icon-png-image_1727916.jpg" />
                        </Profile>
                    </Link>
                </Header>

                <ActionButtons>
                    <Link href={`/Rider/${id}/search`}>
                        <ActionButton>
                            <ActionImg src="https://i.ibb.co/cyvcpfF/uberx.png" />
                            Ride
                        </ActionButton>
                    </Link>
                    <Link href={`/Rider/${id}/scheduling`}>
                        <ActionButton>
                            <ActionImg src="https://i.ibb.co/5RjchBg/uberschedule.png" />
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
                                Weds, June 1 at 9:00 AM PST
                            </DateTime>
                            <Pricing>
                                $10.30
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
                                    San José State University
                                </Location>
                                <Location>
                                    Norman Y. Mineta San Jose International Airport
                                </Location>
                            </LocationList>
                        </LocationContainer>
                        <Link href={`/Rider/${id}`}>
                            <CancelRide>
                                Cancel Ride
                            </CancelRide>
                        </Link>
                    </RideCard>
                </UpcomingContainer>
            </ActionItems>
            <Footer />
            </MapWrapper>
        </Wrapper>
    )
}


export async function getServerSideProps({ params }) {
    const user = await getUser(params.id);
    //returns the status object 
    //user data extracts the responseDate field from the status object
    const userData = user.responseData
    return {
        props: {
            //pre render the whole document and send it to the frontend
            userData,
        },
    };

}

const Wrapper = tw.div`
  flex flex-col h-screen
`
const MapWrapper = tw.div`
flex-1 flex-col
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
flex-col bg-gray-200 m-1 items-start px-3 rounded p-3
`
const Upcoming = tw.div`
text-lg pb-4 pl-4 mt-2 font-bold
`
const RideCard = tw.div`
flex-col bg-white divide-y divide-gray-600 rounded
`
const LocationContainer = tw.div`
flex items-center mb-3
`
const Container = tw.div`
items-center
`
const CancelRide = tw.div`
flex justify-center text-blue-700 font-medium p-3
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