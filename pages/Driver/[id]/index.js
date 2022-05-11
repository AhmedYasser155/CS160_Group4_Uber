import Head from 'next/head'
import Image from 'next/image'
import "tailwindcss/tailwind.css"
import tw from "tailwind-styled-components"
import Map from '../../../components/Map'
import Link from 'next/Link'
import { io } from 'socket.io-client';
import {getUser, updateUser} from '../../../APIFunctions/DbFunctions'
import  {useRouter} from 'next/router'
import {React, useState} from 'react';
import {Footer} from '../../../components/Footer'
import {Popup} from '../../../components/Popup.js';

const socket = io("http://localhost:3001");

export default function Home({userData}) {

  const router = useRouter()
  const id = router.query.id
  const first = userData.firstName
  const last = userData.lastName

  const [buttonPopup, setButtonPopup] = useState(false);
  const [riderData, setRiderData] = useState({});
  const [pickup, setPickup] = useState("");

  socket.emit('add-driver', {
    id:id,
    data:userData
  });

  socket.on('to-driver', (passed) => {
    console.log(passed.riderData);
    setRiderData(passed.riderData);
    console.log("pickup:" + passed.pickup)
    setPickup(passed.pickup);
    setButtonPopup(true);
  });

  async function confirm() {
    console.log("CONFIRM");
    setButtonPopup(false);
    const res = await updateUser(id, {"id":id,"driverLocation":pickup});
    socket.emit('driver-response', {driverId:id, riderId:riderData._id, confirm:true})
    router.push(`/Driver/${id}/confirmdrive`)
  }

  function decline() {
    console.log("DECINE");
    setRiderData({});
    setPickup("");
    socket.emit('driver-response', {driverId:id, riderId:riderData._id, confirm:false})
    setButtonPopup(false);
  }

  return (
    <Wrapper>
      <Map/>
      <ActionItems>
        <Header>
          <UberLogo src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"></UberLogo>
          <Link href={`/Driver/${id}/driverprofile`}> 
          <Profile>
            <Name>
              {first} {last}
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
        <Popup trigger={buttonPopup} confirm={confirm} decline={decline}>
          <Text>{riderData.firstName} {riderData.lastName} requests a ride from you to {pickup}!</Text>
        </Popup>
      </ActionItems>
      <Footer/>
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

const Text = tw.h3`

`