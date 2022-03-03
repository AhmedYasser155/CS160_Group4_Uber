import React from 'react'
import tw from "tailwind-styled-components"
import { carList } from '../data/carList'
import { useState, useEffect } from 'react'

const RideSelector = ({pickupCoordinates, dropoffCoordinates}) => {
    const [rideDuration, setRideDuration] = useState(0)

    useEffect(() => {
        fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?access_token=pk.eyJ1IjoiaGFuZy1obyIsImEiOiJjbDA2M3F6bm4xcW05M2RvZHhpeDFsZTVvIn0.Ot8ZrqGcvLYWRLzyXtkUdA`)
        .then(res => res.json())
        .then(data => {
            setRideDuration(data.routes[0].duration/100)
        }).catch( (e) => console.log(e))
    }, [pickupCoordinates, dropoffCoordinates])

    return (
        <Wrapper>
            <Title>Choose a ride, or swipe up for more</Title>
            <CarList>
                {carList.map( (car, index) => (
                    <Car key={index}>
                        <CarImg src={car.imgURL}/>
                        <CarDetails>
                            <Service>{car.service}</Service>
                            <Time>5 mins away</Time>
                        </CarDetails>
                        <Price>{'$' + (rideDuration * car.multiplier).toFixed(2)}</Price>
                    </Car>
                ))}
                
            </CarList>
        </Wrapper>
    )
}

export default RideSelector

const CarDetails = tw.div`
    flex-1
`

const Service = tw.div`
    font-medium
`

const Time = tw.div`
    text-xs text-blue-500
`

const Price = tw.div`
    text-sm
`

const Wrapper = tw.div`
    flex-1 overflow-y-scroll flex flex-col
`

const Title = tw.div`
    text-gray-500 text-center text-xs py-2 border-b
`

const CarList = tw.div`
    
`

const Car = tw.div`
    flex p-4 items-center
`

const CarImg = tw.img`
    h-14 mr-4
`