import {React, useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { carList } from "../data/carList";

const RideSelector = ({ locationCoordinates }) => {
  const [rideDuration, setRideDuration] = useState(0);

  const showServices = () => {
    let locationURL = "";

    locationCoordinates.map((location) => {
        
      console.log("Rider.js ",location)
      locationURL = locationURL + location[0] + "," + location[1] + ";";
    });
    locationURL = locationURL.slice(0, -1);
    console.log("RideSelector URL ", locationURL)

    fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${locationURL}?access_token=pk.eyJ1IjoiaGFuZy1obyIsImEiOiJjbDA2M3F6bm4xcW05M2RvZHhpeDFsZTVvIn0.Ot8ZrqGcvLYWRLzyXtkUdA`
    )
      .then((res) => res.json())
      .then((data) => {
        setRideDuration(data.routes[0].duration / 100);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    console.log("riderselector.js ",locationCoordinates)
    showServices()
  }, locationCoordinates);

  return (
    <Wrapper>
      <Title>Choose a ride, or swipe up for more</Title>
      <CarList>
        {carList.map((car, index) => (
          <Car key={index}>
            <CarImg src={car.imgURL} />
            <CarDetails>
              <Service>{car.service}</Service>
              <Time>5 mins away</Time>
            </CarDetails>
            <Price>{"$" + (rideDuration * car.multiplier).toFixed(2)}</Price>
          </Car>
        ))}
      </CarList>
    </Wrapper>
  );
};

export default RideSelector;

const CarDetails = tw.div`
    flex-1
`;

const Service = tw.div`
    font-medium
`;

const Time = tw.div`
    text-xs text-blue-500
`;

const Price = tw.div`
    text-sm
`;

const Wrapper = tw.div`
    flex-1 overflow-y-scroll flex flex-col
`;

const Title = tw.div`
    text-gray-500 text-center text-xs py-2 border-b
`;

const CarList = tw.div`
    
`;

const Car = tw.div`
    flex p-4 items-center
`;

const CarImg = tw.img`
    h-14 mr-4
`;
