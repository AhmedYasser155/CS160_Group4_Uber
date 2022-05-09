import {React, useState} from 'react'
import tw from "tailwind-styled-components"
import Link from 'next/Link'
import {useRouter} from 'next/router'
import { BackButton } from '../../../components/BackButton'
import {getUser, getRide} from '../../../APIFunctions/DbFunctions'

export default function Ride({riderData, driverData, userRideid}){
    const router = useRouter()
    const {id} = router.query
    console.log(userRideid)
    console.log("Hello", riderData, driverData)

    const driver = {
        name: "",
        car: "",
        licensePlate: ""
    }
    if (driverData) {
        driver.name = driverData.firstName + " " + driverData.lastName;
        driver.car = driverData.car.carMake + " " + driverData.car.carModel;
        driver.licensePlate = driverData.car.licensePlate
    }
    const balance = riderData.accountBalance

    async function performPayment() {
        const ride = await getRide(rideID);
        if(user) {
            const res = await updateUser(id, {"balance":balance - ride.responseData.cost});
            if(!res.error)
                console.log(res.responseData);
            else
                console.log("CANNOT UPDATE USER");
        }
        else
            console.log("USER DOES NOT EXIST!");
    }

    return (
        
        <Wrapper>
           <BackButton  prevPage={`/Rider/${id}/confirm`}/>
           <ConfirmContainer>

           <Chat>
                <Text>Your ride has been confirmed! Your driver will arrive shortly.</Text>
                <Text>Your remaining balance is ${balance}</Text>
                {driverData ? 
                (<>
                <Text>Your Driver: {driver.name}</Text>
                <Text>Please look out for a {driver.car}</Text>
                <Text>License Plate: {driver.licensePlate}</Text>
                </>) 
                : 
                (<></>)}
                
            </Chat>
            <Link href={`/Rider/${id}`}>
            <Home> Home </Home>
            </Link>

           </ConfirmContainer>
           
            

        </Wrapper>
    )
}

export async function getServerSideProps({query}) {
    // hardcode ride id for testing
    // rideID is not in params, need to get rideID to make line 59 work
    const userRideid = query.rideID
    const ride = await getRide(userRideid);
    //const ride = await getRide('62715ac260aca5cd2af00041');
    const rideInfo = ride.responseData;

    //  const user = await getUser(id);
     const driver = await getUser(rideInfo.driver);
     const driverData = driver.responseData;

     const rider = await getUser(rideInfo.customer);
     const riderData = rider.responseData;
     return{
        props:{
           riderData,
           driverData,
           userRideid
        },
    };
}

const Wrapper = tw.div`
    flex flex-col h-screen bg-gray-200 p-4
`
const Chat = tw.div`
    text-center
`

const Text = tw.p`
    font-bold text-2xl mx-4 my-4
`

const Cancel = tw.button`
    bg-gray-400 text-white text-center mt-2 mx-4 p-4 text-2xl cursor-pointer
`
const Home = tw.button`
    bg-black text-white text-center mt-2 mx-4 p-4 text-2xl cursor-pointer
`
const ConfirmContainer = tw.div`
    bg-white px-4 mb-2 py-10 flex flex-col h-fit rounded-3xl mt-10 
`
