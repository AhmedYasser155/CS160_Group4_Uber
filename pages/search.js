import React from 'react'
import { useState, useEffect } from 'react'
import tw from "tailwind-styled-components"
import Link from 'next/Link'
import { BackButton } from '../components/BackButton'
import { InputLocation } from '../components/InputLocation'
import { FaTimes } from 'react-icons/fa'
import APIinfo from "../config/config.json"



const Search = () => {

    const [currentCoor, setCurrentCoor] = useState()
    const [pickup, setPickup] = useState()
    const [dropoff, setDropoff1] = useState()
    const [dropoff2, setDropoff2] = useState()
    const [dropoff3, setDropoff3] = useState()
    const [dropoff4, setDropoff4] = useState()
    const [dropoff5, setDropoff5] = useState()

    const [dropoffArr, setDropoffArr] = useState([]) // the first element is the pickup location and follwing are dropoff locations
    //the following parameters are for showing the dropff boxes
    const [startView, setStartView] = useState(false);
    const [dropoffs, setDropOffs] = useState({ p1: true, p2: false, p3: false, p4: false, p5: false })
    const p1 = dropoffs.p1;
    const p2 = dropoffs.p2;
    const p3 = dropoffs.p3;
    const p4 = dropoffs.p4;
    const p5 = dropoffs.p5;

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setCurrentCoor([position.coords.longitude, position.coords.latitude]);
        })
     
        //TODO: pass the coordinates to the next page 
        // fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${currentCoor}.json?` +
        //         new URLSearchParams({
        //             access_token: APIinfo.MAPBOX_ACCESS_TOKEN,
        //             limit: 1
        //         })
        //     ) 
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data);
        //         setPickup(data.features[0].place_name);
        //     }
        //     )

    }, [])



    const addStop = (e) => {
        setStartView(true);
        setDropOffs(prevDropoffs => {
            return {
                ...prevDropoffs, p1: false, p2: true

            }
        })
    }
    const deleteStop = (e) => {
        switch (e.target.id) {
            case 'delete2':
                setDropOffs(prevDropoffs => {
                    return {
                        //TODO: try to handle removing p2 before the other boxes
                        ...prevDropoffs, p2: false, p1: true
                    }
                })
                setDropoff2('');
                break;
            case 'delete3':
                setDropOffs(prevDropoffs => {
                    return {
                        ...prevDropoffs, p3: false
                    }
                })
                setDropoff3('');
                break;
            case 'delete4':
                setDropOffs(prevDropoffs => {
                    return {
                        ...prevDropoffs, p4: false
                    }
                })
                setDropoff4('');
                break;
            case 'delete5':
                setDropOffs(prevDropoffs => {
                    return {
                        ...prevDropoffs, p5: false
                    }
                })
                setDropoff5('');
                break;
        }

    }
    function addLocationBox(key, id) {

        if (key === 'Enter') {

            if (p1 === true || p5 === true) {
                console.log("p1 or p5 are true");
                //confirm button
            }
            else {
                switch (id) {
                    case 'stopBox2':
                        setDropOffs(prevDropoffs => {
                            return {
                                ...prevDropoffs, p3: true
                            }
                        })
                        break;
                    case 'stopBox3':
                        setDropOffs(prevDropoffs => {
                            return {
                                ...prevDropoffs, p4: true
                            }
                        })
                        break;
                    case 'stopBox4':
                        setDropOffs(prevDropoffs => {
                            return {
                                ...prevDropoffs, p5: true
                            }
                        })
                        break;

                }
            }

        }
    }

    function updateLocationArr() {
        console.log("test");
        console.log(pickup);
        pickup ? dropoffArr.push(pickup) : null;
        dropoff ? dropoffArr.push(dropoff) : null;
        dropoff2 ? dropoffArr.push(dropoff2) : null;
        dropoff3 ? dropoffArr.push(dropoff3) : null;
        dropoff4 ? dropoffArr.push(dropoff4) : null;
        dropoff5 ? dropoffArr.push(dropoff5) : null;
        console.log(dropoffArr);
        //TODO: add the link here
    }

    return (
        <Wrapper>
            {/* FIXME: back button should take link as props */}
            <BackButton prevPage={"/"} />

            <InputContainer>
                <FromToIcon>
                    <Circle src="https://img.icons8.com/ios-filled/50/9CA3AF/filled-circle.png" />
                    <Line src="https://img.icons8.com/ios/50/9CA3AF/vertical-line.png" />
                    <Square src="https://img.icons8.com/windows/50/000000/square-full.png" />
                    {/*The part that would be toggled */}
                    {p2 ? (<Line id='line1' src="https://img.icons8.com/ios/50/9CA3AF/vertical-line.png" />) : null}
                    {p2 ? (<Square id='square1' src="https://img.icons8.com/windows/50/000000/square-full.png" />) : null}
                    {p3 ? (<Line id='line2' src="https://img.icons8.com/ios/50/9CA3AF/vertical-line.png" />) : null}
                    {p3 ? (<Square id='square2' src="https://img.icons8.com/windows/50/000000/square-full.png" />) : null}
                    {p4 ? (<Line id='line3' src="https://img.icons8.com/ios/50/9CA3AF/vertical-line.png" />) : null}
                    {p4 ? (<Square id='square3' src="https://img.icons8.com/windows/50/000000/square-full.png" />) : null}
                    {p5 ? (<Line id='line4' src="https://img.icons8.com/ios/50/9CA3AF/vertical-line.png" />) : null}
                    {p5 ? (<Square id='square4' src="https://img.icons8.com/windows/50/000000/square-full.png" />) : null}

                </FromToIcon>

                <InputBoxes>

                    <InputLocation id='pickupBox' text='Current Location'  update={(e) => { setPickup(e.target.value) }} />
                    <InputLocation id='stopBox1' oneEnter={(e) => { addLocationBox(e.key, e.target.id) }} update={(e) => { setDropoff1(e.target.value) }} />
                    {/* The locaitons that would be toggled */}

                    {p2 ? (<InputLocation id='stopBox2' oneEnter={(e) => { addLocationBox(e.key, e.target.id) }} update={(e) => { setDropoff2(e.target.value) }} />) : null}
                    {p3 ? (<InputLocation id='stopBox3' oneEnter={(e) => { addLocationBox(e.key, e.target.id) }} update={(e) => { setDropoff3(e.target.value) }} />) : null}
                    {p4 ? (<InputLocation id='stopBox4' oneEnter={(e) => { addLocationBox(e.key, e.target.id) }} update={(e) => { setDropoff4(e.target.value) }} />) : null}
                    {p5 ? (<InputLocation id='stopBox5' oneEnter={(e) => { addLocationBox(e.key, e.target.id) }} update={(e) => { setDropoff5(e.target.value) }} />) : null}

                </InputBoxes>

                <PlusIcons>
                    {p1 ? (<PlusIcon src="https://img.icons8.com/windows/50/000000/plus-math.png" onClick={addStop} />) : null}
                    {p2 ? (<DeleteIcon1 id="delete2" src="https://img.icons8.com/windows/50/000000/plus-math.png" onClick={deleteStop} />) : null}
                    {p3 ? (<DeleteIcon id="delete3" src="https://img.icons8.com/windows/50/000000/plus-math.png" onClick={deleteStop} />) : null}
                    {p4 ? (<DeleteIcon id="delete4" src="https://img.icons8.com/windows/50/000000/plus-math.png" onClick={deleteStop} />) : null}
                    {p5 ? (<DeleteIcon id="delete5" src="https://img.icons8.com/windows/50/000000/plus-math.png" onClick={deleteStop} />) : null}

                </PlusIcons>

            </InputContainer>

            <SavePlace>
                <StarIcon src="https://img.icons8.com/ios-filled/50/ffffff/star--v1.png" />
                Saved Places
            </SavePlace>

            {(pickup && (dropoff || dropoff2 || dropoff3 || dropoff4 || dropoff5)) ?
                (<Link href={{
                    pathname: "/confirm",
                    query: {
                        dropoff: dropoffArr
                    }
                }}>
                    <ConfirmContainer onClick={() => updateLocationArr()}>
                        Confirm Location
                    </ConfirmContainer>
                </Link>) : <ConfirmContainer>
                    Confirm Location
                </ConfirmContainer>
            }

        </Wrapper>
    )
}

