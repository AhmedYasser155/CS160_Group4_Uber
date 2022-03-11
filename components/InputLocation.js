import React from 'react'
import { useEffect, useState } from 'react'
import tw from "tailwind-styled-components"
import mapboxgl from '!mapbox-gl'
import {FaTimes} from 'react-icons/fa'
//import Geocoder from "react-map-gl-geocoder";

mapboxgl.accessToken = 'pk.eyJ1IjoiaGFuZy1obyIsImEiOiJjbDA2M3F6bm4xcW05M2RvZHhpeDFsZTVvIn0.Ot8ZrqGcvLYWRLzyXtkUdA';

export const InputLocation = ({oneEnter,text , id}) => {

    // const geocoder = new Geocoder({
    //     accessToken: mapboxgl.accessToken,
    //     mapboxgl: mapboxgl
    // })
    // const map = new mapboxgl.Map({
    //     container: 'map',
    //     style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph',
    //     center: [-99.29011, 39.39172],
    //     zoom: 3,
    // })

    /// geocoder.onAdd is not a function ??????/
    //document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
    return (
     <Input id={id} placeholder={text} onKeyPress = {oneEnter} />    
     
    )
}
export default InputLocation;

InputLocation.defaultProps ={
    text : 'Add a stop'
}

const Input = tw.input`
h-10 bg-gray-200  rounded-2 p-2 outline-none border-none felx-col 
`


