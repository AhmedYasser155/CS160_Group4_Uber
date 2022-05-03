import React from 'react'
import tw from "tailwind-styled-components"
import Map from "../../../components/Map"
import { useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import RideSelector from '../../../components/RideSelector'
import { BackButton } from '../../../components/BackButton'
import { MAPBOX_ACCESS_TOKEN } from "../../../config/config.json"
import { useSelector , useDispatch } from 'react-redux'

const Confirm = () => {
 
    const router = useRouter()
    const id = router.query.id
    const locationsArr = useSelector(state=> state.locationArr); //to access the locations to be printed on the map

    const [locationCoor, setLocationCoor] = useState([])
    const [index, setIndex] = useState(0);

    useEffect( () => {
        if (index < locationsArr.length) {
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${locationsArr[index]}.json?` + 
                new URLSearchParams({
                    access_token: MAPBOX_ACCESS_TOKEN,
                    limit: 1
                })
            )
            .then(res => res.json())
            .then(data => {
                setLocationCoor([...locationCoor, data.features[0].center])
            }).catch((e)=>console.log(e))
            setIndex(index+1);
        }
    }, [locationCoor])

    if (locationCoor.length < locationsArr.length) {
        return null
    } 
    return (
        <Wrapper>
            <BackButton  prevPage={`/Rider/${id}/scheduling`}/>
            <Map
                locationCoordinates={locationCoor}
            />

            <RideContainer>
                <RideSelector
                    locationCoordinates={locationCoor}
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