import React from "react";
import tw from "tailwind-styled-components";
import { BackButton } from "../components/BackButton";
import {Footer} from '../components/Footer'

const AboutUs = () => {
  return (
    <Wrapper>
        <BackButton prevPage={"/"}></BackButton>
        <Header>Our Team Members</Header>
    <GridContainer>
      <Row>
        <ItemContainer>
            <ImageItem src="https://avatars.githubusercontent.com/u/75222161?v=4"></ImageItem>
            Ahmed
        </ItemContainer>
        <ItemContainer>
            <ImageItem src="https://avatars.githubusercontent.com/u/65097228?v=4"></ImageItem>
            Sunny
        </ItemContainer>
        <ItemContainer>
            <ImageItem src="https://avatars.githubusercontent.com/u/55907833?v=4"></ImageItem>
            Hang
        </ItemContainer>
      <ItemContainer>
            <ImageItem src="https://avatars.githubusercontent.com/u/40414974?v=4"></ImageItem>
            Andrew
        </ItemContainer>
        <ItemContainer>
            <ImageItem src="https://avatars.githubusercontent.com/u/50060654?v=4"></ImageItem>
            Bryant
        </ItemContainer>
        <ItemContainer>
            <ImageItem src="https://avatars.githubusercontent.com/u/80725182?v=4"></ImageItem>
            Luc
        </ItemContainer>
     </Row>
    </GridContainer>
      <Footer/>
    </Wrapper>
  );
};

export default AboutUs;
const GridContainer = tw.div`
     flex-none

`
const Wrapper = tw.div`
    flex-3 flex-col h-screen p-4 
`;

const Row = tw.div`
    container grid grid-cols-3 gap-2 mx-auto scale-75
`;

const ItemContainer = tw.div`
    flex flex-col flex-1 items-center font-bold text-xl
`
const ImageItem = tw.img`
    h-30 w-auto
`
const Header = tw.div`
    text-2xl text-center font-bold
`