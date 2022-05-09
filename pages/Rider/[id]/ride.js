import React from 'react'
import tw from "tailwind-styled-components"
import Link from 'next/Link'
import {useRouter} from 'next/router'
import { BackButton } from '../../../components/BackButton'
import {getUser, getRide} from '../../../APIFunctions/DbFunctions'

const Ride = ({userData}) => {
    const router = useRouter()
    const {id, rideID} = router.query

    const first = userData.firstName
    const last = userData.lastName
    const make = userData.car.carMake
    const model = userData.car.carModel
    const licensePlate = userData.car.licensePlate
    const balance = userData.accountBalance

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
                {userData ? 
                (<>
                <Text>Driver: {first + " " + last}</Text>
                <Text>Please look for {make + " " + model}</Text>
                <Text>License Plate: {licensePlate}</Text>
                </>) 
                : 
                (<></>)}
                
                <Text>Your remaining balance is ${balance}</Text>
            </Chat>
            <Link href={`/Rider/${id}`}>
            <Home> Home </Home>
            </Link>

           </ConfirmContainer>
           
            

        </Wrapper>
    )
}
// console.log(rideID)
export async function getServerSideProps() {
    // const ride = await getRide(rideID);
    const ride = await getRide('62715ac260aca5cd2af00041');
    const rideInfo = ride.responseData;

    //  const user = await getUser(id);
     const user = await getUser(rideInfo.driver);
     const userData = user.responseData
     return{
         props:{
            userData,
         },
     };
    }
export default Ride;

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
