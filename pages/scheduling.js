import React from 'react'
import { useState } from 'react'
import tw from "tailwind-styled-components"
import { BackHomeButton } from '../components/BackHomeButton'
import Link from 'next/Link'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import addMonths from "date-fns/addMonths"

const Schedule = () => {

    const [startDate, setStartDate] = useState(
        // setHours(setMinutes(new Date(), 0), 9)
        null
      );

    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
    
        return currentDate.getTime() < selectedDate.getTime();
    };
      return (
        <Wrapper>
            <BackHomeButton/>
            <Header> 
                <UberLogo src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"/> 
            </Header>

            <PickDate>
                <HeaderText>
                    Schedule a Ride 
                </HeaderText>
                <ScheduleText>
                    Select a date and time below: 
                </ScheduleText>
                <Picker>
                    <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    filterTime={filterPassedTime}
                    dateFormat="MMMM d, yy h:mm aa"
                    minDate={new Date()}
                    maxDate={addMonths(new Date(), 5)}
                    placeholderText="Click here to pick a date"
                    
                    />
                </Picker>
            </PickDate>
            <SetButton>
                Set
            </SetButton>
            

        </Wrapper>
        
      )
    
}

export default Schedule

const HeaderText = tw.p`
    font-bold text-2xl text-center
    
`
const ScheduleText = tw.p`
    text-base text-center text-gray-700
    
`
const Picker = tw.p`
    text-center
`

const Wrapper = tw.div`
    flex flex-col h-screen bg-gray-200 p-4
`
const PickDate = tw.div`
    bg-white flex-col items-center px-4 mb-2 py-2
`
const Header = tw.div`
    flex justify-between    
`
const UberLogo = tw.img`
    h-28 w-auto object-contain self-start
`
const SetButton = tw.button`
    flex bg-white flex-2 m-1 h-25 items-left justify-center transform
    hover:scale-105 transition text-xl
`