export default Search

const Wrapper = tw.div`
    bg-gray-200 h-screen
`

const FromToIcon = tw.div`
    w-10 flex flex-col mr-1 items-center 
`

const Circle = tw.img`
    h-2.5
`
const Line = tw.img`
    h-9
`

const Square = tw.img`
    h-3
`
const InputContainer = tw.div`
    bg-white flex items-center px-4 mb-2 
`
const InputBoxes = tw.div`
    flex flex-col flex-1 space-y-2 mb-2
`

const PlusIcon = tw.img`
    w-8 h-8 bg-gray-200 rounded-full  cursor-pointer my-2 
`
const PlusIcons = tw.div`
    bg-white flex items-center px-4  flex-col
`;
const DeleteIcon = tw.img`
w-8 h-8 bg-white-200  rounded-full cursor-pointer my-2 rounded-full 
rotate-45
`
const DeleteIcon1 = tw.img`
w-8 h-8 bg-white-200  rounded-full cursor-pointer my-2 rounded-full 
rotate-45 mt-24
`

const SavePlace = tw.div`
    flex items-center bg-white px-4 py-2
`

const StarIcon = tw.img`
    bg-gray-400 w-10 h-10 p-2 rounded-full mr-2
`

const ConfirmContainer = tw.div`
    bg-black text-white text-center mt-2 mx-4 p-4 text-2xl cursor-pointer
`
