import React from 'react'
import { useEffect, useState } from 'react'
import tw from "tailwind-styled-components"
import { BackButton } from '../../../components/BackButton'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useRouter } from 'next/router'
import  Router  from 'next/router'
import { useDispatch } from 'react-redux'
import { ADD_Dropoff1,ADD_PICKUP, ADD_Dropoff2, ADD_Dropoff3, ADD_Dropoff4, ADD_Dropoff5} from '../../../store/actions'
import {Footer} from '../../../components/Footer'

mapboxgl.accessToken = "pk.eyJ1IjoiaGFuZy1obyIsImEiOiJjbDA2M3F6bm4xcW05M2RvZHhpeDFsZTVvIn0.Ot8ZrqGcvLYWRLzyXtkUdA";

const Picklocation = () => {
    const router = useRouter()
    const id = router.query.id
    const dispatch = useDispatch();
    const [location, setLocation] = useState()
    const box = router.query.box
    const page = router.query.page
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: "map",
            style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph',
            center: [-99.29011, 39.39172],
            zoom: 9,
        })
        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            placeholder: 'Search for a location',
            flyTo: false,
            mapboxgl: mapboxgl,
            getItemValue: (e) => {
                seletctLocation(e)
            }

        })
        document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
        const nav = new mapboxgl.NavigationControl()
        map.addControl(nav)

    }, [])
    const seletctLocation = (e) => {
        //console.log('placeName:',e.place_name)
       //console.log(box)
        switch (box) {
            case 'pickupBox':
                dispatch(ADD_PICKUP(e.place_name))
                break;
            case 'stopBox1':
                dispatch(ADD_Dropoff1(e.place_name))
                break;
            case 'stopBox2':
                dispatch(ADD_Dropoff2(e.place_name))
                break;
            case 'stopBox3':
                dispatch(ADD_Dropoff3(e.place_name))
                break;
            case 'stopBox4':
                dispatch(ADD_Dropoff4(e.place_name))
                break;
            case 'stopBox5':
                dispatch(ADD_Dropoff5(e.place_name))
                break;
            default:
                break;
        }
        Router.push({
            pathname: `/Rider/${id}/${page}`,
        })
    }
    return (
        <Wrapper >
            <InputContainer>
                <BackButton prevPage={`/Rider/${id}/${page}`} />
                <div id="geocoder" className=' h-1/2 w-screen ' ></div>
            </InputContainer>
            <InputContainer2 id="map"></InputContainer2>
            <Footer/>
        </Wrapper>
    )

}
export default Picklocation;

const Wrapper = tw.div`
    flex flex-col h-screen bg-white-200 p-4
`
const InputContainer = tw.div`
    bg-white  items-center px-4 mb-2 h-1/6
`
const InputContainer2 = tw.div`
    bg-white flex-auto h-screen
`



