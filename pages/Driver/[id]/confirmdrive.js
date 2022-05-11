import React from 'react'
import tw from "tailwind-styled-components"
import Link from 'next/Link'
import {useRouter} from 'next/router'
import { BackButton } from '../../../components/BackButton'
import {Footer} from '../../../components/Footer'
import {getUser} from '../../../APIFunctions/DbFunctions';

const Ride = ({driverData}) => {
    const router = useRouter()
    const id = router.query.id
    return (
        
        <Wrapper>
           <BackButton  prevPage={`/Driver/${id}`}/>
           <ConfirmContainer>

           <Chat>
                <Text>Thank you for accepting the ride! Please head to your riders pick up location at {driverData.driverLocation}.</Text>
            </Chat>
            <Link href={`/Driver/${id}`}>
            <Home> Home </Home>
            </Link>

           </ConfirmContainer>
           
            <Footer/>

        </Wrapper>
    )
}

export async function getServerSideProps({params})
{
    const res = await getUser(params.id);
    const driverData = res.responseData
    console.log(driverData);
    return{
        props:{
            driverData,
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
