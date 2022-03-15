import React from 'react'
import { useEffect, useState } from 'react'
import tw from "tailwind-styled-components"
import mapboxgl from '!mapbox-gl'
import Geocoder from "react-map-gl-geocoder";

mapboxgl.accessToken = 'pk.eyJ1IjoiaGFuZy1obyIsImEiOiJjbDA2M3F6bm4xcW05M2RvZHhpeDFsZTVvIn0.Ot8ZrqGcvLYWRLzyXtkUdA';

export const InputLocation = (props) => {

    const geocoder = new Geocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph',
        center: [-99.29011, 39.39172],
        zoom: 3,
    })

    /// geocoder.onAdd is not a function ??????/
    //document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
    return (
        <container>
            {/* <Wrapper id='map'> </Wrapper> */}
            <Input id = 'geocoder' placeholder={props.text} />
        </container>


    )
}
export default InputLocation;

const Wrapper = tw.div`
h-10 w-96 bg-gray-200 my-2 rounded-2 p-2 outline-none border-none flex-1
`
const Input = tw.input`
h-10 bg-gray-200 my-2 rounded-2 p-2 outline-none border-none
`


