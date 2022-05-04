import React from 'react'
import { useEffect, useState } from 'react'
import tw from "tailwind-styled-components"
import Link from 'next/Link'
import { BackButton } from '../components/BackButton'
import mapboxgl from '!mapbox-gl'
import Geocoder from "react-map-gl-geocoder";

mapboxgl.accessToken = "pk.eyJ1IjoiaGFuZy1obyIsImEiOiJjbDA2M3F6bm4xcW05M2RvZHhpeDFsZTVvIn0.Ot8ZrqGcvLYWRLzyXtkUdA";

const picklocation = ({ locationsList }) => {
    const [location, setLocation] = useState()


    useEffect(() => {
        const map = new mapboxgl.Map({
            container: "map",
            style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph',
            center: [-99.29011, 39.39172],
            zoom: 9,
        })
        const geocoder = new Geocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        })
        //console.log(geocoder);
        map.addControl(geocoder);
        
       // geocoder.onAdd(map);
        const nav = new mapboxgl.NavigationControl()
        map.addControl(nav)
    }, [])
    return (
        <Wrapper >

            <InputContainer>
                <BackButton prevPage={"/search"} />
                <Input
                    placeholder="Pick location"
                    value={location}
                    onChange={(e) => { setLocation(e.target.value) }}
                />

            </InputContainer>
            <InputContainer2 id="map"></InputContainer2>

        </Wrapper>
    )

}
export default picklocation;

const Wrapper = tw.div`
    flex flex-col h-screen bg-white-200 p-4
`
const InputContainer = tw.div`
    bg-white  items-center px-4 mb-2
`
const InputContainer2 = tw.div`
    bg-white flex-auto h-4/5
`
const Input = tw.input`
    h-10 bg-gray-200 my-2 rounded-2 p-2 outline-none border-none w-full flex flex-row justify-between
`

