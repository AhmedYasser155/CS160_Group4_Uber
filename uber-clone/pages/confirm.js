import React from 'react'
import tw from "tailwind-styled-components"
import Map from "./components/Map"
import { useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import RideSelector from './components/RideSelector'
import { BackButton } from './components/BackButton'

const Confirm = () => {

    const router = useRouter()
    const {pickup, dropoff} = router.query

    const [ pickupCoordinates, setPickupCoordinates] = useState([0,0])
    const [ dropoffCoordinates, setDropoffCoordinates] = useState([0,0])

    const getPickupCoordinates = (pickup) => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` + 
            new URLSearchParams({
                access_token: "pk.eyJ1IjoiaGFuZy1obyIsImEiOiJjbDA2M3F6bm4xcW05M2RvZHhpeDFsZTVvIn0.Ot8ZrqGcvLYWRLzyXtkUdA",
                limit: 1
            })
        )
        .then(res => res.json())
        .then(data => {
            setPickupCoordinates(data.features[0].center)
        })
    }
    
    const getDropoffCoodinates = (dropoff) => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` + 
            new URLSearchParams({
                access_token: "pk.eyJ1IjoiaGFuZy1obyIsImEiOiJjbDA2M3F6bm4xcW05M2RvZHhpeDFsZTVvIn0.Ot8ZrqGcvLYWRLzyXtkUdA",
                limit: 1
            })
        )
        .then(res => res.json())
        .then(data => {
            setDropoffCoordinates(data.features[0].center)
        })
    }

    useEffect( () => {
        getPickupCoordinates(pickup)
        getDropoffCoodinates(dropoff)
    }, [pickup, dropoff])

    return (
        <Wrapper>
            <BackButton/>
            <Map
                pickupCoordinates = {pickupCoordinates}
                dropoffCoordinates = {dropoffCoordinates}
            />

            <RideContainer>
                <RideSelector
                    pickupCoordinates = {pickupCoordinates}
                    dropoffCoordinates = {dropoffCoordinates}
                />

                <ConfirmButtonContainer>
                    <ConfirmButton>Confirm</ConfirmButton>
                </ConfirmButtonContainer>

            </RideContainer>
        </Wrapper>
    )
}

export default Confirm


const Wrapper = tw.div`
    flex h-screen flex-col
`

const RideContainer = tw.div`
    flex-1 flex-col flex h-1/5
`

const ConfirmButtonContainer = tw.div`
    border-t-2
`

const ConfirmButton = tw.div`
    bg-black text-white my-4 mx-4 py-4 text-center text-xl
`