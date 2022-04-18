import React from "react";
import tw from "tailwind-styled-components";
import { carList } from "../data/carList";
import { useState, useEffect } from "react";

const RideSelector = ({ locationCoordinates }) => {
  const [rideDuration, setRideDuration] = useState(0);
  const [rideDistance, setRideDistance] = useState(0);

  const showServices = () => {
    let locationURL = "";

    locationCoordinates.map((location) => {
      locationURL = locationURL + location[0] + "," + location[1] + ";";
    });
    locationURL = locationURL.slice(0, -1);

    fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${locationURL}?access_token=pk.eyJ1IjoiaGFuZy1obyIsImEiOiJjbDA2M3F6bm4xcW05M2RvZHhpeDFsZTVvIn0.Ot8ZrqGcvLYWRLzyXtkUdA`
    )
      .then((res) => res.json())
      .then((data) => {
        setRideDuration(data.routes[0].duration);
        setRideDistance(data.routes[0].distance);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    showServices()
  },);

  return (
    <Wrapper>
      <TripInfo>
        <InfoItem>Trip distance {(rideDistance/1750).toFixed(1)} Miles</InfoItem>
        <InfoItem>Trip duration {Math.round(rideDuration/70)} Mins</InfoItem>
      </TripInfo>
      <Title>Choose a ride</Title>
      <CarList>
        {carList.map((car, index) => (
          <Car key={index}>
            <CarImg src={car.imgURL} />
            <CarDetails>
              <Service>{car.service}</Service>
              <InfoItem>{car.description}</InfoItem>
            </CarDetails>
            <Price>{"$" + (rideDuration/60 * car.multiplier).toFixed(2)}</Price>
          </Car>
        ))}
      </CarList>
    </Wrapper>
  );
};

export default RideSelector;

const TripInfo = tw.div`
  flex text-center
  `

const InfoItem = tw.div`
  text-xs flex-1
`

const CarDetails = tw.div`
    flex-1
`;

const Service = tw.div`
    font-medium text-xl
`;

const Price = tw.div`
    text-xl
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
