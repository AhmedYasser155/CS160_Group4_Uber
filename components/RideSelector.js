import { React, useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { carList } from "../data/carList";
import { addRide, getUser, updateRide } from "../APIFunctions/DbFunctions";
import { useRouter } from "next/router";
import Link from "next/Link";
import { io } from 'socket.io-client';

const RideSelector = ({ locationCoordinates, schedule, pickup }) => {
  const [rideDuration, setRideDuration] = useState(0);
  const [rideDistance, setRideDistance] = useState(0);
  const [cost, setCost] = useState(0);
  const [service, setService] = useState("");
  const [rideID, setRideID] = useState("");
  const [isSubmit, setSubmit] = useState(false);
  const [bestDriver, setBestDriver] = useState({});
  const [newCarList, setNewCarList] = useState([]);
  const [driverNotified, setDriverNotified] = useState(false);

  const router = useRouter();
  const id = router.query.id;
  const socket = io("http://localhost:3001", {'multiplex': false});

  socket.on('receive-best-driver', (driver) => {
    setBestDriver(driver);
  });

  socket.on('driver-to-rider', async (passed) => {
    socket.off('driver-to-rider');
    console.log("rideID: " + rideID);
    const res = await updateRide(rideID, {"id":rideID, "driver":bestDriver._id});
    setDriverNotified(true);
  });

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
  };

  useEffect(() => {
    socket.emit('find-best-driver', pickup);
    showServices()
  },[]);

  useEffect(() => {
    if(Object.keys(bestDriver).length !== 0) {
      let bestCar = {
        imgURL: 'https://i.ibb.co/cyvcpfF/uberx.png',
        service: 'UberX  👤3',
        description: 'Driver: ' + bestDriver.firstName + ' ' + bestDriver.lastName 
        + '\nCar: ' + bestDriver.car.carMake + ' ' + bestDriver.car.carModel,
        multiplier: 1
      }
      setNewCarList([bestCar, ...carList]);
    }
    else {
      setNewCarList(carList);
    }
    socket.off('receive-best-driver');
  }, [bestDriver])

  function setData(ser, cost) {
    setCost(cost);
    setService(ser);
  }

  async function handleSubmit() {
    if (!isSubmit) {
      const ride = {
        customer: id,
        driver: null,
        location: locationCoordinates,
        distance: (rideDistance / 1750).toFixed(1),
        time: Math.round(rideDuration / 70),
        cost,
        pickup: new Date(),
      };
      const res = await addRide(ride);
      if (res.error) {
        console.log(res.error);
      } else {
        console.log(res.responseData);
        setRideID(res.responseData.id);
        setSubmit(true);
      }
    }
  }

  useEffect(async () => {
    console.log(rideID);
    const user = await getUser(id);
    console.log("pickup: " + pickup);
    socket.emit('ask-driver', {riderData:user.responseData, driverData:bestDriver, pickup:pickup});
  }, [rideID]);

  useEffect(() => {
    if(driverNotified) {
      router.push({
        pathname: `/Rider/${id}/ride`,
        query: { rideID },
      });
    }
  }, [driverNotified]);

  return (
    <Wrapper>
      <TripInfo>
        <InfoItem>
          Trip distance {(rideDistance / 1750).toFixed(1)} Miles
        </InfoItem>
        <InfoItem>Trip duration {Math.round(rideDuration / 70)} Mins</InfoItem>
      </TripInfo>
      
      {isSubmit ? (<></>) : (
        <>
        <Title>Choose a ride</Title>
        <CarList>
        {newCarList.map((car, index) => (
          <Car
            key={index}
            onClick={() =>
              setData(
                car.service,
                ((rideDuration / 60) * car.multiplier).toFixed(2)
              )
            }
          >
            <CarImg src={car.imgURL} />
            <CarDetails>
              <Service>{car.service}</Service>
              <InfoItem>{car.description}</InfoItem>
            </CarDetails>
            <Price>
              {"$" + ((rideDuration / 60) * car.multiplier).toFixed(2)}
            </Price>
          </Car>
        ))}
      </CarList>
      </>
      )}
      
      {schedule ? (
        <Link href={`/Rider/${id}/staticscheduling`}>
          <ConfirmButtonContainer>
            <ConfirmButton>Confirm {service}</ConfirmButton>
          </ConfirmButtonContainer>
        </Link>
      ) : (
        <ConfirmButtonContainer
          onClick={() => {
            handleSubmit();
          }}
        >
          {isSubmit ? (
            driverNotified ? (
              <Link href={{
                pathname: `/Rider/${id}/ride`,
                query: { rideID },
              }}>
                <ConfirmButton>Confirm {service}</ConfirmButton>
              </Link>
            ) : (
              <Title>Waiting for Driver Response...</Title>
            )
          ) : (
            <ConfirmButton>Order {service}</ConfirmButton>
          )}
        </ConfirmButtonContainer>
      )}
    </Wrapper>
  );
};

export default RideSelector;

const TripInfo = tw.div`
  flex text-center
  `;

const InfoItem = tw.div`
  text-xs flex-1
`;

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
    flex p-4 items-center hover:scale-105
`;

const CarImg = tw.img`
    h-14 mr-4
`;
const ConfirmButtonContainer = tw.div`
    border-t-2 hover:scale-105
`;

const ConfirmButton = tw.div`
    bg-black text-white my-4 mx-4 py-4 text-center text-xl cursor-pointer
`;
